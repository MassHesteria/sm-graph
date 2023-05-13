import { createGraph, getAvailableLocations } from "./util.js";
import Loadout from "./dash/loadout.js";
import { Item } from "./dash/items.js";
import chalk from "chalk";
import { breadthFirstSearch } from "./search.js";

const itemPlacement = [
  { location: "MorphBall", item: Item.Morph },
  { location: "Ceiling", item: Item.EnergyTank },
  { location: "AlphaMissiles", item: Item.Missile },
  { location: "BetaMissiles", item: Item.Missile },
  { location: "Bombs", item: Item.Bombs },
  { location: "Terminator", item: Item.EnergyTank },
  { location: "TwoThirty", item: Item.Missile },
  { location: "OldMB", item: Item.Missile },
  { location: "EarlySupers", item: Item.Super },
  { location: "EarlySupersBridge", item: Item.Missile },
];

const graph = createGraph([["Terminator", "GreenElevator"]]);
let samus = new Loadout();
let collected = [];

const getItemNameFromCode = (itemCode) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  return getKeyByValue(Item, itemCode);
};

const itemNodes = itemPlacement.map((i) => {
  return {
    location: graph.find((n) => n.from.name == i.name),
    item: i.item,
  };
});

console.log(itemNodes);

const processItemLocations = (itemLocations) => {
  return itemLocations.map((loc) => {
    const temp = itemPlacement.find((x) => x.location == loc.name);
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

const collectEasyItems = (itemLocations) => {
  let result = false;
  itemLocations.forEach((p) => {
    const index = itemPlacement.findIndex((i) => i.location == p.name);

    if (index < 0) {
      console.log("no item at", p.name);
      return;
    }

    const load = samus.clone();
    load.add(itemPlacement[index].item);
    const back = breadthFirstSearch(graph, p, load);
    if (!back.includes(graph[0].from)) {
      return;
    }

    samus.add(itemPlacement[index].item);
    console.log(">", getItemNameFromCode(itemPlacement[index].item));
    collected.push(itemPlacement[index].location);
    itemPlacement.splice(index, 1);
    result = true;
  });

  if (!result) {
    console.log("No round trip locations");
  } else {
    console.log("");
  }

  return result;
};

while (itemPlacement.length > 0) {
  const itemLocations = getAvailableLocations(graph, samus, collected);
  printAvailableItems(itemLocations);

  if (collectEasyItems(itemLocations)) {
    continue;
  }

  const index = itemPlacement.findIndex((i) => itemLocations.includes(i.location));

  if (index < 0) {
    console.log("no items");
    break;
  }

  samus.add(itemPlacement[index].item);
  console.log(">", getItemNameFromCode(itemPlacement[index].item), "\n");
  collected.push(itemPlacement[index].location);
  itemPlacement.splice(index, 1);
}

//console.log(graph);
//let samus = {};
//let collected = [];
//printItemLocations(samus, collected);
printAvailableItems(getAvailableLocations(graph, samus, collected));
