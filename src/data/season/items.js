import DotNetRandom from "../../dash/dotnet-random";
import { Item, majorItem, minorItem } from "../../dash/items";

export const getSeasonItemPool = (seed) => {
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Setup the pool of items that will be placed.
  //-----------------------------------------------------------------

  let itemPool = [
    majorItem(0x000000, Item.EnergyTank, false),
    minorItem(0x000000, Item.Missile),
    minorItem(0x000000, Item.Super),
    minorItem(0x000000, Item.PowerBomb),
    majorItem(0x2f8009, Item.Bombs),
    majorItem(0x2f802b, Item.Charge, false),
    majorItem(0x2f800b, Item.Ice),
    majorItem(0x2f8017, Item.HJB),
    majorItem(0x2f801b, Item.Speed),
    majorItem(0x2f800d, Item.Wave),
    majorItem(0x2f800f, Item.Spazer, false),
    majorItem(0x2f801f, Item.SpringBall),
    majorItem(0x2f8013, Item.Varia),
    majorItem(0x2f8011, Item.Plasma),
    majorItem(0x2f8023, Item.Grapple),
    majorItem(0x2f8007, Item.Morph),
    majorItem(0x000000, Item.Reserve),
    majorItem(0x2f8015, Item.Gravity),
    majorItem(0x2f8021, Item.Xray, false),
    majorItem(0x2f8019, Item.SpaceJump),
    majorItem(0x2f801d, Item.ScrewAttack),
  ];

  const setAmountInPool = (type, count) => {
    const item = itemPool.find((i) => i.type == type);
    while (itemPool.filter((i) => i == item).length < count) {
      itemPool.unshift(item);
    }
  };

  setAmountInPool(Item.Reserve, 4);
  setAmountInPool(Item.EnergyTank, 14);

  let itemCount = itemPool.length;
  let numMissiles = 1;
  let numSupers = 1;
  let numPBs = 1;

  const distribution = [3, 5, 6]; // 3:2:1
  while (itemCount < 100) {
    const draw = rnd.Next(distribution[distribution.length - 1]);
    if (draw < distribution[0]) {
      numMissiles += 1;
    } else if (draw < distribution[1]) {
      numSupers += 1;
    } else {
      numPBs += 1;
    }
    itemCount += 1;
  }

  setAmountInPool(Item.Missile, numMissiles);
  setAmountInPool(Item.Super, numSupers);
  setAmountInPool(Item.PowerBomb, numPBs);

  //console.log("numMissiles:", numMissiles, "numSupers:", numSupers, "numPBs:", numPBs);
  return itemPool;
};
