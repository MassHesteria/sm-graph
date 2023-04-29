import { createGraph, getItemLocations } from "./util.js";
import Loadout from "./dash/loadout.js";
import { Item } from "./dash/items.js";
import table from "table";

const itemPlacement = [
  { location: "MorphBall", item: Item.Morph },
  { location: "Ceiling", item: Item.EnergyTank },
  { location: "AlphaMissiles", item: Item.Missile },
  { location: "BetaMissiles", item: Item.Missile },
  { location: "Bombs", item: Item.Bombs },
  { location: "Terminator", item: Item.EnergyTank },
  { location: "TwoThirty", item: Item.Missile },
  { location: "OldMB", item: Item.Missile },
];

const graph = createGraph();
let samus = new Loadout();
let collected = [];

const getItemNameFromCode = (itemCode) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  return getKeyByValue(Item, itemCode);
};

const printAvailableItems = (itemLocations) => {
  let tableData = [];
  tableData.push(["LOCATION", "ITEM"]);
  itemLocations.forEach((loc) => {
    const temp = itemPlacement.find((x) => x.location == loc);
    const str = temp == undefined ? "" : getItemNameFromCode(temp.item);
    tableData.push([loc, str]);
  });
  console.log(table.table(tableData));
};

while (itemPlacement.length > 0) {
  const itemLocations = getItemLocations(graph, samus, collected);
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
printAvailableItems(getItemLocations(graph, samus, collected));
