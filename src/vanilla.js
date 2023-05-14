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
  { location: "BillyMays1", item: Item.Missile },
  { location: "BillyMays2", item: Item.Missile },
  { location: "Moat", item: Item.Missile },
  { location: "LedgePBs", item: Item.PowerBomb },
  { location: "RetroPBs", item: Item.PowerBomb },
  { location: "Bombs", item: Item.Bombs },
  { location: "Terminator", item: Item.EnergyTank },
  { location: "TwoThirty", item: Item.Missile },
  { location: "OldMB", item: Item.Missile },
  { location: "EarlySupers", item: Item.Super },
  { location: "EarlySupersBridge", item: Item.Missile },
  { location: "BrinstarReserve", item: Item.Reserve },
  { location: "BrinstarReserveMissiles1", item: Item.Missile },
  { location: "BrinstarReserveMissiles2", item: Item.Missile },
  { location: "EtecoonsTank", item: Item.EnergyTank },
  { location: "EtecoonsSupers", item: Item.Super },
  { location: "EtecoonsPBs", item: Item.PowerBomb },
  { location: "BigPink", item: Item.Missile },
  { location: "SpoSpoSupers", item: Item.Super },
  { location: "ChargeMissiles", item: Item.Missile },
  { location: "ChargeBeam", item: Item.Charge },
  { location: "TubeMissiles", item: Item.Missile },
  { location: "Waterway", item: Item.EnergyTank },
  { location: "WaveGate", item: Item.EnergyTank },
  { location: "AlphaPBs", item: Item.PowerBomb },
  { location: "AlphaPBMissiles", item: Item.Missile },
  { location: "BetaPBs", item: Item.PowerBomb },
  { location: "Spazer", item: Item.Spazer },
  { location: "KraidsCloset", item: Item.EnergyTank },
  { location: "KraidPBs", item: Item.PowerBomb },
  { location: "Kraid", item: Item.Varia },
];

const graph = createGraph([
  ["Terminator", "GreenElevator"],
  ["GreenHills", "RetroPBs"],
  ["NoobBridge", "RedTower"],
  ["KraidEntry", "Door_ElevatorEntry"],
  ["Door_KraidMouth", "KraidsLairExit"],
  ["KraidBossDoor", "Kraid"],
]);
const startVertex = graph[0].from;
let collected = [];
let samus = new Loadout();
samus.canDefeatKraid = false;
samus.canDefeatPhantoon = false;
samus.canDefeatDraygon = false;
samus.canDefeatRidley = false;

const getItemNameFromCode = (itemCode) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  return getKeyByValue(Item, itemCode);
};

//console.log(graph);

const itemNodes = itemPlacement.map((i) => {
  const part = graph.find((n) => n.from.name == i.location);
  if (part == null) {
    console.error("missing part", i.location);
  }
  return {
    location: part != undefined ? part.from : null,
    item: i.item,
  };
});

//console.log(itemNodes);

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

const hasRoundTrip = (vertex) => {
  const load = samus.clone();

  const index = itemPlacement.findIndex((i) => i.location == vertex.name);
  if (index >= 0) {
    load.add(itemPlacement[index].item);
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
    const index = itemPlacement.findIndex((i) => i.location == p.name);

    if (index < 0) {
      console.log("no item at", p.name);
      return;
    }

    const load = samus.clone();
    load.add(itemPlacement[index].item);
    const back = breadthFirstSearch(graph, p, load);
    if (!back.includes(startVertex)) {
      return;
    }

    samus.add(itemPlacement[index].item);
    const name = getItemNameFromCode(itemPlacement[index].item);
    str += `> ${name}`.padEnd(20, " ");
    if (++a % 3 == 0) {
      str += "\n";
    }
    collected.push(itemPlacement[index].location);
    itemPlacement.splice(index, 1);
    result = true;
  });

  if (!result) {
    console.log("No round trip locations");
  } else {
    console.log(str + "\n");
  }

  return result;
};

while (itemPlacement.length > 0) {
  const all = breadthFirstSearch(graph, startVertex, samus);
  const roundTripToBoss = (boss) => {
    const bossVertex = all.find((p) => p.name == boss);
    return bossVertex != undefined && hasRoundTrip(bossVertex);
  };
  samus.canDefeatKraid = roundTripToBoss("Kraid");
  samus.canDefeatPhantoon = roundTripToBoss("Phantoon");
  samus.canDefeatDraygon = roundTripToBoss("Draygon");
  samus.canDefeatRidley = roundTripToBoss("Ridley");

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

if (itemPlacement.length > 0) {
  printAvailableItems(getAvailableLocations(graph, samus, collected));
  console.log(itemPlacement);
}
