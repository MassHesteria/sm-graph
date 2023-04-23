import { con, printMap, printRooms } from "./util.mjs";

let vanilla = [
  /* ----- Landing Site ----- */

  con("LandingSite_Ship", "LandingSite_Ledge", (samus) => samus.canFly),
  con("LandingSite_Ledge", "LandingSite_Ship"),

  con("LandingSite_Ship", "CrateriaTube", (samus) => samus.hasSupers),
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

  con("Flyway", "BombTorizo", (samus) => samus.hasSupers || samus.hasMissiles),
  con("BombTorizo", "Flyway"),
];

printMap(vanilla);
printRooms(vanilla);
