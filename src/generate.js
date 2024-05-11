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

const getPortal = (name) => {
  switch (name) {
    case "Door_LavaDive":
      return "Door_KronicBoost"
    case "Door_HighwayExit":
      return "Door_WSHighway"
    case "Door_Highway":
      return "Door_EMHighway"
    case "Door_Muskateers":
      return "Door_Musketeers"
    case "Door_Crabs":
      return "Door_CrateriaCrabs"
    case "Door_ElevatorEntry":
      return "Door_BusinessCenterLeft"
    default:
      break;
  }
  return name
}

const getLocation = (name) => {
  switch (name) {
    case "Missiles (Three Muskateers)":
      return "Missiles (Three Musketeers)"
    default:
      break;
  }
  return name
}

export const readSeed = (fileName) => {
  if (fileName == undefined || fileName.length <= 0) {
    return {
      bosses: defaultBosses(),
      area: [],
      items: []
    }
  }

  const info = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  let area = []
  if (info.portals) {
    area = info.portals.map(([a, b]) => {
      return [getPortal(a), getPortal(b)]
    })
  }
  return {
    bosses: info.bosses == undefined ? defaultBosses() : info.bosses,
    area,
    items: info.itemLocations.map((i) => {
      return {
        location: getLocation(i.location),
        item: Item[i.item],
      };
    })
  }
}