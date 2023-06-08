import DotNetRandom from "../../dash/dotnet-random";
import { Item, majorItem, minorItem } from "../../dash/items";

export const getClassicItemPool = (seed) => {
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

  const numSupers = 12 + rnd.Next(7);
  const numPBs = 14 + rnd.Next(7);
  const numMissiles = 66 - numSupers - numPBs;

  setAmountInPool(Item.Reserve, 4);
  setAmountInPool(Item.EnergyTank, 14);
  setAmountInPool(Item.Missile, numMissiles);
  setAmountInPool(Item.Super, numSupers);
  setAmountInPool(Item.PowerBomb, numPBs);

  //console.log("numMissiles:", numMissiles, "numSupers:", numSupers, "numPBs:", numPBs);
  return itemPool;
};
