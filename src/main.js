import { ItemNames, majorItem } from "./lib/items";
import { createLoadout } from "./lib/loadout";
import { loadGraph } from "./lib/graph/init";
import { mapPortals } from "./lib/graph/data/portals";
import { generateSeed } from "./lib/graph/fill";
import GraphSolver from "./lib/graph/solver";
import { BossMode, MajorDistributionMode, MapLayout } from "./lib/graph/params";
import { getAllPresets, getPreset } from "./lib/presets";

import fs from "fs";
import chalk from "chalk";
import {
  generateLegacySeed,
  generateInvalidSeed,
  readSeed,
} from "./generate";

//-----------------------------------------------------------------
// Constants.
//-----------------------------------------------------------------

const TestMode = {
  None: 0,
  Success: 1,
  Failure: 2,
  Both: 3,
};

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
const verifiedFillMode = TestMode.Success;

// Graph fill seeds should work by definition because the solver
// is used to verify the seed during generation. Enabling this is
// a bit of a sanity check.
const graphFillMode = TestMode.Success;

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

const getItemName = (item) => {
  let name = ItemNames.get(item.type);
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
  const part = graph.find((n) => n.from.name == location);
  if (part == null) {
    console.error("missing part", location);
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
    maxItemLength[col] = Math.max(maxItemLength[col], getItemName(n.item).length + 1);
    maxLocationLength[col] = Math.max(maxLocationLength[col], n.name.length + 1);
  });

  let output = chalk.yellow(`Available (${itemLocations.length}):\n`);
  itemLocations.forEach((p, idx) => {
    const col = idx % 4;
    if (p.item == null) {
      output += chalk.red("none");
    } else {
      output += chalk.green(getItemName(p.item).padStart(maxItemLength[col], " "));
    }
    output += ` @ ${chalk.blue(p.name.padEnd(maxLocationLength[col], " "))} `;
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

const printCollectedItems = (items, special = false) => {
  let str = "\nCollected:\n";
  items.forEach((item, idx) => {
    const name = getItemName(item);
    str += `> ${name}`.padEnd(20, " ");
    if ((idx + 1) % 6 == 0) {
      str += "\n";
    }
  });
  if (items.length % 6 != 0) {
    str += "\n";
  }
  if (special) {
    console.log(chalk.red(str));
  } else {
    console.log(str);
  }
};

const printDefeatedBoss = (msg) => {
  console.log(chalk.magentaBright(msg));
};

const printUncollectedItems = (graph) => {
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  console.log("--- Uncollected ---");
  graph
    .filter((n) => n.from.item != undefined)
    .map((n) => `${getItemName(n.from.item)} @ ${n.from.name}`)
    .filter(isUnique)
    .sort()
    .forEach((n) => console.log(n));
  console.log("-------------------");
};

//-----------------------------------------------------------------
// Seed load routines.
//-----------------------------------------------------------------

const loadExternal = (fileName) => {
  const { bosses, area, items } = readSeed(fileName);
  const portals = area.length > 0 ? area : mapPortals(0, false, false);

  if (bosses != undefined) {
    const setPortal = (from, to) => {
      const temp = portals.find((p) => p[0] == from);
      if (temp == undefined) {
        portals.push([from, to]);
      } else {
        temp[1] = to;
      }
    };

    setPortal("Door_KraidBoss", `Exit_${bosses.kraidBoss}`);
    setPortal("Door_PhantoonBoss", `Exit_${bosses.phantoonBoss}`);
    setPortal("Door_DraygonBoss", `Exit_${bosses.draygonBoss}`);
    setPortal("Door_RidleyBoss", `Exit_${bosses.ridleyBoss}`);
  }

  const graph = loadGraph(
    1,
    1,
    MapLayout.Standard,
    MajorDistributionMode.Standard,
    area.length > 0,
    BossMode.Shuffled,
    portals
  );
  items.forEach((i) => placeItem(graph, i.location, majorItem(0x0, i.item)));
  return graph;
};

const loadVerifiedFill = (seed, preset) => {
  const { mapLayout, majorDistribution } = preset.settings;
  const recall = mapLayout == MapLayout.Recall;
  const full = majorDistribution == MajorDistributionMode.Full;

  const graph = loadGraph(0, 1, mapLayout, majorDistribution);
  generateLegacySeed(seed, recall, full).forEach((i) => placeItem(graph, i.location.name, i.item));
  return graph;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

let num = 0;

const solve = (seed, title, graph, settings) => {
  if (!quiet) {
    console.log(
      chalk.blueBright(`\n********* Solving ${title} ********************************\n`)
    );
  }
  const start = Date.now();

  const logMethods = quiet
    ? undefined
    : {
        printAvailableItems: printAvailableItems,
        printCollectedItems: printCollectedItems,
        printUncollectedItems: printUncollectedItems,
        printDefeatedBoss: printDefeatedBoss,
        printMsg: console.log,
      };

  let solver = new GraphSolver(graph, settings, logMethods);
  if (!solver.isValid(createLoadout())) {
    throw new Error(`Invalid ${title} seed: ${seed}`);
  }

  if (!quiet) {
    const end = Date.now();
    console.log(chalk.yellow(`Solved ${title} in ${end - start} ms`));
  }
  num += 1;
};

const solveGraphFill = (seed, preset) => {
  const graph = generateSeed(seed, preset.settings);
  solve(seed, `Graph ${preset.title}`, graph, preset.settings);
};

const solveVerifiedFill = (seed, preset) => {
  const graph = loadVerifiedFill(seed, preset);
  solve(seed, `Legacy ${preset.title}`, graph, preset.settings, true);
};

const confirmInvalidSeed = (seed, preset) => {
  try {
    const { mapLayout, majorDistribution } = preset.settings;
    const recall = mapLayout == MapLayout.Recall;
    const full = majorDistribution == MajorDistributionMode.Full;

    const graph = loadGraph(0, mapLayout, majorDistribution);
    generateInvalidSeed(seed, recall, full).forEach((i) =>
      placeItem(graph, i.location.name, i.item)
    );
    solve(seed, `Failure ${preset.title}`, graph, preset.settings, true);
  } catch (e) {
    num += 1;
    return;
  }
  throw new Error(`Unexpected success ${preset.title}: ${seed}`);
};

//-----------------------------------------------------------------
// Solve the specified seeds.
//-----------------------------------------------------------------

let modes = readFromFolders.length > 0 ? "external " : "";
if (verifiedFillMode == TestMode.Both) {
  modes += "verifiedBoth ";
} else {
  modes += (verifiedFillMode & TestMode.Success) > 0 ? "verifiedPass " : "";
  modes += (verifiedFillMode & TestMode.Failure) > 0 ? "verifiedFail " : "";
}
modes += (graphFillMode & TestMode.Success) > 0 ? "graphPass " : "";

let start = Date.now();
let step = start;
const presets = getAllPresets();

const classic_mm = getPreset("classic_mm");
const classic_full = getPreset("classic_full");
const recall_mm = getPreset("recall_mm");
const recall_full = getPreset("recall_full");

for (let i = startSeed; i <= endSeed; i++) {
  readFromFolders.forEach((f) => {
    const fileName = `${f}/${i.toString().padStart(6, "0")}.json`;
    if (!fs.existsSync(fileName)) {
      return;
    }
    solve(i, fileName, loadExternal(fileName), presets[0].settings);
  });
  if ((verifiedFillMode & TestMode.Success) > 0) {
    solveVerifiedFill(i, classic_mm);
    solveVerifiedFill(i, classic_full);
    solveVerifiedFill(i, recall_mm);
    solveVerifiedFill(i, recall_full);
  }
  if ((verifiedFillMode & TestMode.Failure) > 0) {
    confirmInvalidSeed(i, classic_mm);
    confirmInvalidSeed(i, classic_full);
    confirmInvalidSeed(i, recall_mm);
    confirmInvalidSeed(i, recall_full);
  }
  if ((graphFillMode & TestMode.Success) > 0) {
    presets.forEach((p) => {
      solveGraphFill(i, p);
    });
  }
  if (!quiet || i % 1000 == 0) {
    const curr = Date.now();
    console.log(`Seed ${i} [${modes.trimEnd()}] in ${curr - step} ms,`,
      `Total [num: ${num} avg: ${((curr - start)/num).toFixed(2)} ms]`);
    step = curr;
  }
}

const delta = Date.now() - start;
console.log(`Total Time: ${delta} ms [${num} seeds, avg ${delta / num} ms]`);
