import DotNetRandom from "../dotnet-random.js";
import { Item } from "../items.ts";
import GraphSolver from "./solver.js";
import { cloneGraph, loadGraph } from "./init.js";
import Loadout from "../loadout.js";
import { getFullPrePool, getMajorMinorPrePool } from "../itemPlacement.js";
import { getItemPool } from "./items.js";
import { BossMode, MajorDistributionMode } from "./params.js";

//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const canPlaceItem_Full = (item, vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
      case "LowerNorfair":
        return false;
      default:
        break;
    }
  }
  return true;
};

const canPlaceItem_MajorMinor = (item, vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.isMajor != (vertex.type == "major")) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
      case "LowerNorfair":
        return false;
      default:
        break;
    }
  }
  return true;
};

//-----------------------------------------------------------------
// Place items within the graph.
//-----------------------------------------------------------------

const graphFill = (seed, graph, itemPoolParams, settings, maxAttempts = 10) => {
  const solver = new GraphSolver(graph, settings);
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Extract parameters.
  //-----------------------------------------------------------------

  const { beamMode } = settings;
  const { majorDistribution, minorDistribution } = itemPoolParams;
  const restrictType = majorDistribution.mode != MajorDistributionMode.Full;

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

  let itemVertices = graph.map((e) => e.from).filter((v) => v.type != "");
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  let shuffledLocations = itemVertices.filter(isUnique);
  shuffle(shuffledLocations);

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const canPlaceItem = restrictType
    ? canPlaceItem_MajorMinor
    : canPlaceItem_Full;

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const itemPool = getItemPool(
    seed,
    majorDistribution,
    minorDistribution,
    beamMode
  );

  //-----------------------------------------------------------------
  // Prefill locations with early items.
  //-----------------------------------------------------------------

  const getPrePool = restrictType ? getMajorMinorPrePool : getFullPrePool;
  let prefillLoadout = new Loadout();

  getPrePool(rnd).forEach((itemType) => {
    const itemIndex = itemPool.findIndex((i) => i.type == itemType);
    const item = itemPool.splice(itemIndex, 1)[0];
    const available = shuffledLocations.find(
      (v) =>
        canPlaceItem(item, v) &&
        solver.isVertexAvailable(v, prefillLoadout, itemType, settings)
    );

    available.item = item;
    prefillLoadout.add(itemType);
  });

  //-----------------------------------------------------------------
  // Utility routine for placing items.
  //-----------------------------------------------------------------

  const placeItems = (itemPool, vertices) => {
    //-----------------------------------------------------------------
    // Create a shuffled list of items to place.
    //-----------------------------------------------------------------

    let shuffledItems = [...itemPool];
    shuffle(shuffledItems);

    //-----------------------------------------------------------------
    // Blindly place items in valid locations.
    //-----------------------------------------------------------------

    for (let j = 0; j < vertices.length; j++) {
      let v = vertices[j];

      const itemIndex = shuffledItems.findIndex((i) => canPlaceItem(i, v));
      if (itemIndex < 0) {
        return false;
      }
      v.item = shuffledItems.splice(itemIndex, 1)[0];
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
  while (attempts < maxAttempts) {
    attempts += 1;

    nonPrefilled.forEach((n) => (n.item = undefined));

    if (!placeItems(itemPool, nonPrefilled)) {
      continue;
    }

    const tempSolver = new GraphSolver(cloneGraph(graph), settings);
    if (tempSolver.isValid(new Loadout())) {
      return attempts;
    }
  }
  throw new Error(
    `Failed to fill graph for seed ${seed} after ${attempts} attempts`
  );
};

//-----------------------------------------------------------------
// Performs multiple passes to generate a seed using a graph.
//-----------------------------------------------------------------

export const generateSeed = (seed, mapLayout, itemPoolParams, settings) => {
  const maxOuterLoop = 20;
  let maxInnerLoop = 10;

  if (!settings.randomizeAreas) {
    maxInnerLoop *= 10;
  }
  if (settings.bossMode == BossMode.Vanilla) {
    maxInnerLoop *= 2;
  }

  let attempts = 1;
  while (attempts < maxOuterLoop) {
    const graph = loadGraph(
      seed,
      attempts,
      mapLayout,
      itemPoolParams.majorDistribution.mode,
      settings.randomizeAreas,
      settings.bossMode
    );

    try {
      graphFill(seed, graph, itemPoolParams, settings, maxInnerLoop);
      return graph;
    } catch (e) {
      attempts += 1;
    }
  }
  throw new Error(`Failed to generate seed ${seed}`);
};
