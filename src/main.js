import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { searchAndCache, mergeGraph, canReachStart, canReachVertex } from "./search.js";
import { createVanillaGraph } from "./data/vanilla/graph.js";
import { vanillaItemPlacement } from "./data/vanilla/items.js";
import { mapPortals } from "./data/portals.js";
import { generateSeed } from "./generate.js";
import DotNetRandom from "./dash/dotnet-random.js";
import { ClassicEdgeUpdates } from "./data/classic/edges.js";
import { RecallEdgeUpdates } from "./data/recall/edges.js";
import { getClassicFlags } from "./data/classic/flags.js";
import { getRecallFlags } from "./data/recall/flags.js";

//-----------------------------------------------------------------
// Determine the seed.
//-----------------------------------------------------------------

const getRandomSeed = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const RNG = new DotNetRandom(timestamp);
  return RNG.NextInRange(1, 1000000);
};

let seed = getRandomSeed();
let quiet = false;
let startSeed = seed;
let endSeed = seed;

if (process.argv.length == 3) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[2]);
} else if (process.argv.length == 4) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[3]);
  quiet = true;
}

const solve = (seed, recall, full) => {
  //-----------------------------------------------------------------
  // Setup the graph.
  //-----------------------------------------------------------------

  const start_init = Date.now();
  const portals = mapPortals(1, false, false);
  const graph = createVanillaGraph(portals);

  //-----------------------------------------------------------------
  // Augment the graph.
  //-----------------------------------------------------------------

  if (seed > 0) {
    const EdgeUpdates = recall ? RecallEdgeUpdates : ClassicEdgeUpdates;
    EdgeUpdates.forEach((c) => {
      const [from, to] = c.edges;
      const edge = graph.find((n) => n.from.name == from && n.to.name == to);
      if (edge == null) {
        throw new Error(`Could not find edge from ${from} to ${to}`);
      }
      edge.condition = c.requires;
    });
  }

  const startVertex = graph[0].from;
  startVertex.pathToStart = true;
  let samus = new Loadout();
  if (seed > 0) {
    samus.hasCharge = true;
  }

  //-----------------------------------------------------------------
  // Places items within the graph.
  //-----------------------------------------------------------------

  const placeItem = (location, item) => {
    const part = graph.find((n) => n.from.name == location);
    if (part == null) {
      console.error("missing part", location);
    }
    part.from.item = item;
  };

  const placeItems = (seed) => {
    if (seed > 0) {
      return generateSeed(seed, recall, full).forEach((i) =>
        placeItem(i.location.name, i.item.type)
      );
    } else {
      return vanillaItemPlacement.forEach((i) => placeItem(i.location, i.item));
    }
  };

  placeItems(seed);

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
    graph
      .filter((n) => n.from.item != undefined)
      .map((n) => `Location: ${n.from.name} Item: ${ItemNames.get(n.from.item)}`)
      .filter(isUnique)
      .forEach((n) => console.log(n));
  };

  //-----------------------------------------------------------------
  // Determines if the graph would allow a round trip from the
  // specified vertex to the starting vertex.
  //-----------------------------------------------------------------

  const hasRoundTrip = (vertex) => {
    if (vertex.item != undefined) {
      const load = samus.clone();
      load.add(vertex.item);
      return canReachVertex(graph, vertex, startVertex, checkLoadout, load);
    }

    return canReachVertex(graph, vertex, startVertex, checkLoadout, samus);
  };

  //-----------------------------------------------------------------
  // Collects all items where there is a round trip back to the
  // ship. All these items are collected at the same time.
  //-----------------------------------------------------------------

  const collectEasyItems = (itemLocations) => {
    if (itemLocations.length == 0) {
      console.log("no locations");
      return;
    }

    let items = [];

    itemLocations.forEach((p) => {
      const load = samus.clone();
      load.add(p.item);
      //TODO: Handle boss criteria?
      if (!canReachStart(graph, p, checkLoadout, load)) {
        return;
      }

      samus = load;
      items.push(p.item);
      p.item = undefined;
    });

    if (items.length == 0) {
      console.log("No round trip locations:", seed);
      itemLocations.forEach((i) => {
        console.log(chalk.cyan(ItemNames.get(i.item)), "@", i.name);
      });
      printUncollectedItems();
      process.exit(1);
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
    CanDefeatBotwoon: true,
    CanDefeatCrocomire: false,
    CanDefeatGoldTorizo: true,
    CanDefeatKraid: false,
    CanDefeatPhantoon: false,
    CanDefeatDraygon: false,
    CanDefeatRidley: false,
  };

  const bossVertices = {
    Kraid: graph.find((n) => n.to.name == "Boss_Kraid").to,
    Phantoon: graph.find((n) => n.to.name == "Boss_Phantoon").to,
    Draygon: graph.find((n) => n.to.name == "Boss_Draygon").to,
    Ridley: graph.find((n) => n.to.name == "Boss_Ridley").to,
  };

  const checkLoadout = (condition, load) => {
    //TODO: see if there's a better way to do this
    /*return Function(
      "samus",
      `
      "use strict";
      const HasMorph = samus.hasMorph;
      const CanHellRun = samus.totalTanks >= 4 || (samus.hasGravity && samus.totalTanks >= 3) || samus.hasVaria;
      const CanDoSuitlessMaridia = samus.hasHiJump && samus.hasGrapple && (samus.hasIce || samus.hasSpringBall);
      return (${condition.toString()})(samus)`
    )(load);*/

    const {
      CanUseBombs,
      CanUsePowerBombs,
      CanOpenRedDoors,
      CanOpenGreenDoors,
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
      TotalTanks,
      CanFly,
      CanHellRun,
      CanDoSuitlessMaridia,
      CanPassBombPassages,
      CanDestroyBombWalls,
      CanMoveInWestMaridia,
    } = recall ? getRecallFlags(load) : getClassicFlags(load);

    const {
      CanDefeatBotwoon,
      CanDefeatCrocomire,
      CanDefeatGoldTorizo,
      CanDefeatKraid,
      CanDefeatPhantoon,
      CanDefeatDraygon,
      CanDefeatRidley,
    } = bossData;

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

    // Find all uncollected item vertices
    const uncollected = all.filter((v) => v.item != undefined);
    if (uncollected.length == 0) {
      break;
    }
    printAvailableItems(uncollected);

    // Check for access to bosses
    if (!bossData.CanDefeatCrocomire) {
      bossData.CanDefeatCrocomire =
        samus.hasCharge || samus.missilePacks >= 2 || samus.superPacks >= 2;
    }
    if (!bossData.CanDefeatKraid) {
      bossData.CanDefeatKraid = hasRoundTrip(bossVertices.Kraid);
    }
    if (!bossData.CanDefeatPhantoon) {
      bossData.CanDefeatPhantoon = hasRoundTrip(bossVertices.Phantoon);
    }
    if (!bossData.CanDefeatDraygon) {
      bossData.CanDefeatDraygon = hasRoundTrip(bossVertices.Draygon);
    }
    if (!bossData.CanDefeatRidley) {
      bossData.CanDefeatRidley = hasRoundTrip(bossVertices.Ridley);
    }

    // Collect all items where we can make a round trip back to the start
    if (collectEasyItems(uncollected)) {
      continue;
    }

    // Handle collecting a single item if no "easy" items are available
    // TODO: Needs testing; not currently being executed
    const first = uncollected[0];

    samus.add(first.item);
    if (!quiet) {
      console.log(">", ItemNames.get(first.item), "\n");
    }
    first.item = undefined;

    console.log("one way ticket");
    process.exit(2);
  }

  //-----------------------------------------------------------------
  // Check for uncollected items. This indicates an invalid graph.
  //-----------------------------------------------------------------

  if (graph.filter((n) => n.from.item != undefined).length > 0) {
    printUncollectedItems();
    //console.log(getRecallFlags(samus));
    searchAndCache(graph, startVertex, checkLoadout, samus)
      .filter((a) => a.item != undefined)
      .forEach((a) => console.log(a));
    console.log("Invalid seed:", seed);
    process.exit(1);
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

  //console.log(portals);

  if (!quiet || seed % 100 == 0) {
    console.log("Verifed", seed);
  }
};

for (let i = startSeed; i <= endSeed; i++) {
  //solve(i, true, false); // Recall MM
  solve(i, false, true); // Standard Full
}
