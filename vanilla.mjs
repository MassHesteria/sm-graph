import { con, printMap, printPossibleRooms, printRooms, processWiki } from "./util.mjs";
import { breadthFirstSearch } from "./search.mjs";

let vanilla = [
  /* ----- Landing Site ----- */

  con("LandingSite_Ship", "LandingSite_Ledge", (samus) => samus.canFly),
  con("LandingSite_Ledge", "LandingSite_Ship"),

  con("LandingSite_Ship", "CrateriaTube", (samus) => samus.canOpenGreenDoors),
  con("CrateriaTube", "LandingSite_Ship"),

  con(
    "LandingSite_Ship",
    "LandingSite_PreGauntlet",
    (samus) => samus.canUseBombs || samus.canUsePowerBombs
  ),
  con(
    "LandingSite_PreGauntlet",
    "LandingSite_Ship",
    (samus) => samus.canUseBombs || samus.canUsePowerBombs
  ),

  con("LandingSite_Ledge", "LandingSitePBs", (samus) => samus.canUsePowerBombs),
  con("LandingSitePBs", "LandingSite_Ledge"),

  con("LandingSite_Ship", "Parlor_Main"),
  con("Parlor_Main", "LandingSite_Ship"),

  con("Parlor_Main", "Parlor_Alcatraz", (samus) => samus.hasMorph),
  con("Parlor_Alcatraz", "Parlor_Main", (samus) => samus.hasMorph),

  con("Parlor_Alcatraz", "Flyway"),
  con("Flyway", "Parlor_Alcatraz"),

  con("Flyway", "BombTorizo", (samus) => samus.canOpenRedDoors),
  con("BombTorizo", "Flyway"),

  con("Parlor_Main", "230Hallway"),
  con("230Hallway", "Parlor_Main"),

  con("230Hallway", "230Missiles", (samus) => samus.canUseBombs || samus.canUsePowerBombs),
  con("230Missiles", "230Hallway", (samus) => samus.hasMorph),

  con("Parlor_Main", "Climb"),
  con("Climb", "Parlor_Main"),

  con("Climb", "PitRoom_Main"),
  con("PitRoom_Main", "Climb"),

  con("PitRoom_Main", "ElevatorToBlueBrinstar"),
  con("ElevatorToBlueBrinstar", "PitRoom_Main"),

  con("ElevatorToBlueBrinstar", "MorphBall_Pedastal"),
  con("MorphBall_Pedastal", "ElevatorToBlueBrinstar"),

  con("MorphBall_Pedastal", "MorphBall_RetroPBs", (samus) => samus.canUsePowerBombs),
  con("MorphBall_RetroPBs", "MorphBall_Pedastal", (samus) => samus.canUsePowerBombs),

  con("MorphBall_Pedastal", "ConstructionZone"),
  con("ConstructionZone", "MorphBall_Pedastal"),

  con("ConstructionZone", "AlphaMissiles", (samus) => samus.hasMorph),
  con("AlphaMissiles", "ConstructionZone", (samus) => samus.hasMorph),

  con("ConstructionZone", "CeilingTank_Main"),
  con("CeilingTank_Main", "ConstructionZone"),

  con("CeilingTank_Main", "CeilingTank_Missiles", (samus) => samus.hasMorph),
  con("CeilingTank_Missiles", "CeilingTank_Main", (samus) => samus.hasMorph),
];

const load = {};

const itemPlacement = [
  { location: "MorphBall_Pedastal", action: (load) => (load.hasMorph = true) },
  { location: "AlphaMissiles", action: (load) => (load.canOpenRedDoors = true) },
  {
    location: "BombTorizo",
    action: (load) => {
      load.canUseBombs = load.hasMorph;
      load.canFly = load.hasMorph;
    },
  },
];

let collected = [];

const printItemLocations = (load) => {
  const available = breadthFirstSearch(vanilla, vanilla[0].from, load);
  const itemLocations = available
    .filter((v) => v.item != "none" && !collected.includes(v.name))
    .map((v) => v.name);
  console.log(itemLocations);
  return itemLocations;
};

while (itemPlacement.length > 0) {
  const itemLocations = printItemLocations(load);
  const index = itemPlacement.findIndex((i) => itemLocations.includes(i.location));

  if (index < 0) {
    console.log("no items");
    break;
  }

  itemPlacement[index].action(load);
  collected.push(itemPlacement[index].location);
  itemPlacement.splice(index, 1);
}

//itemPlacement[0].action(load);

//console.log("\n-- after --");
printItemLocations(load);

//processChat();
//printMap(vanilla);
//printPossibleRooms();
//printRooms(vanilla);
