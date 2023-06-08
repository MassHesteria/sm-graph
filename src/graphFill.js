import DotNetRandom from "./dash/dotnet-random";
import { Item } from "./dash/items";
import GraphSolver from "./graphSolver";
import { cloneGraph } from "./data/vanilla/graph";

export const graphFill = (seed, graph, getFlags, itemPool, getPrePool, initLoad, restrictType) => {
  const solver = new GraphSolver(graph, getFlags);
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

  let itemVertices = graph.map((e) => e.from).filter((v) => v.type != "");
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  let shuffledLocations = itemVertices.filter(isUnique);
  shuffle(shuffledLocations);

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const canPlaceItem = (item, vertex) => {
    if (vertex.item != undefined) {
      return false;
    }
    if (!restrictType) {
      return true;
    }
    if (item.isMajor != (vertex.type == "major")) {
      return false;
    }
    if (item.type == Item.Gravity) {
      //if (vertex.area == Area.Crateria) {
      if (vertex.area == "Crateria") {
        return false;
      }
    } else if (item.type == Item.Varia) {
      //if (vertex.area == Area.LowerNorfair || vertex.area == Area.Crateria) {
      if (vertex.area == "LowerNorfair" || vertex.area == "Crateria") {
        return false;
      }
    } else {
      return true;
    }

    if (
      vertex.name == "MorphBall" ||
      vertex.name == "Missiles_Beta" ||
      vertex.name == "EnergyTank_Ceiling"
    ) {
      return false;
    }
    return true;
    //switch (node.location.address) {
    //case 0x786de: // Morphing Ball
    //case 0x78798: // Missiles (Beta)
    //case 0x7879e: // Energy Tank (Brinstar Ceiling)
    //return false;
    //default:
    //return true;
    //}
  };

  //-----------------------------------------------------------------
  // Prefill locations with early items.
  //-----------------------------------------------------------------

  let prefillLoadout = initLoad.clone();

  getPrePool(rnd).forEach((itemType) => {
    const itemIndex = itemPool.findIndex((i) => i.type == itemType);
    const item = itemPool.splice(itemIndex, 1)[0];
    const available = shuffledLocations.find(
      (v) => canPlaceItem(item, v) && solver.isVertexAvailable(v, prefillLoadout, itemType)
    );

    available.item = itemType;
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
      v.item = shuffledItems.splice(itemIndex, 1)[0].type;
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

    placeItems(itemPool, nonPrefilled);

    const tempSolver = new GraphSolver(cloneGraph(graph), getFlags);
    if (tempSolver.isValid(initLoad)) {
      break;
    }
  }
};
