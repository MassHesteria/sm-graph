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
import { getClassicFlags } from "./data/classic/flags.js";
import { getRecallFlags } from "./data/recall/flags.js";
import { getSeasonFlags } from "./data/season/flags.js";
import { graphFill } from "./graphFill.js";
import { getMajorMinorPrePool } from "./dash/itemPlacement.js";
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

if (process.argv.length == 3) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[2]);
} else if (process.argv.length == 4) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[3]);
  quiet = true;
}

const solve = (seed, recall, full, edgeUpdates, getFlags, fileName) => {
  //-----------------------------------------------------------------
  // Setup the graph.
  //-----------------------------------------------------------------

  const start_init = Date.now();
  const portals = mapPortals(1, false, false);

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

  const graph = createGraph(portals, edgeUpdates);
  const failMode = !expectFail ? 0 : quiet ? 1 : 2;

  const startVertex = graph[0].from;
  startVertex.pathToStart = true;
  let samus = new Loadout();
  if (seed > 0) {
    // Starter Charge is considered for Recall but not for Standard.
    samus.hasCharge = recall;
  }
  graphFill(seed, graph, getVanillaItemPool(), getMajorMinorPrePool, samus, true);

  //-----------------------------------------------------------------
  // Places items within the graph.
  //-----------------------------------------------------------------

  /*const placeItem = (location, item) => {
    const part = graph.find((n) => n.from.name == location);
    if (part == null) {
      console.error("missing part", location);
    }
    part.from.item = item;
  };

  const placeItems = (seed) => {
    if (fileName != undefined && fileName.length > 0) {
      return readSeed(fileName).forEach((i) => placeItem(i.location, i.item));
    }

    if (seed > 0) {
      return generateSeed(seed, recall, full, failMode).forEach((i) =>
        placeItem(i.location.name, i.item.type)
      );
    }

    return vanillaItemPlacement.forEach((i) => placeItem(i.location, i.item));
  };

  placeItems(seed);*/

  //-----------------------------------------------------------------
  // Print routines.
  //-----------------------------------------------------------------

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

  const printDefeatedBoss = (msg) => {
    console.log(chalk.magentaBright(msg));
  };

  const printUncollectedItems = () => {
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

  //-----------------------------------------------------------------
  // Attempt to collect all items.
  //-----------------------------------------------------------------

  const start_run = Date.now();

  const logMethods = quiet
    ? undefined
    : {
        printAvailableItems: printAvailableItems,
        printUncollectedItems: printUncollectedItems,
        printDefeatedBoss: printDefeatedBoss,
        printMsg: console.log,
      };

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

const trySolve = (seed, recall, full, edgeUpdates, getFlags, fileName) => {
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

for (let i = startSeed; i <= endSeed; i++) {
  if (readFromFolder != null) {
    const fileName = `${readFromFolder}/${i.toString().padStart(6, "0")}.json`;
    trySolve(i, false, false, SeasonEdgeUpdates, getSeasonFlags, fileName);
  } else {
    trySolve(i, false, false, ClassicEdgeUpdates, getClassicFlags); // Standard MM
    //trySolve(i, true, false, RecallEdgeUpdates, getRecallFlags); // Recall MM
    //trySolve(i, false, true, ClassicEdgeUpdates, getClassicFlags); // Standard Full
    //trySolve(i, true, true, RecallEdgeUpdates, getRecallFlags); // Recall Full
  }
}
