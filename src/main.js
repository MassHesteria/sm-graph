import Loadout from "./dash/loadout.js";
import { Item } from "./dash/items.js";
import chalk from "chalk";
import { breadthFirstSearch, getAvailableLocations } from "./search.js";
import { createVanillaGraph } from "./data/vanilla/graph.js";
import { mapPortals } from "./data/portals.js";

const itemPlacement = [
  { location: "MorphBall", item: Item.Morph },
  { location: "EnergyTank_Ceiling", item: Item.EnergyTank },
  { location: "Missiles_Alpha", item: Item.Missile },
  { location: "Missiles_Beta", item: Item.Missile },
  { location: "Missiles_BillyMays1", item: Item.Missile },
  { location: "Missiles_BillyMays2", item: Item.Missile },
  { location: "Missiles_Moat", item: Item.Missile },
  { location: "PBs_LandingSite", item: Item.PowerBomb },
  { location: "PBs_Retro", item: Item.PowerBomb },
  { location: "Bombs", item: Item.Bombs },
  { location: "EnergyTank_Terminator", item: Item.EnergyTank },
  { location: "Missiles_230", item: Item.Missile },
  { location: "Missiles_OldMB", item: Item.Missile },
  { location: "Supers_EarlySupers", item: Item.Super },
  { location: "Missiles_EarlySupers", item: Item.Missile },
  { location: "ReserveTank_Brinstar", item: Item.Reserve },
  { location: "Missiles_BrinstarReserve1", item: Item.Missile },
  { location: "Missiles_BrinstarReserve2", item: Item.Missile },
  { location: "EnergyTank_Etecoons", item: Item.EnergyTank },
  { location: "Supers_Etecoons", item: Item.Super },
  { location: "PBs_Etecoons", item: Item.PowerBomb },
  { location: "Missiles_BigPink", item: Item.Missile },
  { location: "Supers_SpoSpo", item: Item.Super },
  { location: "Missiles_Charge", item: Item.Missile },
  { location: "ChargeBeam", item: Item.Charge },
  { location: "Missiles_Tube", item: Item.Missile },
  { location: "EnergyTank_Waterway", item: Item.EnergyTank },
  { location: "EnergyTank_WaveGate", item: Item.EnergyTank },
  { location: "PBs_Alpha", item: Item.PowerBomb },
  { location: "Missiles_AlphaPBs", item: Item.Missile },
  { location: "PBs_Beta", item: Item.PowerBomb },
  { location: "Spazer", item: Item.Spazer },
  { location: "EnergyTank_Kraid", item: Item.EnergyTank },
  { location: "Missiles_Kraid", item: Item.Missile },
  { location: "Boss_Kraid", item: Item.Varia },
  { location: "IceBeam", item: Item.Ice },
  { location: "Missiles_CrumbleShaft", item: Item.Missile },
  { location: "EnergyTank_Gauntlet", item: Item.EnergyTank },
  { location: "Missiles_GauntletLeft", item: Item.Missile },
  { location: "Missiles_GauntletRight", item: Item.Missile },
  { location: "Missiles_BubbleMountain", item: Item.Missile },
  { location: "SpeedBooster", item: Item.Speed },
  { location: "Missiles_SpeedBooster", item: Item.Missile },
  { location: "Supers_Climb", item: Item.Super },
  { location: "EnergyTank_Croc", item: Item.EnergyTank },
  { location: "PBs_Croc", item: Item.PowerBomb },
  { location: "Missiles_IndianaJones", item: Item.Missile },
  { location: "Missiles_Cosine", item: Item.Missile },
  { location: "GrappleBeam", item: Item.Grapple },
  { location: "Missiles_NorfairReserve1", item: Item.Missile },
  { location: "Missiles_NorfairReserve2", item: Item.Missile },
  { location: "ReserveTank_Norfair", item: Item.Reserve },
  { location: "WaveBeam", item: Item.Wave },
  { location: "Missiles_Wave", item: Item.Missile },
  { location: "Missiles_Cathedral", item: Item.Missile },
  { location: "Missiles_HiJump", item: Item.Missile },
  { location: "EnergyTank_HiJump", item: Item.EnergyTank },
  { location: "HiJumpBoots", item: Item.HJB },
  { location: "Missiles_Spooky", item: Item.Missile },
  { location: "Missiles_Ocean", item: Item.Missile },
  { location: "Supers_LeftSide", item: Item.Super },
  { location: "Supers_RightSide", item: Item.Super },
  { location: "Missiles_Attic", item: Item.Missile },
  { location: "Missiles_Sky", item: Item.Missile },
  { location: "Missiles_OceanMiddle", item: Item.Missile },
  { location: "Missiles_Bowling", item: Item.Missile },
  { location: "GravitySuit", item: Item.Gravity },
  { location: "ReserveTank_Ship", item: Item.Reserve },
  { location: "EnergyTank_Ship", item: Item.EnergyTank },
  { location: "Missiles_GT", item: Item.Missile },
  { location: "Supers_GT", item: Item.Super },
  { location: "ScrewAttack", item: Item.ScrewAttack },
  { location: "Missiles_Muskateers", item: Item.Missile },
  { location: "Missiles_MickeyMouse", item: Item.Missile },
  { location: "EnergyTank_Firefleas", item: Item.EnergyTank },
  { location: "Missiles_Maze", item: Item.Missile },
  { location: "PBs_Maze", item: Item.PowerBomb },
  { location: "PBs_Shame", item: Item.PowerBomb },
  { location: "Boss_Ridley", item: Item.EnergyTank },
  { location: "Missiles_MainStreet", item: Item.Missile },
  { location: "Supers_Crab", item: Item.Super },
  { location: "Missiles_MamaTurtle", item: Item.Missile },
  { location: "EnergyTank_MamaTurtle", item: Item.EnergyTank },
  { location: "Missiles_Beach", item: Item.Missile },
  { location: "Missiles_WateringHole", item: Item.Missile },
  { location: "Supers_WateringHole", item: Item.Super },
  { location: "Supers_Aqueduct", item: Item.Super },
  { location: "Missiles_Aqueduct", item: Item.Missile },
  { location: "EnergyTank_Botwoon", item: Item.EnergyTank },
  { location: "Missiles_Impossible", item: Item.Missile },
  { location: "Missiles_Precious", item: Item.Missile },
  { location: "Boss_Draygon", item: Item.SpaceJump },
  { location: "Missiles_LeftSandPit", item: Item.Missile },
  { location: "ReserveTank_LeftSandPit", item: Item.Reserve },
  { location: "Missiles_RightSandPit", item: Item.Missile },
  { location: "PBs_RightSandPit", item: Item.PowerBomb },
  { location: "SpringBall", item: Item.SpringBall },
  { location: "PlasmaBeam", item: Item.Plasma },
  { location: "XrayScope", item: Item.Xray },
  { location: "Missiles_CrocEscape", item: Item.Missile },
];

const graph = createVanillaGraph(mapPortals());
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

    const load = cloneLoadout(samus);
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

  if (a % 3 != 0) {
    str += "\n";
  }

  if (!result) {
    console.log("No round trip locations");
  } else {
    console.log(str);
  }

  return result;
};

while (itemPlacement.length > 0) {
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
