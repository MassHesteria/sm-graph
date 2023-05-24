import DotNetRandom from "../dotnet-random";
import { majorItem, minorItem, Item } from "../items";
import ItemNode from "../logic";

class ModeRecall {
  nodes = [];
  constructor(seed, locations) {
    this.itemPool = this.setupItemPool(seed);
    this.setupNodes(locations);
  }

  setupItemPool(seed) {
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
      majorItem(0x2f802d, Item.BeamUpgrade, false),
      majorItem(0x2f800b, Item.Ice),
      majorItem(0x2f8017, Item.HJB),
      majorItem(0x2f801b, Item.Speed),
      majorItem(0x2f800d, Item.Wave),
      majorItem(0x2f800f, Item.Spazer),
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
      majorItem(0x2f8029, Item.DoubleJump),
      majorItem(0x2f8027, Item.PressureValve),
      majorItem(0x2f8025, Item.HeatShield),
      majorItem(0x2f802f, Item.BeamUpgrade, false),
      majorItem(0x2f8031, Item.BeamUpgrade, false),
      majorItem(0x2f8033, Item.BeamUpgrade, false),
    ];

    const setAmountInPool = (type, count) => {
      const item = itemPool.find((i) => i.type == type);
      while (itemPool.filter((i) => i == item).length < count) {
        itemPool.unshift(item);
      }
    };

    const numSupers = 15 + rnd.Next(4);
    const numPBs = 15 + rnd.Next(4);
    const numMissiles = 64 - numSupers - numPBs;

    setAmountInPool(Item.Reserve, 2);
    setAmountInPool(Item.EnergyTank, 12);
    setAmountInPool(Item.Missile, numMissiles);
    setAmountInPool(Item.Super, numSupers);
    setAmountInPool(Item.PowerBomb, numPBs);

    return itemPool;
  }

  setupNodes(locations) {
    //-----------------------------------------------------------------
    // Update locations.
    //-----------------------------------------------------------------

    let ws_reserve = locations.find((l) => l.name == "Reserve Tank (Wrecked Ship)");
    ws_reserve.modifier = 0x00;

    //-----------------------------------------------------------------
    // Routines for registering item locations.
    //-----------------------------------------------------------------

    let add = (name, isMajor, available) => {
      let loc = locations.find((p) => p.name == name);
      this.nodes.push(new ItemNode(name, loc, isMajor, available));
    };
    let major = (n, a) => add(n, true, a);
    let minor = (n, a) => add(n, false, a);

    //-----------------------------------------------------------------
    // Logic for each item location.
    //-----------------------------------------------------------------

    major("Bombs", (load) => {
      return load.hasMorph && load.canOpenRedDoors;
    });

    major("Energy Tank (Brinstar Ceiling)", (load) => {
      return true;
    });

    major("Energy Tank (Gauntlet)", (load) => {
      return canEnterAndLeaveGauntlet(load);
    });

    major("Energy Tank (Terminator)", (load) => {
      return load.canDestroyBombWalls || load.hasSpeed;
    });

    minor("Missiles (230)", (load) => {
      return load.canPassBombPassages;
    });

    minor("Missiles (Alpha)", (load) => {
      return load.hasMorph;
    });

    minor("Missiles (Beta)", (load) => {
      return load.hasMorph;
    });

    minor("Missiles (Billy Mays 1)", (load) => {
      return load.canUsePowerBombs;
    });

    minor("Missiles (Billy Mays 2)", (load) => {
      return load.canUsePowerBombs;
    });

    minor("Missiles (Gauntlet Left)", (load) => {
      return canEnterAndLeaveGauntlet(load) && load.canPassBombPassages;
    });

    minor("Missiles (Gauntlet Right)", (load) => {
      return canEnterAndLeaveGauntlet(load) && load.canPassBombPassages;
    });

    minor("Missiles (Moat)", (load) => {
      return canAccessWreckedShip(load);
    });

    minor("Missiles (Mother Brain)", (load) => {
      return load.canDestroyBombWalls;
    });

    major("Morphing Ball", (load) => {
      return true;
    });

    minor("Power Bombs (Landing Site)", (load) => {
      return load.canUsePowerBombs && ((load.hasSpeed && load.totalTanks >= 1) || load.canFly);
    });

    minor("Power Bombs (Morph)", (load) => {
      return load.canUsePowerBombs;
    });

    minor("Supers (Climb)", (load) => {
      return (
        load.canUsePowerBombs && load.hasSpeed && load.energyTanks >= 2 && load.totalTanks >= 3
      );
    });

    major("Energy Tank (Crocomire)", (load) => {
      return canAccessCrocomire(load);
    });

    major("Grapple Beam", (load) => {
      return canAccessCrocomire(load);
    });

    minor("Missiles (Cosine)", (load) => {
      return canAccessCrocomire(load);
    });

    minor("Missiles (Indiana Jones)", (load) => {
      return canAccessCrocomire(load) && (load.canFly || load.hasSpeed);
    });

    minor("Power Bombs (Crocomire)", (load) => {
      return canAccessCrocomire(load);
    });

    major("Energy Tank (Botwoon)", (load) => {
      return canDefeatBotwoon(load);
    });

    minor("Missiles (Aqueduct)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    minor("Missiles (Precious)", (load) => {
      return canDefeatDraygon(load);
    });

    minor("Missiles (Sand Pit Left)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    minor("Missiles (Sand Pit Right)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    major("Plasma Beam", (load) => {
      return canAccessWreckedShip(load) && (load.hasGravity || load.hasPressureValve);
    });

    minor("Power Bombs (Sand Pit Right)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    major("Reserve Tank (Maridia)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    major("Space Jump", (load) => {
      return canDefeatDraygon(load);
    });

    major("Spring Ball", (load) => {
      return canAccessWreckedShip(load) && (load.hasGravity || load.hasPressureValve);
    });

    minor("Supers (Aqueduct)", (load) => {
      return canAccessWestMaridia(load) && load.hasGravity;
    });

    major("Charge Beam", (load) => {
      return load.canUsePowerBombs || (load.canOpenRedDoors && load.canPassBombPassages);
    });

    major("Energy Tank (Etecoons)", (load) => {
      return load.canUsePowerBombs;
    });

    major("Energy Tank (Waterway)", (load) => {
      return load.canUsePowerBombs && load.canOpenRedDoors && (load.hasSpeed || load.hasSpazer);
    });

    major("Energy Tank (Wave Gate)", (load) => {
      return load.canUsePowerBombs && (load.hasWave || load.superPacks > 0);
    });

    minor("Missiles (Big Pink)", (load) => {
      return (
        load.canUsePowerBombs ||
        (load.canOpenRedDoors && (load.hasSpeed || load.canDestroyBombWalls))
      );
    });

    minor("Missiles (Brin Reserve 1)", (load) => {
      return load.canOpenRedDoors && load.canPassBombPassages;
    });

    minor("Missiles (Brin Reserve 2)", (load) => {
      return load.canOpenRedDoors && load.canDestroyBombWalls && load.hasMorph;
    });

    minor("Missiles (Brin Tube)", (load) => {
      return load.canUsePowerBombs || (load.canPassBombPassages && load.canOpenGreenDoors);
    });

    minor("Missiles (Charge)", (load) => {
      return (
        load.canUsePowerBombs ||
        (load.canOpenRedDoors && (load.hasSpeed || load.canDestroyBombWalls))
      );
    });

    minor("Missiles (Early Bridge)", (load) => {
      return load.canOpenRedDoors && load.canDestroyBombWalls;
    });

    minor("Power Bombs (Etecoons)", (load) => {
      return load.canUsePowerBombs;
    });

    minor("Power Bombs (Mission Impossible)", (load) => {
      return load.canUsePowerBombs && load.superPacks > 0;
    });

    major("Reserve Tank (Brinstar)", (load) => {
      return load.canOpenRedDoors && load.canDestroyBombWalls && load.hasMorph;
    });

    minor("Supers (Early Bridge)", (load) => {
      return load.canOpenRedDoors && load.canDestroyBombWalls && load.hasMorph;
    });

    minor("Supers (Etecoons)", (load) => {
      return load.canUsePowerBombs && load.canOpenGreenDoors;
    });

    minor("Supers (Spore Spawn)", (load) => {
      return load.canPassBombPassages && load.superPacks > 0;
    });

    minor("Energy Tank (Kraid)", (load) => {
      return canAccessKraid(load);
    });

    minor("Missiles (Kraid)", (load) => {
      return canAccessKraid(load) && load.canUsePowerBombs;
    });

    major("Varia Suit", (load) => {
      return canAccessKraid(load);
    });

    major("Energy Tank (Firefleas)", (load) => {
      return canPassWorstRoom(load);
    });

    major("Energy Tank (Ridley)", (load) => {
      return canPassWorstRoom(load);
    });

    minor("Missiles (GT)", (load) => {
      return canAccessLowerNorfair(load) && load.hasSpaceJump;
    });

    minor("Missiles (Maze)", (load) => {
      return canPassWorstRoom(load);
    });

    major("Missiles (Mickey Mouse)", (load) => {
      return canPassWorstRoom(load);
    });

    minor("Missiles (Three Muskateers)", (load) => {
      return canPassWorstRoom(load);
    });

    minor("Power Bombs (Maze)", (load) => {
      return canPassWorstRoom(load);
    });

    minor("Power Bombs (Shame)", (load) => {
      return canPassWorstRoom(load);
    });

    major("Screw Attack", (load) => {
      return (
        canAccessLowerNorfair(load) &&
        (load.canFly || load.hasDoubleJump || load.hasSpringBall || load.hasSpeed)
      );
    });

    minor("Supers (GT)", (load) => {
      return canAccessLowerNorfair(load);
    });

    minor("Missiles (Alpha PBs)", (load) => {
      return canAccessRedBrinstar(load) && load.canUsePowerBombs;
    });

    minor("Power Bombs (Alpha)", (load) => {
      return canAccessRedBrinstar(load);
    });

    minor("Power Bombs (Beta)", (load) => {
      return canAccessRedBrinstar(load) && load.canUsePowerBombs;
    });

    major("Spazer", (load) => {
      return canAccessRedBrinstar(load);
    });

    major("Xray Scope", (load) => {
      return (
        canAccessRedBrinstar(load) &&
        load.canUsePowerBombs &&
        (load.hasGrapple ||
          load.hasSpaceJump ||
          (load.hasDoubleJump && load.totalTanks >= 4) ||
          (load.hasHiJump && load.hasSpeed && load.totalTanks >= 4) ||
          (load.hasIce && load.totalTanks >= 4))
      );
    });

    minor("Energy Tank (HJB)", (load) => {
      return canAccessRedBrinstar(load);
    });

    major("HiJump Boots", (load) => {
      return canAccessRedBrinstar(load);
    });

    major("Ice Beam", (load) => {
      return canAccessKraid(load) && (load.hasVaria || load.totalTanks >= 2 || load.hasHeatShield);
    });

    minor("Missiles (Bubble Mountain)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    minor("Missiles (Cathedral)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    minor("Missiles (Croc Escape)", (load) => {
      return (
        canAccessCrocomire(load) &&
        (load.canFly || load.hasGrapple || load.hasDoubleJump || (load.hasHiJump && load.hasSpeed))
      );
    });

    minor("Missiles (Crumble Shaft)", (load) => {
      return canAccessKraid(load) && load.canUsePowerBombs && canHellRun(load);
    });

    minor("Missiles (HJB)", (load) => {
      return canAccessRedBrinstar(load);
    });

    minor("Missiles (Norfair Reserve 1)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    minor("Missiles (Norfair Reserve 2)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    minor("Missiles (Speed)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    minor("Missiles (Wave)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    major("Reserve Tank (Norfair)", (load) => {
      return canAccessHeatedNorfair(load);
    });

    major("Speed Booster", (load) => {
      return canAccessHeatedNorfair(load);
    });

    major("Wave Beam", (load) => {
      return canAccessHeatedNorfair(load);
    });

    major("Energy Tank (Mama Turtle)", (load) => {
      return (
        canAccessWreckedShip(load) &&
        (load.hasGravity ||
          load.hasPressureValve ||
          (load.hasHiJump && (load.hasIce || load.hasSpringBall))) &&
        (load.canFly || load.hasSpeed || load.hasGrapple || load.hasDoubleJump)
      );
    });

    minor("Missiles (Beach)", (load) => {
      return (
        canAccessRedBrinstar(load) &&
        load.canUsePowerBombs &&
        (load.hasGravity || load.hasPressureValve || canDoSuitlessMaridia(load))
      );
    });

    minor("Missiles (Mainstreet)", (load) => {
      return (
        canAccessWreckedShip(load) &&
        load.canUsePowerBombs &&
        (load.hasGravity || load.hasPressureValve) &&
        load.hasSpeed
      );
    });

    minor("Missiles (Mama Turtle)", (load) => {
      return canAccessWestMaridia(load);
    });

    major("Missiles (Watering Hole)", (load) => {
      return (
        canAccessRedBrinstar(load) &&
        load.canUsePowerBombs &&
        (load.hasGravity || load.hasPressureValve || canDoSuitlessMaridia(load))
      );
    });

    minor("Supers (Crab)", (load) => {
      return canAccessWestMaridia(load);
    });

    minor("Supers (Watering Hole)", (load) => {
      return (
        canAccessRedBrinstar(load) &&
        load.canUsePowerBombs &&
        (load.hasGravity || load.hasPressureValve || canDoSuitlessMaridia(load))
      );
    });

    major("Energy Tank (Wrecked Ship)", (load) => {
      return canAccessWreckedShip(load);
    });

    major("Gravity Suit", (load) => {
      return (
        canAccessWreckedShip(load) &&
        ((load.hasVaria && load.totalTanks >= 1) || load.totalTanks >= 2)
      );
    });

    minor("Missiles (Attic)", (load) => {
      return canAccessWreckedShip(load);
    });

    minor("Missiles (Bowling)", (load) => {
      return (
        canAccessWreckedShip(load) &&
        ((load.hasVaria && load.totalTanks >= 1) || load.totalTanks >= 2)
      );
    });

    minor("Missiles (Ocean Bottom)", (load) => {
      return canAccessWreckedShip(load);
    });

    minor("Missiles (Ocean Middle)", (load) => {
      return canAccessWreckedShip(load);
    });

    major("Missiles (Sky)", (load) => {
      return canAccessWreckedShip(load);
    });

    minor("Missiles (Spooky)", (load) => {
      return canAccessWreckedShip(load);
    });

    major("Reserve Tank (Wrecked Ship)", (load) => {
      return (
        canAccessWreckedShip(load) &&
        ((load.hasVaria && load.totalTanks >= 1) || load.totalTanks >= 2)
      );
    });

    minor("Supers (WS Left)", (load) => {
      return canAccessWreckedShip(load);
    });

    major("Supers (WS Right)", (load) => {
      return canAccessWreckedShip(load);
    });
  }
}

//-----------------------------------------------------------------
// Common logic used at item locations.
//-----------------------------------------------------------------

const canHellRun = (load) => {
  return (
    load.totalTanks >= 4 ||
    (load.totalTanks >= 3 && load.hasGravity) ||
    load.hasVaria ||
    load.hasHeatShield
  );
};

const canAccessRedBrinstar = (load) => {
  return (
    load.superPacks >= 1 && (load.canUsePowerBombs || (load.canDestroyBombWalls && load.hasMorph))
  );
};

const canAccessHeatedNorfair = (load) => {
  return canAccessRedBrinstar(load) && canHellRun(load);
};

const canAccessLowerNorfair = (load) => {
  return (
    canAccessHeatedNorfair(load) &&
    load.canUsePowerBombs &&
    load.hasVaria &&
    (load.hasHiJump || load.hasGravity)
  );
};

const canPassWorstRoom = (load) => {
  return (
    canAccessLowerNorfair(load) &&
    (load.canFly || load.hasHiJump || load.hasSpringBall || load.hasDoubleJump)
  );
};

const canAccessKraid = (load) => {
  return canAccessRedBrinstar(load) && load.canPassBombPassages;
};

const canAccessCrocomire = (load) => {
  return (
    canAccessHeatedNorfair(load) ||
    (canAccessKraid(load) && load.canUsePowerBombs && load.hasSpeed && load.totalTanks >= 2)
  );
};

const canDoSuitlessMaridia = (load) => {
  return load.hasHiJump && load.hasGrapple && (load.hasIce || load.hasSpringBall);
};

const canDefeatBotwoon = (load) => {
  return (
    canAccessRedBrinstar(load) &&
    load.canUsePowerBombs &&
    (load.hasIce || load.hasSpeed || load.hasSpazer) &&
    (load.hasGravity || (canDoSuitlessMaridia(load) && load.hasIce))
  );
};

const canDefeatDraygon = (load) => {
  return canDefeatBotwoon(load) && load.hasGravity;
};

const canAccessWreckedShip = (load) => {
  return load.canUsePowerBombs && load.superPacks >= 1;
};

const canAccessWestMaridia = (load) => {
  return (
    canAccessRedBrinstar(load) &&
    load.canUsePowerBombs &&
    (load.hasGravity ||
      load.hasPressureValve ||
      (load.hasHiJump && (load.hasIce || load.hasSpringBall)))
  );
};

const canEnterAndLeaveGauntlet = (load) => {
  return (
    (load.canUseBombs && load.totalTanks >= 2) ||
    load.hasScrewAttack ||
    (load.canUsePowerBombs && load.powerPacks >= 2 && load.totalTanks >= 1)
  );
};

export default ModeRecall;
