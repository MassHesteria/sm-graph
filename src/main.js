import { ItemNames } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { breadthFirstSearch, mergeGraph } from "./search.js";
import { createVanillaGraph } from "./data/vanilla/graph.js";
import { vanillaItemPlacement } from "./data/vanilla/items.js";
import { mapPortals } from "./data/portals.js";
import { standardMajorMinor } from "./generate.js";
import DotNetRandom from "./dash/dotnet-random.js";
import { readYAML } from "./data/reader.js";
import { CommonLogicUpdates } from "./data/common/test.js";

//-----------------------------------------------------------------
// Determine the seed.
//-----------------------------------------------------------------

const getRandomSeed = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const RNG = new DotNetRandom(timestamp);
  return RNG.NextInRange(1, 1000000);
};

//let seed = getRandomSeed();
//let seed = 180558;
let seed = 1327;
let quiet = false;

if (process.argv.length > 2) {
  seed = parseInt(process.argv[2]);
  quiet = true;
}

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
  if (!readYAML(graph, "src/data/common/test.yaml")) {
    process.exit(1);
  }
  CommonLogicUpdates.forEach((c) => {
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

// Add extra flags to the loadout.
samus.canDefeatKraid = false;
samus.canDefeatBotwoon = true;
samus.canDefeatPhantoon = false;
samus.canDefeatDraygon = false;
samus.canDefeatRidley = false;
samus.canDefeatCrocomire = false;

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
    return standardMajorMinor(seed).map((i) => toItemNode(i.location.name, i.item.type));
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
// Clones the loadout plus any extra flags.
//-----------------------------------------------------------------

const cloneLoadout = (input) => {
  const output = input.clone();
  output.canDefeatCrocomire = input.canDefeatCrocomire;
  output.canDefeatKraid = input.canDefeatKraid;
  output.canDefeatPhantoon = input.canDefeatPhantoon;
  output.canDefeatDraygon = input.canDefeatDraygon;
  output.canDefeatRidley = input.canDefeatRidley;
  return output;
};

//-----------------------------------------------------------------
// Determines if the graph would allow a round trip from the
// specified vertex to the starting vertex.
//-----------------------------------------------------------------

const hasRoundTrip = (vertex) => {
  const load = cloneLoadout(samus);

  const index = itemNodes.findIndex((i) => i.location == vertex);
  if (index >= 0) {
    load.add(itemNodes[index].item);
  }

  return breadthFirstSearch(graph, vertex, load).includes(startVertex);
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

    const load = cloneLoadout(samus);
    load.add(itemNodes[index].item);
    const back = breadthFirstSearch(graph, p, load);
    if (!back.includes(startVertex)) {
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
    console.log("No round trip locations");
    process.exit(1);
  } else if (!quiet) {
    console.log(str);
  }

  return result;
};

//-----------------------------------------------------------------
// Attempt to collect all items.
//-----------------------------------------------------------------

const start_run = Date.now();

while (itemNodes.length > 0) {
  // Reduce the graph for performance
  //mergeGraph(graph, startVertex, samus);

  // Find all accessible vertices
  const all = breadthFirstSearch(graph, startVertex, samus);

  // Check for access to bosses
  const roundTripToBoss = (boss) => {
    const bossVertex = all.find((p) => p.name == `Boss_${boss}`);
    return bossVertex != undefined && hasRoundTrip(bossVertex);
  };
  samus.canDefeatCrocomire = samus.hasCharge || samus.missilePacks >= 2 || samus.superPacks >= 2;
  samus.canDefeatKraid = roundTripToBoss("Kraid");
  samus.canDefeatPhantoon = roundTripToBoss("Phantoon");
  samus.canDefeatDraygon = roundTripToBoss("Draygon");
  samus.canDefeatRidley = roundTripToBoss("Ridley");

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

if (!quiet) {
  console.log("Verifed", seed);
}
