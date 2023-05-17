import { Item } from "./dash/items.js";
import Loadout from "./dash/loadout.js";
import chalk from "chalk";
import { breadthFirstSearch, getAvailableLocations } from "./search.js";
import { createVanillaGraph } from "./data/vanilla/graph.js";
import { vanillaItemPlacement } from "./data/vanilla/items.js";
import { mapPortals } from "./data/portals.js";

const start_init = Date.now();

const portals = mapPortals(1, false, true);
const graph = createVanillaGraph(portals);
const startVertex = graph[0].from;
let collected = [];
let samus = new Loadout();
samus.canDefeatKraid = false;
samus.canDefeatBotwoon = true;
samus.canDefeatPhantoon = false;
samus.canDefeatDraygon = false;
samus.canDefeatRidley = false;
samus.canDefeatCrocomire = false;

const getItemNameFromCode = (itemCode) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  return getKeyByValue(Item, itemCode);
};

const itemNodes = vanillaItemPlacement.map((i) => {
  const part = graph.find((n) => n.from.name == i.location);
  if (part == null) {
    console.error("missing part", i.location);
  }
  return {
    location: part != undefined ? part.from : null,
    item: i.item,
  };
});

const start_run = Date.now();

//console.log(itemNodes);

const processItemLocations = (itemLocations) => {
  return itemLocations.map((loc) => {
    const temp = itemNodes.find((x) => x.location == loc);
    const str = temp == undefined ? chalk.red("none") : getItemNameFromCode(temp.item);
    return {
      location: loc.name,
      item: str,
    };
  });
};

const printAvailableItems = (itemLocations) => {
  let output = chalk.yellow("Available: ");
  processItemLocations(itemLocations).forEach((p) => {
    const { location, item } = p;
    output += `${chalk.green(item)} @ ${chalk.blue(location)} `;
  });
  console.log(output);
};

const cloneLoadout = (input) => {
  const output = input.clone();
  output.canDefeatCrocomire = input.canDefeatCrocomire;
  output.canDefeatKraid = input.canDefeatKraid;
  output.canDefeatPhantoon = input.canDefeatPhantoon;
  output.canDefeatDraygon = input.canDefeatDraygon;
  output.canDefeatRidley = input.canDefeatRidley;
  return output;
};

const hasRoundTrip = (vertex) => {
  const load = cloneLoadout(samus);

  const index = itemNodes.findIndex((i) => i.location == vertex);
  if (index >= 0) {
    load.add(itemNodes[index].item);
  }

  return breadthFirstSearch(graph, vertex, load).includes(startVertex);
};

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
    const name = getItemNameFromCode(itemNodes[index].item);
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
  } else {
    console.log(str);
  }

  return result;
};

while (itemNodes.length > 0) {
  const all = breadthFirstSearch(graph, startVertex, samus);
  const roundTripToBoss = (boss) => {
    const bossVertex = all.find((p) => p.name == `Boss_${boss}`);
    return bossVertex != undefined && hasRoundTrip(bossVertex);
  };
  samus.canDefeatCrocomire = samus.hasCharge || samus.missilePacks >= 2 || samus.superPacks >= 2;
  samus.canDefeatKraid = roundTripToBoss("Kraid");
  samus.canDefeatPhantoon = roundTripToBoss("Phantoon");
  samus.canDefeatDraygon = roundTripToBoss("Draygon");
  samus.canDefeatRidley = roundTripToBoss("Ridley");

  const itemLocations = getAvailableLocations(graph, samus, collected);
  printAvailableItems(itemLocations);

  if (collectEasyItems(itemLocations)) {
    continue;
  }

  const index = itemNodes.findIndex((i) => itemLocations.includes(i.location));

  if (index < 0) {
    console.log("no items");
    break;
  }

  samus.add(itemNodes[index].item);
  console.log(">", getItemNameFromCode(itemNodes[index].item), "\n");
  collected.push(itemNodes[index].location);
  itemNodes.splice(index, 1);
}

if (itemNodes.length > 0) {
  printAvailableItems(getAvailableLocations(graph, samus, collected));
  itemNodes.forEach((n) => {
    console.log("Location:", n.location.name, "Item:", n.item.name);
  });
}

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

console.log(portals);
