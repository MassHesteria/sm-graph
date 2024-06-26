import { isBoss, minorItem } from "./lib/items";
import { createLoadout } from "./lib/loadout";
import { loadGraph } from "./lib/graph/init";
import { mapPortals } from "./lib/graph/data/portals";
import { generateSeed, getGraphLocations } from "./lib/graph/fill";
import { isGraphValid} from "./lib/graph/solver";
import { BossMode, MajorDistributionMode, MapLayout } from "./lib/graph/params";
import { getAllPresets, getPreset } from "./lib/presets";
import { SeasonEdgeUpdates } from "./lib/graph/data/season/edges";
import CRC32 from "crc-32";

import fs from "fs";
import chalk from "chalk";
import { generateLegacySeed, readSeed } from "./generate";

//-----------------------------------------------------------------
// Determine the seed.
//-----------------------------------------------------------------

let startSeed = 0;
let endSeed = 0;
let quiet = false;

// Read seed information from external files.
const readFromFolders = 
      fs.existsSync('external.json') ?
      JSON.parse(fs.readFileSync('external.json', "utf-8")) :
      [];

// Enables checking seeds produced with the legacy solver.
const verifiedFillMode = true;

// Graph fill seeds should work by definition because the solver
// is used to verify the seed during generation. Enabling this is
// a bit of a sanity check.
const graphFillMode = true;

//-----------------------------------------------------------------
// Process command line arguments.
//-----------------------------------------------------------------

const args = process.argv.slice(2);
const quit = () => process.exit(1);

if (args.length == 1) {
  startSeed = parseInt(args[0]);
  endSeed = parseInt(args[0]);
} else if (args.length == 2) {
  startSeed = parseInt(args[0]);
  endSeed = parseInt(args[1]);
  quiet = true;
} else {
  console.log("Please specify a seed");
  quit();
}

//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const getItemName = (name) => {
  if (name == "Super Missile") {
    name = "Super";
  } else if (name == "Grappling Beam") {
    name = "Grapple";
  } else if (name == "Gravity Suit") {
    name = "Gravity";
  } else if (name == "Varia Suit") {
    name = "Varia";
  } else if (name == "Reserve Tank") {
    name = "Reserve";
  }
  return name;
};

const placeItem = (graph, location, item) => {
  //TODO: Maybe check area at some point
  const part = graph.find((n) => n.from.name == location);
  if (part == null) {
    console.error("missing part", location);
  } else if (part.from.type == "major") {
    item.isMajor = true;
  }
  part.from.item = item;
};

const printAvailableItems = (itemLocations) => {
  if (quiet) {
    return;
  }
  let maxItemLength = new Array(4);
  maxItemLength.fill(0);
  let maxLocationLength = new Array(4);
  maxLocationLength.fill(0);
  itemLocations.forEach((n, idx) => {
    const col = idx % 4;
    maxItemLength[col] = Math.max(maxItemLength[col], getItemName(n.itemName).length + 1);
    maxLocationLength[col] = Math.max(maxLocationLength[col], n.locationName.length + 1);
  });

  let output = chalk.yellow(`Available (${itemLocations.length}):\n`);
  itemLocations.forEach((p, idx) => {
    const col = idx % 4;
    output += chalk.green(getItemName(p.itemName).padStart(maxItemLength[col], " "));
    output += ` @ ${chalk.blue(p.locationName.padEnd(maxLocationLength[col], " "))} `;
    if ((idx + 1) % 4 == 0) {
      output += "\n";
    }
  });
  if (itemLocations.length % 4 == 0) {
    output = output.slice(0, output.length - 2);
    //output += "\n";
  }
  console.log(output);
};

const printCollectedItems = (itemLocations, special = false) => {
  itemLocations.forEach(p => {
    if (isBoss(p.itemType)) {
      const msg = `Defeated ${p.itemName} (${p.locationName})`;
      console.log(chalk.magentaBright(msg));
    }
  })

  let str = "\nCollected:\n";
  itemLocations.forEach((p, idx) => {
    const name = getItemName(p.itemName);
    str += `> ${name}`.padEnd(20, " ");
    if ((idx + 1) % 6 == 0) {
      str += "\n";
    }
  });
  if (itemLocations.length % 6 != 0) {
    str += "\n";
  }
  if (special) {
    console.log(chalk.red(str));
  } else {
    console.log(str);
  }
};

const printUncollectedItems = (graph) => {
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  console.log("--- Uncollected ---");
  graph
    .filter((n) => n.from.item != undefined)
    .map((n) => `${getItemName(n.from.item.name)} @ ${n.from.name} ${n.from.area}`)
    .filter(isUnique)
    .sort()
    .forEach((n) => console.log(n));
  console.log("-------------------");
};

//-----------------------------------------------------------------
// Seed load routines.
//-----------------------------------------------------------------

const loadExternal = (fileName, majorDistribution) => {
  const { bosses, area, items } = readSeed(fileName);
  const bossPortals = [
    ["Door_KraidBoss", `Exit_${bosses.kraidBoss}`],
    ["Door_PhantoonBoss", `Exit_${bosses.phantoonBoss}`],
    ["Door_DraygonBoss", `Exit_${bosses.draygonBoss}`],
    ["Door_RidleyBoss", `Exit_${bosses.ridleyBoss}`]
  ]

  const graph = loadGraph(
    1,
    1,
    MapLayout.Standard,
    majorDistribution,
    area.length > 0,
    false,
    BossMode.Shuffled,
    mapPortals(area, bossPortals)
  );

  //-----------------------------------------------------------------
  // Apply specified edge updates. This could simply be a logic
  // change or could include edits to the map.
  //-----------------------------------------------------------------

  SeasonEdgeUpdates.forEach((c) => {
    const [from, to] = c.edges;
    //TODO: Not currently an issue but should check areas eventually
    const edge = graph.find((n) => n.from.name == from && n.to.name == to);
    if (edge == null) {
      throw new Error(`Could not find edge from ${from} to ${to}`);
    }
    edge.condition = c.requires;
  });

  // Place the items.
  items.forEach((i) => placeItem(graph, i.location, minorItem(0x0, i.item)));
  return graph;
};

const loadVerifiedFill = (seed, preset) => {
  const { mapLayout, majorDistribution } = preset.settings;
  const recall = mapLayout == MapLayout.Recall;
  const full = majorDistribution == MajorDistributionMode.Full;

  const graph = loadGraph(
    0,
    1,
    mapLayout,
    majorDistribution,
    false,
    false,
    BossMode.Vanilla,
    mapPortals([], []));
  generateLegacySeed(seed, recall, full).forEach((i) => placeItem(graph, i.location.name, i.item));
  return graph;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

let num = 0;
const checksums = [];
const emptyLoadout = createLoadout();

const computeChecksum = (array) => {
  return CRC32.str(JSON.stringify(array)) >>> 0;
}

const computeGraphChecksum = (graph) => {
  return (
    computeChecksum(
      getGraphLocations(graph).map((n) => n.item)
    )
  )
}

const checksumToString = (checksum) => {
  return checksum.toString(16).toUpperCase().padStart(8, "0");
}

const solveQuiet = (seed, title, graph, settings) => {
  if (!isGraphValid(graph, settings, emptyLoadout)) {
    throw new Error(`Invalid ${title} seed: ${seed}`);
  }
  checksums.push(computeGraphChecksum(graph));
  num += 1;
}

const solveLoud = (seed, title, graph, settings) => {
  console.log(
    chalk.blueBright(`\n********* Solving ${title} ********************************\n`)
  );
  const start = Date.now();
  const progression = [];

  if (!isGraphValid(graph, settings, emptyLoadout, progression)) {
    progression.forEach(step => {
      printAvailableItems(step.available);
      printCollectedItems(step.collected);
    });
    printUncollectedItems(graph);
    throw new Error(`Invalid ${title} seed: ${seed}`);
  }

  progression.forEach(step => {
    printAvailableItems(step.available);
    printCollectedItems(step.collected);
  });
  checksums.push(computeGraphChecksum(graph));
  const end = Date.now();
  console.log(chalk.yellow(`Solved ${title} in ${end - start} ms`));
  num += 1;
};

const solve = quiet ? solveQuiet : solveLoud;

const solveGraphFill = (seed, preset) => {
  const graph = generateSeed(seed, preset.settings, preset.options);
  if (quiet) {
    checksums.push(computeGraphChecksum(graph));
    num += 1;
  } else {
    solveLoud(seed, `Graph ${preset.title}`, graph, preset.settings);
  }
};

const solveVerifiedFill = (seed, preset) => {
  const graph = loadVerifiedFill(seed, preset);
  solve(seed, `Legacy ${preset.title}`, graph, preset.settings);
};

//-----------------------------------------------------------------
// Solve the specified seeds.
//-----------------------------------------------------------------

let modes = readFromFolders.length > 0 ? "external " : "";
modes += verifiedFillMode ? "legacy " : "";
modes += graphFillMode ? "graph " : "";

let start = Date.now();
let step = start;
const presets = getAllPresets();

const chozo = getPreset("chozo");
const classic_mm = getPreset("classic");
const classic_full = getPreset("classic_full");
const recall_mm = getPreset("recall");

for (let i = startSeed; i <= endSeed; i++) {
  readFromFolders.forEach((f) => {
    const fileName = `${f}/${i.toString().padStart(6, "0")}.json`;
    if (!fs.existsSync(fileName)) {
      return;
    }
    const settings = f.includes("chozo") ? chozo.settings : classic_full.settings;
    solve(i, fileName, loadExternal(fileName, settings.majorDistribution), settings);
  });
  if (verifiedFillMode) {
    solveVerifiedFill(i, classic_mm);
    solveVerifiedFill(i, classic_full);
    solveVerifiedFill(i, recall_mm);
  }
  if (graphFillMode) {
    presets.forEach((p) => {
      solveGraphFill(i, p);
    });
  }
  if (!quiet || i % 1000 == 0) {
    const curr = Date.now();
    console.log(`Seed ${i} [${modes.trimEnd()}] in ${curr - step} ms,`,
      `Total [num: ${num} avg: ${((curr - start)/num).toFixed(2)} ms]`,
      checksumToString(computeChecksum(checksums)));
    step = curr;
  }
}

const delta = Date.now() - start;
console.log(`Total Time: ${delta} ms [${num} seeds, `,
  `avg ${(delta / num).toFixed(2)} ms]`,
  checksumToString(computeChecksum(checksums)));
