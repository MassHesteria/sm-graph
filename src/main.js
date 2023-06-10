import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { createGraph } from "./data/vanilla/graph.js";
import { vanillaItemPlacement, getVanillaItemPool } from "./data/vanilla/items.js";
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

// Flag that tells the solver to expect invalid seeds. This is used
// to confirm the solver properly detects unsolvable seeds.
const expectFail = false;

// Legacy mode will only place an item at a location if the loadout
// that provided access to the location also provides an exit. The
// new solver logic considers the item as part of the exit logic.
const legacyMode = false;

// Read seed information from external files.
//const readFromFolder = "path/to/results";
const readFromFolder = null;

const testVerifiedFill = false;

const testGraphFill = true;

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
  let output = chalk.yellow("Available: ");
  itemLocations.forEach((p) => {
    if (p.item == null) {
      output += chalk.red("none");
    } else {
      output += chalk.green(ItemNames.get(p.item));
    }
    output += ` @ ${chalk.blue(p.name)} `;
  });
  console.log(output);
};

const printCollectedItems = (items) => {
  let str = "";
  items.forEach((item, idx) => {
    const name = ItemNames.get(item);
    str += `> ${name}`.padEnd(20, " ");
    if ((idx + 1) % 5 == 0) {
      str += "\n";
    }
  });
  if (items.length % 5 != 0) {
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
    .map((n) => `${ItemNames.get(n.from.item)} @ ${n.from.name}`)
    .filter(isUnique)
    .sort()
    .forEach((n) => console.log(n));
  console.log("-------------------");
};

const starterCharge = new Loadout({ hasCharge: true });

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

const MapLayout = {
  Vanilla: 0,
  Standard: 1,
  DashClassic: 2,
  DashRecall: 3,
};

const loadGraph = (layout, bosses) => {
  const portals = mapPortals(1, false, false);
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

  if (layout == MapLayout.Standard) {
    return createGraph(portals, SeasonVertexUpdates, SeasonEdgeUpdates);
  }
  if (layout == MapLayout.DashClassic) {
    return createGraph(portals, ClassicVertexUpdates, ClassicEdgeUpdates);
  }
  if (layout == MapLayout.DashRecall) {
    return createGraph(portals, RecallVertexUpdates, RecallEdgeUpdates);
  }
};

//-----------------------------------------------------------------
// Seed load routines.
//-----------------------------------------------------------------

const loadExternal = (fileName) => {
  const graph = loadGraph(MapLayout.Standard, readBosses(fileName));
  readSeed(fileName).forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVanilla = () => {
  const graph = loadGraph(MapLayout.Vanilla);
  vanillaItemPlacement.forEach((i) => placeItem(graph, i.location, i.item));
  return graph;
};

const loadVerifiedFill = (seed, recall, full) => {
  const layout = recall ? MapLayout.DashRecall : MapLayout.DashClassic;
  const graph = loadGraph(layout);
  const failMode = !expectFail ? 0 : quiet ? 1 : 2;
  generateSeed(seed, recall, full, failMode).forEach((i) =>
    placeItem(graph, i.location.name, i.item.type)
  );
  return graph;
};

const loadGraphFill = (seed, layout, restrictType, getItemPool, getFlags, initLoad) => {
  const graph = loadGraph(layout);
  const samus = initLoad == undefined ? new Loadout() : initLoad.clone();
  const getPrePool = restrictType ? getFullPrePool : getMajorMinorPrePool;
  graphFill(seed, graph, getFlags, getItemPool(seed), getPrePool, samus, restrictType);
  return graph;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

const solve = (seed, graph, getFlags, initLoad) => {
  const start_init = Date.now();
  const start_run = Date.now();

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
    throw new Error("Invalid seed");
  }

  if (!quiet) {
    const end_run = Date.now();
    console.log(
      "Time:",
      end_run - start_init,
      "ms [ Pre:",
      start_run - start_init,
      "ms, Run:",
      end_run - start_run,
      "ms ]"
    );
  }

  if (!quiet || seed % 1000 == 0) {
    console.log("Verifed", seed);
  }
};

//-----------------------------------------------------------------
// Solve the specified seeds.
//-----------------------------------------------------------------

if (startSeed == 0) {
  solve(0, loadVanilla(), getSeasonFlags);
  startSeed += 1;
}

for (let i = startSeed; i <= endSeed; i++) {
  if (readFromFolder != null) {
    const fileName = `${readFromFolder}/${i.toString().padStart(6, "0")}.json`;
    solve(i, loadExternal(fileName), getSeasonFlags);
  }
  if (testVerifiedFill) {
    solve(i, loadVerifiedFill(i, false, false), getClassicFlags);
    solve(i, loadVerifiedFill(i, true, false), getRecallFlags);
    solve(i, loadVerifiedFill(i, false, true), getClassicFlags);
    solve(i, loadVerifiedFill(i, true, true), getRecallFlags);
  }
  if (testGraphFill) {
    solve(
      i,
      loadGraphFill(i, MapLayout.DashClassic, true, getClassicItemPool, getClassicFlags),
      getClassicFlags
    );
    solve(
      i,
      loadGraphFill(i, MapLayout.DashClassic, false, getClassicItemPool, getClassicFlags),
      getClassicFlags
    );
    solve(
      i,
      loadGraphFill(
        i,
        MapLayout.DashRecall,
        true,
        getRecallItemPool,
        getRecallFlags,
        starterCharge
      ),
      getRecallFlags,
      starterCharge
    );
    solve(
      i,
      loadGraphFill(
        i,
        MapLayout.DashRecall,
        false,
        getRecallItemPool,
        getRecallFlags,
        starterCharge
      ),
      getRecallFlags,
      starterCharge
    );
  }
}

/*const trySolve = (seed, recall, full, edgeUpdates, getFlags, fileName) => {
  try {
    solve(seed, recall, full, edgeUpdates, getFlags, fileName);

    if (expectFail) {
      console.log("Unexpected success", seed);
      process.exit(1);
    }
  } catch (e) {
    if (!expectFail) {
      console.log(e);
      console.log("Seed:", seed);
      process.exit(1);
    }
    if (!quiet || seed % 1000 == 0) {
      console.log("Expected failure", seed);
    }
  }
};
}*/
