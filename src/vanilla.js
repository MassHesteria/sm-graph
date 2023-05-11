import { createGraph, getAvailableLocations } from "./util.js";
import Loadout from "./dash/loadout.js";
import { Item } from "./dash/items.js";
import chalk from "chalk";

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

const processItemLocations = (itemLocations) => {
  return itemLocations.map((loc) => {
    const temp = itemPlacement.find((x) => x.location == loc);
    const str = temp == undefined ? chalk.red("none") : getItemNameFromCode(temp.item);
    return {
      location: loc,
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

while (itemPlacement.length > 0) {
  const itemLocations = getAvailableLocations(graph, samus, collected);
  printAvailableItems(itemLocations);

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
