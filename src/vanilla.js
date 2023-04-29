import { createGraph, getItemLocations } from "./util.js";

const itemPlacement = [
  { location: "MorphBall", action: (load) => (load.hasMorph = true) },
  { location: "AlphaMissiles", action: (load) => (load.canOpenRedDoors = true) },
  {
    location: "Bombs",
    action: (load) => {
      load.canUseBombs = load.hasMorph;
      load.canFly = load.hasMorph;
    },
  },
];

const graph = createGraph();
let samus = {};
let collected = [];

while (itemPlacement.length > 0) {
  const itemLocations = getItemLocations(graph, samus, collected);
  console.log(itemLocations);
  const index = itemPlacement.findIndex((i) => itemLocations.includes(i.location));

  if (index < 0) {
    console.log("no items");
    break;
  }

  itemPlacement[index].action(samus);
  collected.push(itemPlacement[index].location);
  itemPlacement.splice(index, 1);
}

//console.log(graph);
//let samus = {};
//let collected = [];
//printItemLocations(samus, collected);
console.log(getItemLocations(graph, samus, collected));
