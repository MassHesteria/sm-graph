import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { searchAndCache, mergeGraph, canReachStart } from "./search.js";
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
  // Print available item locations to the console.
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
  // Collects all items where there is a round trip back to the
  // ship. All these items are collected at the same time.
  //-----------------------------------------------------------------

  const collectEasyItems = (itemLocations) => {
    let items = [];

    itemLocations.forEach((p) => {
      if (legacyMode) {
        if (!canReachStart(graph, p, checkLoadout, samus)) {
          return;
        }
        samus.add(p.item);
      } else {
        const load = samus.clone();
        load.add(p.item);
        if (!canReachStart(graph, p, checkLoadout, load)) {
          return;
        }
        samus = load;
      }

      items.push(p.item);
      p.item = undefined;
    });

    if (items.length == 0) {
      if (!quiet || !expectFail) {
        console.log("No round trip locations:", seed);
        itemLocations.forEach((i) => {
          console.log(chalk.cyan(ItemNames.get(i.item)), "@", i.name);
        });
        printUncollectedItems();
        //console.log(samus);
        //searchAndCache(graph, startVertex, checkLoadout, samus).forEach((a) => console.log(a));
      }
      throw new Error("no round trip locations");
    } else if (!quiet) {
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
    }

    return true;
  };

  const bossData = {
    HasDefeatedKraid: false,
    HasDefeatedPhantoon: false,
    HasDefeatedDraygon: false,
    HasDefeatedRidley: false,
  };

  const bossVertices = {
    Kraid: graph.find((n) => n.to.name == "Boss_Kraid").to,
    Phantoon: graph.find((n) => n.to.name == "Boss_Phantoon").to,
    Draygon: graph.find((n) => n.to.name == "Boss_Draygon").to,
    Ridley: graph.find((n) => n.to.name == "Boss_Ridley").to,
  };

  const checkLoadout = (condition, load) => {
    const {
      CanUseBombs,
      CanUsePowerBombs,
      CanOpenRedDoors,
      CanOpenGreenDoors,
      HasCharge,
      HasDoubleJump,
      HasGravity,
      HasGrapple,
      HasHeatShield,
      HasHiJump,
      HasIce,
      HasMorph,
      HasPlasma,
      HasPressureValve,
      HasScrewAttack,
      HasSpazer,
      HasSpaceJump,
      HasSpeed,
      HasSpringBall,
      HasVaria,
      HasWave,
      EnergyTanks,
      MissilePacks,
      PowerBombPacks,
      SuperPacks,
      TotalTanks,
      HellRunTanks,
      CanFly,
      CanHellRun,
      CanDoSuitlessMaridia,
      CanPassBombPassages,
      CanDestroyBombWalls,
      CanMoveInWestMaridia,
      CanKillKraid,
      CanKillPhantoon,
      CanKillDraygon,
      CanKillRidley,
      CanKillSporeSpawn,
      CanKillCrocomire,
      CanKillBotwoon,
      CanKillGoldTorizo,
    } = getFlags(load);

    const { HasDefeatedKraid, HasDefeatedPhantoon, HasDefeatedDraygon, HasDefeatedRidley } =
      bossData;

    return eval(`(${condition.toString()})(load)`);
  };

  //-----------------------------------------------------------------
  // Attempt to collect all items.
  //-----------------------------------------------------------------

  const start_run = Date.now();

  while (true) {
    // Reduce the graph for performance
    //mergeGraph(graph, startVertex, samus);

    // Find all accessible vertices
    const all = searchAndCache(graph, startVertex, checkLoadout, samus);
    //console.log(samus);
    //all.forEach((a) => console.log(a.name));

    // Find all uncollected item vertices
    const uncollected = all.filter((v) => v.item != undefined);
    if (uncollected.length == 0) {
      break;
    }
    printAvailableItems(uncollected);

    //-----------------------------------------------------------------
    // Determines if the graph would allow a round trip from the
    // specified vertex to the starting vertex.
    //-----------------------------------------------------------------

    const hasRoundTrip = (vertex) => {
      if (!all.includes(vertex)) {
        return false;
      }

      return canReachStart(graph, vertex, checkLoadout, samus);
    };

    // Update defeated boss flags. Assume that if we can get to the boss
    // and back to the start that we have defeated the boss since the
    // logic for killing the boss is considered leaving the boss.
    if (!bossData.HasDefeatedKraid) {
      bossData.HasDefeatedKraid = hasRoundTrip(bossVertices.Kraid);
      if (!quiet && bossData.HasDefeatedKraid) {
        console.log(chalk.magentaBright("Defeated Kraid"));
      }
    }
    if (!bossData.HasDefeatedPhantoon) {
      bossData.HasDefeatedPhantoon = hasRoundTrip(bossVertices.Phantoon);
      if (!quiet && bossData.HasDefeatedPhantoon) {
        console.log(chalk.magentaBright("Defeated Phantoon"));
      }
    }
    if (!bossData.HasDefeatedDraygon) {
      bossData.HasDefeatedDraygon = hasRoundTrip(bossVertices.Draygon);
      if (!quiet && bossData.HasDefeatedDraygon) {
        console.log(chalk.magentaBright("Defeated Draygon"));
      }
    }
    if (!bossData.HasDefeatedRidley) {
      bossData.HasDefeatedRidley = hasRoundTrip(bossVertices.Ridley);
      if (!quiet && bossData.HasDefeatedRidley) {
        console.log(chalk.magentaBright("Defeated Ridley"));
      }
    }

    // Collect all items where we can make a round trip back to the start
    if (collectEasyItems(uncollected)) {
      continue;
    }

    // Handle collecting a single item if no "easy" items are available
    // TODO: Needs testing; not currently being executed
    //const first = uncollected[0];

    //samus.add(first.item);
    //if (!quiet) {
    //console.log(">", ItemNames.get(first.item), "\n");
    //}
    //first.item = undefined;

    throw new Error("one way ticket");
  }

  //-----------------------------------------------------------------
  // Check for uncollected items. This indicates an invalid graph.
  //-----------------------------------------------------------------

  if (graph.filter((n) => n.from.item != undefined).length > 0) {
    if (!expectFail) {
      printUncollectedItems();
      //console.log(getRecallFlags(samus));
      searchAndCache(graph, startVertex, checkLoadout, samus)
        .filter((a) => a.item != undefined)
        .forEach((a) => console.log(a));
    }
    throw new Error(`Invalid seed: ${seed}`);
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
