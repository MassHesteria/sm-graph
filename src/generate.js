import fs from "fs";
import {
  performVerifiedFill,
  getFullPrePool,
  getMajorMinorPrePool,
  isEmptyNode,
  isValidMajorMinor,
  verifyItemProgression,
} from "./lib/itemPlacement";
import DotNetRandom from "./lib/dotnet-random";
import { getLocations } from "./lib/locations";
import { Item } from "./lib/items";
import Loadout from "./lib/loadout";
import ModeStandard from "./lib/modes/modeStandard";
import ModeRecall from "./lib/modes/modeRecall";
import { mapLocation } from "./lib/graph/util";

export const generateSeed = (seed, recall, full) => {
  const mode = recall
    ? new ModeRecall(seed, getLocations())
    : new ModeStandard(seed, getLocations());
  const [getPrePool, canPlaceItem] = full
    ? [getFullPrePool, isEmptyNode]
    : [getMajorMinorPrePool, isValidMajorMinor];

  // Setup the initial loadout.
  let initLoad = new Loadout();

  // Place the items.
  performVerifiedFill(seed, mode.nodes, mode.itemPool, getPrePool, initLoad, canPlaceItem);
  mode.nodes.forEach((n) => (n.location.name = mapLocation(n.location.name)));

  //let log = [];
  //verifyItemProgression(initLoad, mode.nodes, log);
  //console.log("** old verify **");
  //log.forEach((e) => console.log(`${e.item.name} @ ${e.location.name}`));
  //console.log("****************");

  return mode.nodes;
};

export const generateInvalidSeed = (seed, recall, full) => {
  const mode = recall
    ? new ModeRecall(seed, getLocations())
    : new ModeStandard(seed, getLocations());
  const [getPrePool, canPlaceItem] = full
    ? [getFullPrePool, isEmptyNode]
    : [getMajorMinorPrePool, isValidMajorMinor];
  const nodes = mode.nodes;
  const itemPool = mode.itemPool;
  let initLoad = new Loadout();
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Utility routines for shuffling arrays.
  //-----------------------------------------------------------------

  const swap = (arr, x, y) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      swap(arr, i, rnd.NextInRange(i, arr.length));
    }
  };

  //-----------------------------------------------------------------
  // Shuffle item locations.
  //-----------------------------------------------------------------

  let shuffledLocations = [...nodes];
  shuffle(shuffledLocations);

  //-----------------------------------------------------------------
  // Prefill locations with early items.
  //-----------------------------------------------------------------

  let prefillLoadout = initLoad.clone();

  getPrePool(rnd).forEach((itemType) => {
    const itemIndex = itemPool.findIndex((i) => i.type == itemType);
    const item = itemPool.splice(itemIndex, 1)[0];
    const available = shuffledLocations.find(
      (n) => n.available(prefillLoadout) && canPlaceItem(item, n)
    );

    available.SetItem(item);
    prefillLoadout.add(itemType);
  });

  //-----------------------------------------------------------------
  // Utility routine for placing items.
  //-----------------------------------------------------------------

  const placeItems = (itemPool, nodes) => {
    //-----------------------------------------------------------------
    // Create a shuffled list of items to place.
    //-----------------------------------------------------------------

    let shuffledItems = [...itemPool];
    shuffle(shuffledItems);

    //-----------------------------------------------------------------
    // Blindly place items in valid locations.
    //-----------------------------------------------------------------

    for (let j = 0; j < nodes.length; j++) {
      let n = nodes[j];

      const itemIndex = shuffledItems.findIndex((i) => canPlaceItem(i, n));
      if (itemIndex < 0) {
        return false;
      }
      n.item = shuffledItems.splice(itemIndex, 1)[0];
    }
    return true;
  };

  //-----------------------------------------------------------------
  // Make a copy of the non-prefilled nodes.
  //-----------------------------------------------------------------

  const nonPrefilled = shuffledLocations.filter((n) => n.item == undefined);

  //-----------------------------------------------------------------
  // Randomly place items until seed is verified.
  //-----------------------------------------------------------------

  let attempts = 0;
  while (attempts < 100) {
    attempts += 1;

    nonPrefilled.forEach((n) => (n.item = undefined));

    if (!placeItems(itemPool, nonPrefilled)) {
      continue;
    }

    if (verifyItemProgression(initLoad, nodes, null)) {
      continue;
    }

    break;
  }

  nodes.forEach((n) => (n.location.name = mapLocation(n.location.name)));
  return nodes;
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
  if (seedInfo.portals == undefined) {
    return [];
  }
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
