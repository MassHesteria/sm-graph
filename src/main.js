import { ItemNames } from "./lib/items.js";
import Loadout from "./lib/loadout.js";
import { loadGraph } from "./lib/graph/data/vanilla/graph.js";
import { vanillaItemPlacement } from "./lib/graph/data/vanilla/items.js";
import { mapPortals } from "./lib/graph/data/portals.js";
import { graphFill } from "./lib/graph/fill.js";
import GraphSolver from "./lib/graph/solver.js";
import { ClassicPreset } from "./lib/graph/data/classic/preset.js";
import { RecallPreset } from "./lib/graph/data/recall/preset.js";
import { SeasonPreset } from "./lib/graph/data/season/preset.js";
import { VanillaPreset } from "./lib/graph/data/vanilla/preset.js";
import { MajorDistributionMode, MapLayout } from "./lib/graph/params.js";

import fs from "fs";
import chalk from "chalk";
import { generateSeed, readBosses, readSeed } from "./generate.js";

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
const readFromFolders = [
  //"path/to/results",
  //"path/to/results",
  //"path/to/results",
  //"path/to/results",
];

// Enables checking seeds produced with the legacy solver.
const verifiedFillMode = TestMode.Success;

// Graph fill seeds should work by definition because the solver
// is used to verify the seed during generation. Enabling this is
// a bit of a sanity check.
const graphFillMode = TestMode.Success;

//-----------------------------------------------------------------
// Process command line arguments.
//-----------------------------------------------------------------

if (process.argv.length == 3) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[2]);
} else if (process.argv.length == 4) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[3]);
  quiet = true;
} else {
  console.log("Please specify a seed");
  process.exit(1);
}

//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const getItemName = (item) => {
  let name = ItemNames.get(item);
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

  let output = chalk.yellow("Available:\n");
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

const printCollectedItems = (items) => {
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
  console.log(str);
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
  const portals = mapPortals(0, false, false);
  const bosses = readBosses(fileName);

  if (bosses != undefined) {
    const setPortal = (from, to) => {
      const temp = portals.find((p) => p[0] == from);
      temp[1] = to;
    };

    setPortal("Door_KraidBoss", `Exit_${bosses.kraidBoss}`);
    setPortal("Door_PhantoonBoss", `Exit_${bosses.phantoonBoss}`);
    setPortal("Door_DraygonBoss", `Exit_${bosses.draygonBoss}`);
    setPortal("Door_RidleyBoss", `Exit_${bosses.ridleyBoss}`);

    if (!quiet) {
      console.log(bosses);
    }
  }
  const graph = loadGraph(
    0,
    MapLayout.Standard,
    MajorDistributionMode.Standard,
    false,
    false,
    portals
  );
  readSeed(fileName).forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVanilla = () => {
  const graph = loadGraph(0, MapLayout.Vanilla, MajorDistributionMode.Standard);
  vanillaItemPlacement.forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVerifiedFill = (seed, recall, full, expectFail = false) => {
  const failMode = !expectFail ? 0 : quiet ? 1 : 2;
  const [mapLayout, majorDistributionMode] = recall
    ? [MapLayout.DashRecall, MajorDistributionMode.Recall]
    : [MapLayout.DashClassic, MajorDistributionMode.Standard];

  const graph = loadGraph(0, mapLayout, majorDistributionMode);
  generateSeed(seed, recall, full, failMode).forEach((i) =>
    placeItem(graph, i.location.name, i.item.type)
  );
  return graph;
};

const loadGraphFill = (seed, preset, restrictType, bossShuffle) => {
  const { mapLayout, itemPoolParams, settings } = preset;
  const { majorDistribution } = itemPoolParams;

  const graph = loadGraph(seed, mapLayout, majorDistribution.mode, false, bossShuffle);
  graphFill(seed, graph, itemPoolParams, settings, restrictType);
  return graph;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

let num = 0;

const solve = (seed, title, graph, settings, legacyMode = false) => {
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
  if (!solver.isValid(new Loadout(), legacyMode)) {
    throw new Error(`Invalid ${title} seed: ${seed}`);
  }

  if (!quiet) {
    const end = Date.now();
    console.log(chalk.yellow(`Solved ${title} in ${end - start} ms`));
  }
  num += 1;
};

const confirmFailure = (seed, title, graph, settings, legacyMode = true) => {
  try {
    solve(seed, title + " Failure", graph, settings, legacyMode);
  } catch (e) {
    num += 1;
    return;
  }
  throw new Error(`Unexpected success ${title}: ${seed}`);
};

//-----------------------------------------------------------------
// Solve the specified seeds.
//-----------------------------------------------------------------

let modes = readFromFolders.length > 0 ? "external " : "";
if (verifiedFillMode == TestMode.Both) {
  modes += "verifiedBoth ";
} else {
  modes += (verifiedFillMode & TestMode.Success) > 0 ? "verifiedSuccess " : "";
  modes += (verifiedFillMode & TestMode.Failure) > 0 ? "verifiedFailure " : "";
}
modes += (graphFillMode & TestMode.Success) > 0 ? "graphSuccess " : "";

let start = Date.now();
let step = start;

if (startSeed == 0) {
  solve(0, "Vanilla", loadVanilla(), VanillaPreset.settings);
  console.log(`Verified 0 [ vanilla ] ${Date.now() - step} ms`);
  step = Date.now();
  startSeed += 1;
}

for (let i = startSeed; i <= endSeed; i++) {
  readFromFolders.forEach((f) => {
    const fileName = `${f}/${i.toString().padStart(6, "0")}.json`;
    if (!fs.existsSync(fileName)) {
      return;
    }
    solve(i, fileName, loadExternal(fileName), SeasonPreset.settings);
  });
  if ((verifiedFillMode & TestMode.Success) > 0) {
    const a = loadVerifiedFill(i, false, false);
    solve(i, "Legacy Classic M/M", a, ClassicPreset.settings, true);

    const b = loadVerifiedFill(i, false, true);
    solve(i, "Legacy Classic Full", b, ClassicPreset.settings, true);

    const c = loadVerifiedFill(i, true, false);
    solve(i, "Legacy Recall M/M", c, RecallPreset.settings, true);

    const d = loadVerifiedFill(i, true, true);
    solve(i, "Legacy Recall Full", d, RecallPreset.settings, true);
  }
  if ((verifiedFillMode & TestMode.Failure) > 0) {
    const a = loadVerifiedFill(i, false, false, true);
    confirmFailure(i, "Legacy Classic M/M", a, ClassicPreset.settings);

    const b = loadVerifiedFill(i, false, true, true);
    confirmFailure(i, "Legacy Classic Full", b, ClassicPreset.settings);

    const c = loadVerifiedFill(i, true, false, true);
    confirmFailure(i, "Legacy Recall M/M", c, RecallPreset.settings);

    const d = loadVerifiedFill(i, true, true, true);
    confirmFailure(i, "Legacy Recall Full", d, RecallPreset.settings);
  }
  if ((graphFillMode & TestMode.Success) > 0) {
    const a = loadGraphFill(i, ClassicPreset, true, true);
    solve(i, "Graph Classic M/M", a, ClassicPreset.settings);

    const b = loadGraphFill(i, ClassicPreset, false, true);
    solve(i, "Graph Classic Full", b, ClassicPreset.settings);

    const c = loadGraphFill(i, RecallPreset, true, true);
    solve(i, "Graph Recall M/M", c, RecallPreset.settings);

    const d = loadGraphFill(i, RecallPreset, false, true);
    solve(i, "Graph Recall Full", d, RecallPreset.settings);

    const e = loadGraphFill(i, SeasonPreset, true, true);
    solve(i, "Graph Season M/M", e, SeasonPreset.settings);

    const f = loadGraphFill(i, SeasonPreset, false, true);
    solve(i, "Graph Season Full", f, SeasonPreset.settings);
  }
  if (!quiet || i % 100 == 0) {
    console.log(`Verified ${i} [ ${modes}] ${Date.now() - step} ms`);
    step = Date.now();
  }
}

const delta = Date.now() - start;
console.log(`Total Time: ${delta} ms [${num} seeds, avg ${delta / num} ms]`);
