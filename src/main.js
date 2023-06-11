import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { createGraph } from "./data/vanilla/graph.js";
import { getVanillaItemPool, vanillaItemPlacement } from "./data/vanilla/items.js";
import { mapPortals } from "./data/portals.js";
import { generateSeed, readBosses, readSeed } from "./generate.js";
import DotNetRandom from "./dash/dotnet-random.js";
import { ClassicEdgeUpdates } from "./data/classic/edges.js";
import { RecallEdgeUpdates } from "./data/recall/edges.js";
import { SeasonEdgeUpdates } from "./data/season/edges.js";
import { ClassicVertexUpdates } from "./data/classic/vertex.js";
import { RecallVertexUpdates } from "./data/recall/vertex.js";
import { SeasonVertexUpdates } from "./data/season/vertex.js";
import { getClassicFlags } from "./data/classic/flags.js";
import { getRecallFlags } from "./data/recall/flags.js";
import { getSeasonFlags } from "./data/season/flags.js";
import { getClassicItemPool } from "./data/classic/items.js";
import { getRecallItemPool } from "./data/recall/items.js";
import { graphFill } from "./graphFill.js";
import { getFullPrePool, getMajorMinorPrePool } from "./dash/itemPlacement.js";
import GraphSolver from "./graphSolver.js";

//-----------------------------------------------------------------
// Constants.
//-----------------------------------------------------------------

const SeedType = {
  Standard: 1,
  DashClassic: 2,
  DashRecall: 3,
};

const MapLayout = {
  Vanilla: 0,
  Standard: 1,
  DashClassic: 2,
  DashRecall: 3,
};

const TestMode = {
  None: 0,
  Success: 1,
  Failure: 2,
  Both: 3,
};

//-----------------------------------------------------------------
// Determine the seed.
//-----------------------------------------------------------------

const getRandomSeed = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const RNG = new DotNetRandom(timestamp);
  return RNG.NextInRange(1, 1000000);
};

const seed = getRandomSeed();
let quiet = false;
let startSeed = seed;
let endSeed = seed;

// Read seed information from external files.
//const readFromFolder = "path/to/results";
const readFromFolder = null;

// Enables checking seeds produced with the legacy solver.
const verifiedFillMode = TestMode.None;

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

const starterCharge = new Loadout({ hasCharge: true });

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
  const graph = createGraph(portals, SeasonVertexUpdates, SeasonEdgeUpdates);
  readSeed(fileName).forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVanilla = () => {
  const portals = mapPortals(0, false, false);
  const graph = createGraph(portals, [], []);
  vanillaItemPlacement.forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVerifiedFill = (seed, recall, full, expectFail = false) => {
  const portals = mapPortals(0, false, false);
  const graph = recall
    ? createGraph(portals, RecallVertexUpdates, RecallEdgeUpdates)
    : createGraph(portals, ClassicVertexUpdates, ClassicEdgeUpdates);
  const failMode = !expectFail ? 0 : quiet ? 1 : 2;
  generateSeed(seed, recall, full, failMode).forEach((i) =>
    placeItem(graph, i.location.name, i.item.type)
  );
  return graph;
};

const loadGraphFill = (seed, seedType, restrictType, bossShuffle) => {
  const [layout, getItemPool, getFlags] =
    seedType == SeedType.DashClassic
      ? [MapLayout.DashClassic, getClassicItemPool, getClassicFlags]
      : seedType == SeedType.DashRecall
      ? [MapLayout.DashRecall, getRecallItemPool, getRecallFlags]
      : [MapLayout.Standard, getVanillaItemPool, getSeasonFlags];

  const [vertexUpdates, edgeUpdates] =
    layout == MapLayout.DashClassic
      ? [ClassicVertexUpdates, ClassicEdgeUpdates]
      : layout == MapLayout.DashRecall
      ? [RecallVertexUpdates, RecallEdgeUpdates]
      : [SeasonVertexUpdates, SeasonEdgeUpdates];

  const portals = mapPortals(seed, false, bossShuffle);
  const graph = createGraph(portals, vertexUpdates, edgeUpdates);

  const samus = seedType == SeedType.DashRecall ? starterCharge : new Loadout();
  const getPrePool = restrictType ? getFullPrePool : getMajorMinorPrePool;
  graphFill(seed, graph, getFlags, getItemPool(seed), getPrePool, samus, restrictType);
  return graph;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

let num = 0;

const solve = (seed, title, graph, getFlags, initLoad, legacyMode = false) => {
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

  let samus = initLoad == undefined ? new Loadout() : initLoad.clone();
  let solver = new GraphSolver(graph, getFlags, logMethods);
  if (!solver.isValid(samus, legacyMode)) {
    throw new Error(`Invalid ${title} seed: ${seed}`);
  }

  if (!quiet) {
    const end = Date.now();
    console.log(chalk.yellow(`Solved ${title} in ${end - start} ms`));
  }
  num += 1;
};

const confirmFailure = (seed, title, graph, getFlags, initLoad, legacyMode = true) => {
  try {
    solve(seed, title + " Failure", graph, getFlags, initLoad, legacyMode);
  } catch (e) {
    num += 1;
    return;
  }
  throw new Error(`Unexpected success ${title}: ${seed}`);
};

//-----------------------------------------------------------------
// Solve the specified seeds.
//-----------------------------------------------------------------

let modes = readFromFolder == null ? "" : "external ";
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
  solve(0, loadVanilla(), getSeasonFlags);
  console.log(`Verified 0 [ vanilla ] ${Date.now() - step} ms`);
  step = Date.now();
  startSeed += 1;
}

for (let i = startSeed; i <= endSeed; i++) {
  if (readFromFolder != null) {
    const fileName = `${readFromFolder}/${i.toString().padStart(6, "0")}.json`;
    solve(i, "External", loadExternal(fileName), getSeasonFlags);
    num += 1;
  }
  if ((verifiedFillMode & TestMode.Success) > 0) {
    const a = loadVerifiedFill(i, false, false);
    solve(i, "Legacy Classic M/M", a, getClassicFlags, undefined, true);

    const b = loadVerifiedFill(i, false, true);
    solve(i, "Legacy Classic Full", b, getClassicFlags, undefined, true);

    const c = loadVerifiedFill(i, true, false);
    solve(i, "Legacy Recall M/M", c, getRecallFlags, starterCharge);

    const d = loadVerifiedFill(i, true, true);
    solve(i, "Legacy Recall Full", d, getRecallFlags, starterCharge);
  }
  if ((verifiedFillMode & TestMode.Failure) > 0) {
    const a = loadVerifiedFill(i, false, false, true);
    confirmFailure(i, "Legacy Classic M/M", a, getClassicFlags);

    const b = loadVerifiedFill(i, false, true, true);
    confirmFailure(i, "Legacy Classic Full", b, getClassicFlags);

    const c = loadVerifiedFill(i, true, false, true);
    confirmFailure(i, "Legacy Recall M/M", c, getRecallFlags, starterCharge);

    const d = loadVerifiedFill(i, true, true, true);
    confirmFailure(i, "Legacy Recall Full", d, getRecallFlags, starterCharge);
  }
  if ((graphFillMode & TestMode.Success) > 0) {
    const a = loadGraphFill(i, SeedType.DashClassic, true, true);
    solve(i, "Graph Classic M/M", a, getClassicFlags);

    const b = loadGraphFill(i, SeedType.DashClassic, false, true);
    solve(i, "Graph Classic Full", b, getClassicFlags);

    const c = loadGraphFill(i, SeedType.DashRecall, true, true);
    solve(i, "Graph Recall M/M", c, getRecallFlags, starterCharge);

    const d = loadGraphFill(i, SeedType.DashRecall, false, true);
    solve(i, "Graph Recall Full", d, getRecallFlags, starterCharge);
  }
  if (!quiet || i % 1000 == 0) {
    console.log(`Verified ${i} [ ${modes}] ${Date.now() - step} ms`);
    step = Date.now();
  }
}

const delta = Date.now() - start;
console.log(`Total Time: ${delta} ms [${num} seeds, avg ${delta / num} ms]`);
