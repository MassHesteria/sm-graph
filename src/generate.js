import fs from "fs";
import {
  performVerifiedFill,
  getFullPrePool,
  getMajorMinorPrePool,
  isEmptyNode,
  isValidMajorMinor,
  verifyItemProgression,
} from "./lib/itemPlacement";
import { getLocations } from "./lib/locations";
import { Item } from "./lib/items";
import Loadout from "./lib/loadout";
import ModeStandard from "./lib/modes/modeStandard";
import ModeRecall from "./lib/modes/modeRecall";
import { mapLocation } from "./lib/graph/util";

export const generateSeed = (seed, recall, full, failMode) => {
  const mode = recall
    ? new ModeRecall(seed, getLocations())
    : new ModeStandard(seed, getLocations());
  const [getPrePool, canPlaceItem] = full
    ? [getFullPrePool, isEmptyNode]
    : [getMajorMinorPrePool, isValidMajorMinor];

  // Setup the initial loadout.
  let initLoad = new Loadout();

  // Starter Charge is considered for Recall but not for Standard.
  initLoad.hasCharge = recall;

  // Place the items.
  performVerifiedFill(
    seed,
    mode.nodes,
    mode.itemPool,
    getPrePool,
    initLoad,
    canPlaceItem,
    failMode
  );
  mode.nodes.forEach((n) => (n.location.name = mapLocation(n.location.name)));

  //let log = [];
  //verifyItemProgression(initLoad, mode.nodes, log);
  //console.log("** old verify **");
  //log.forEach((e) => console.log(`${e.item.name} @ ${e.location.name}`));
  //console.log("****************");

  return mode.nodes;
};

export const readBosses = (fileName) => {
  if (fileName == undefined || fileName.length <= 0) {
    return {
      kraidBoss: "Kraid",
      phantoonBoss: "Phantoon",
      draygonBoss: "Draygon",
      ridleyBoss: "Ridley",
    };
  }
  const seedInfo = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  return seedInfo.bosses;
};

export const readPortals = (fileName) => {
  if (fileName == undefined || fileName.length <= 0) {
    return [];
  }
  const seedInfo = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  return seedInfo.portals;
};

export const readSeed = (fileName) => {
  const getItem = (itemName) => {
    let itemKey = 0;
    Object.entries(Item).forEach((value) => {
      if (value[0] == itemName) {
        itemKey = value[1];
      }
    });
    return itemKey;
  };

  const seedInfo = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  return seedInfo.itemLocations.map((i) => {
    return {
      location: mapLocation(i.location),
      item: getItem(i.item),
    };
  });
};
