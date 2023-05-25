import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { breadthFirstSearch, mergeGraph, canReachVertex } from "./search.js";
import { createVanillaGraph } from "./data/vanilla/graph.js";
import { vanillaItemPlacement } from "./data/vanilla/items.js";
import { mapPortals } from "./data/portals.js";
import { recallMajorMinor, standardMajorMinor } from "./generate.js";
import DotNetRandom from "./dash/dotnet-random.js";
import { CommonEdgeUpdates } from "./data/common/edges.js";
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

//let seed = getRandomSeed();
let seed = 40;
let quiet = false;
let startSeed = seed;
let endSeed = seed;
let recall = true;

if (process.argv.length == 3) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[2]);
} else if (process.argv.length == 4) {
  startSeed = parseInt(process.argv[2]);
  endSeed = parseInt(process.argv[3]);
  quiet = true;
}

const solve = (seed) => {
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
    const EdgeUpdates = recall ? RecallEdgeUpdates : CommonEdgeUpdates;
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
  let collected = [];
  let samus = new Loadout();
  if (seed > 0) {
    samus.hasCharge = true;
  }

  //-----------------------------------------------------------------
  // Print available item locations to the console.
  //-----------------------------------------------------------------

  const toItemNode = (location, item) => {
    const part = graph.find((n) => n.from.name == location);
    if (part == null) {
      console.error("missing part", location);
    }
    return {
      location: part != undefined ? part.from : null,
      item: item,
    };
  };

  const getItemNodes = (seed) => {
    if (seed > 0) {
      const gen = recall ? recallMajorMinor : standardMajorMinor;
      return gen(seed).map((i) => toItemNode(i.location.name, i.item.type));
    } else {
      return vanillaItemPlacement.map((i) => toItemNode(i.location, i.item));
    }
  };

  const itemNodes = getItemNodes(seed);

  //-----------------------------------------------------------------
  // Print available item locations to the console.
  //-----------------------------------------------------------------

  const printAvailableItems = (itemLocations) => {
    if (quiet) {
      return;
    }
    let output = chalk.yellow("Available: ");
    itemLocations.forEach((p) => {
      const theNode = itemNodes.find((x) => x.location == p);
      if (theNode == null) {
        output += chalk.red("none");
      } else {
        output += chalk.green(ItemNames.get(theNode.item));
      }
      output += ` @ ${chalk.blue(p.name)} `;
    });
    console.log(output);
  };

  //-----------------------------------------------------------------
  // Determines if the graph would allow a round trip from the
  // specified vertex to the starting vertex.
  //-----------------------------------------------------------------

  const hasRoundTrip = (vertex) => {
    const load = samus.clone();

    const index = itemNodes.findIndex((i) => i.location == vertex);
    if (index >= 0) {
      load.add(itemNodes[index].item);
    }

    return canReachVertex(graph, vertex, startVertex, checkLoadout, load);
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

    let result = false;
    let str = "";
    let a = 0;

    itemLocations.forEach((p) => {
      const index = itemNodes.findIndex((i) => i.location == p);

      if (index < 0) {
        console.log("no item at", p.name);
        return;
      }

      const load = samus.clone();
      load.add(itemNodes[index].item);
      //TODO: Handle boss criteria?
      if (!canReachVertex(graph, p, startVertex, checkLoadout, load)) {
        return;
      }

      samus.add(itemNodes[index].item);
      const name = ItemNames.get(itemNodes[index].item);
      str += `> ${name}`.padEnd(20, " ");
      if (++a % 5 == 0) {
        str += "\n";
      }
      collected.push(itemNodes[index].location);
      itemNodes.splice(index, 1);
      result = true;
    });

    if (a % 5 != 0) {
      str += "\n";
    }

    if (!result) {
      console.log("No round trip locations:", seed);
      itemNodes.forEach((n) => {
        console.log("Location:", n.location.name, "Item:", ItemNames.get(n.item));
      });
      process.exit(1);
    } else if (!quiet) {
      console.log(str);
    }

    return result;
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

    if (condition === true) {
      return true;
    }

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

  while (itemNodes.length > 0) {
    // Reduce the graph for performance
    //mergeGraph(graph, startVertex, samus);

    // Find all accessible vertices
    const all = breadthFirstSearch(graph, startVertex, checkLoadout, samus);

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

    // Find all uncollected item vertices
    const uncollected = all.filter((v) => v.item != "" && !collected.includes(v));
    printAvailableItems(uncollected);

    // Collect all items where we can make a round trip back to the start
    if (collectEasyItems(uncollected)) {
      continue;
    }

    // Handle collecting a single item if no "easy" items are available
    // TODO: Needs testing; not currently being executed
    const index = itemNodes.findIndex((i) => uncollected.includes(i.location));

    if (index < 0) {
      console.log("no items");
      break;
    }

    samus.add(itemNodes[index].item);
    if (!quiet) {
      console.log(">", ItemNames.get(itemNodes[index].item), "\n");
    }
    collected.push(itemNodes[index].location);
    itemNodes.splice(index, 1);
  }

  //-----------------------------------------------------------------
  // Check for uncollected items. This indicates an invalid graph.
  //-----------------------------------------------------------------

  if (itemNodes.length > 0) {
    itemNodes.forEach((n) => {
      console.log("Location:", n.location.name, "Item:", ItemNames.get(n.item));
    });
    //console.log(getRecallFlags(samus));
    breadthFirstSearch(graph, startVertex, checkLoadout, samus)
      .filter((a) => !collected.includes(a))
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
  solve(i);
}
