import fs from "fs";
import {
  performVerifiedFill,
  getFullPrePool,
  getMajorMinorPrePool,
  isEmptyNode,
  isValidMajorMinor,
} from "./legacy/itemPlacement";
import { getLocations } from "./lib/locations";
import { Item } from "./lib/items";
import { createLoadout } from "./lib/loadout";
import ModeStandard from "./legacy/modeStandard";
import ModeRecall from "./legacy/modeRecall";

export const generateLegacySeed = (seed, recall, full) => {
  const mode = recall
    ? new ModeRecall(seed, getLocations())
    : new ModeStandard(seed, getLocations());
  const [getPrePool, canPlaceItem] = full
    ? [getFullPrePool, isEmptyNode]
    : [getMajorMinorPrePool, isValidMajorMinor];

  // Setup the initial loadout.
  let initLoad = createLoadout();

  // Place the items.
  performVerifiedFill(seed, mode.nodes, mode.itemPool, getPrePool, initLoad, canPlaceItem);

  return mode.nodes;
};

const defaultBosses = () => {
  return {
    kraidBoss: "Kraid",
    phantoonBoss: "Phantoon",
    draygonBoss: "Draygon",
    ridleyBoss: "Ridley",
  }
};

export const readSeed = (fileName) => {
  if (fileName == undefined || fileName.length <= 0) {
    return {
      bosses: defaultBosses(),
      area: [],
      items: []
    }
  }

  const info = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  return {
    bosses: info.bosses == undefined ? defaultBosses() : info.bosses,
    area: info.portals == undefined ? [] : info.portals,
    items: info.itemLocations.map((i) => {
      return {
        location: i.location,
        item: Item[i.item],
      };
    })
  }
}