const canDoSuitlessMaridia = (samus) => {
  return samus.hasHiJump && samus.hasGrapple && (samus.hasIce || samus.hasSpringBall);
};

export const edges = {
  Crateria: {
    Ship: {
      PBs_LandingSite: (samus) => samus.canFly && samus.canUsePowerBombs,
      PreGauntlet: (samus) => samus.canDestroyBombWalls,
      PreMoat: (samus) => samus.canOpenGreenDoors,
      Parlor: (_) => true,
    },

    PBs_LandingSite: {
      Ship: (_) => true,
    },

    PreMoat: {
      Ship: (_) => true,
      Missiles_Moat: (samus) => samus.canUsePowerBombs,
      Door_Crabs: (samus) => samus.canUsePowerBombs,
    },

    Door_Crabs: {
      PreMoat: (_) => true,
    },

    Missiles_Moat: {
      Door_Crabs: (_) => true,
      Door_Moat: (samus) =>
        (samus.hasMorph && samus.hasSpringBall) ||
        samus.hasSpeed ||
        samus.hasGrapple ||
        samus.hasSpaceJump ||
        samus.hasGravity,
    },

    Door_Moat: {
      Missiles_Moat: (_) => true,
    },

    PreGauntlet: {
      Ship: (samus) => samus.canDestroyBombWalls,
      EnergyTank_Gauntlet: (samus) =>
        samus.energyTanks >= 2 &&
        (samus.canUseBombs || (samus.hasMorph && samus.powerPacks >= 2) || samus.hasScrewAttack),
    },

    EnergyTank_Gauntlet: {
      PreGauntlet: (samus) =>
        samus.energyTanks >= 2 &&
        (samus.canUseBombs || (samus.hasMorph && samus.powerPacks >= 2) || samus.hasScrewAttack),
      Missiles_GauntletLeft: (_) => true,
      Missiles_GauntletRight: (_) => true,
      EnergyTank_Terminator: (_) => true,
    },

    Missiles_GauntletLeft: {
      Missiles_GauntletRight: (_) => true,
      EnergyTank_Terminator: (_) => true,
    },

    Missiles_GauntletRight: {
      Missiles_GauntletLeft: (_) => true,
      EnergyTank_Terminator: (_) => true,
    },

    EnergyTank_Terminator: {
      Parlor: (samus) => samus.canDestroyBombWalls,
      Door_G4: (samus) => samus.canOpenRedDoors,
      Door_Kago: (_) => true,
    },

    Door_G4: {
      EnergyTank_Terminator: (_) => true,
    },

    Door_Kago: {
      EnergyTank_Terminator: (_) => true,
    },

    Parlor: {
      EnergyTank_Terminator: (samus) => samus.canDestroyBombWalls,
      Bombs: (samus) => samus.hasMorph && samus.canOpenRedDoors,
      Climb: (_) => true,
      Missiles_230: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Ship: (_) => true,
    },

    Bombs: {
      Parlor: (samus) => samus.hasMorph,
    },

    Missiles_230: {
      Parlor: (samus) => samus.hasMorph,
    },

    Climb: {
      Parlor: (_) => true,
      ClimbSupersBottom: (samus) => samus.canUsePowerBombs,
      Missiles_OldMB: (samus) => samus.canDestroyBombWalls,
      MorphBall: (_) => true,
    },

    ClimbSupersBottom: {
      Climb: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Supers_Climb: (samus) => samus.hasSpeed && samus.energyTanks >= 1,
    },

    Supers_Climb: {
      Climb: (samus) => samus.hasGrapple || samus.energyTanks >= 2,
    },

    Missiles_OldMB: {
      Climb: (samus) => samus.canDestroyBombWalls,
    },
  },
  BlueBrinstar: {
    MorphBall: {
      Climb: (_) => true,
      EnergyTank_Ceiling: (samus) => samus.canOpenRedDoors,
      PBs_Retro: (samus) => samus.canUsePowerBombs,
      Missiles_Alpha: (samus) => samus.hasMorph,
    },

    PBs_Retro: {
      MorphBall: (samus) => samus.canUsePowerBombs,
      Door_RetroPBs: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Door_RetroPBs: {
      PBs_Retro: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Missiles_Alpha: {
      MorphBall: (samus) => samus.hasMorph,
    },

    EnergyTank_Ceiling: {
      MorphBall: (_) => true,
      Missiles_Beta: (samus) => samus.hasMorph,
      Missiles_BillyMays1: (samus) => samus.canUsePowerBombs,
    },

    Missiles_Beta: {
      EnergyTank_Ceiling: (samus) => samus.hasMorph,
    },

    Missiles_BillyMays1: {
      EnergyTank_Ceiling: (samus) => samus.canUsePowerBombs,
      Missiles_BillyMays2: (_) => true,
    },

    Missiles_BillyMays2: {
      Missiles_BillyMays1: (_) => true,
    },
  },
  GreenBrinstar: {
    Door_GreenElevator: {
      Missiles_EarlySupers: (samus) => samus.canOpenRedDoors,
      EnergyTank_Etecoons: (samus) => samus.canUsePowerBombs,
      DachoraRoomLeft: (_) => true,
    },

    Missiles_EarlySupers: {
      Door_GreenElevator: (_) => true,
      Supers_EarlySupers: (samus) => samus.hasMorph || samus.hasSpeed,
    },

    Supers_EarlySupers: {
      Missiles_EarlySupers: (_) => true,
      ReserveTank_Brinstar: (samus) => samus.canOpenRedDoors,
    },

    ReserveTank_Brinstar: {
      Supers_EarlySupers: (_) => true,
      Missiles_BrinstarReserve1: (samus) => samus.hasMorph,
    },

    Missiles_BrinstarReserve1: {
      ReserveTank_Brinstar: (samus) => samus.hasMorph,
      Missiles_BrinstarReserve2: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Missiles_BrinstarReserve2: {
      Missiles_BrinstarReserve1: (_) => true,
      ReserveTank_Brinstar: (samus) => samus.hasMorph,
    },

    EnergyTank_Etecoons: {
      Door_GreenElevator: (samus) => samus.canUsePowerBombs,
      Supers_Etecoons: (samus) => samus.canOpenGreenDoors,
      PBs_Etecoons: (samus) => samus.hasMorph,
    },

    Supers_Etecoons: {
      EnergyTank_Etecoons: (_) => true,
    },

    PBs_Etecoons: {
      EnergyTank_Etecoons: (samus) => samus.hasMorph,
    },

    DachoraRoomLeft: {
      Door_GreenElevator: (_) => true,
      DachoraRoomRight: (samus) => samus.canDestroyBombWalls || samus.hasScrewAttack,
    },

    DachoraRoomRight: {
      DachoraRoomLeft: (samus) => samus.canDestroyBombWalls || samus.hasScrewAttack,
      Missiles_BigPink: (_) => true,
    },

    Missiles_BigPink: {
      DachoraRoomRight: (_) => true,
      Missiles_Charge: (_) => true,
      EnergyTank_WaveGate: (samus) =>
        samus.canUsePowerBombs && (samus.superPacks >= 1 || samus.hasWave),
      Supers_SpoSpo: (samus) =>
        (samus.canUseBombs || samus.canUsePowerBombs) && samus.superPacks >= 1,
      Missiles_Impossible: (samus) => samus.canUsePowerBombs && samus.canOpenGreenDoors,
    },

    Missiles_Impossible: {
      Missiles_BigPink: (samus) => samus.canUseBombs && samus.canUsePowerBombs,
    },

    Supers_SpoSpo: {
      Missiles_BigPink: (samus) =>
        (samus.canUseBombs || samus.canUsePowerBombs) && samus.superPacks >= 1,
    },

    Missiles_Charge: {
      Missiles_BigPink: (_) => true,
      ChargeBeam: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Missiles_Tube: (samus) => samus.canOpenGreenDoors,
    },

    ChargeBeam: {
      Missiles_Charge: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      EnergyTank_Waterway: (samus) =>
        samus.canUsePowerBombs && samus.canOpenRedDoors && samus.hasSpeed,
    },

    EnergyTank_Waterway: {
      ChargeBeam: (samus) => samus.canUsePowerBombs,
    },

    Missiles_Tube: {
      Missiles_Charge: (_) => true,
      Door_NoobBridge: (samus) => samus.canOpenGreenDoors,
      Door_GreenHills: (samus) => samus.canUsePowerBombs,
    },

    Door_GreenHills: {
      Missiles_Tube: (_) => true,
    },

    Door_NoobBridge: {
      Missiles_Tube: (samus) => samus.missilePacks >= 2 || samus.hasWave,
    },

    EnergyTank_WaveGate: {
      Missiles_BigPink: (_) => true,
    },
  },
  RedBrinstar: {
    Door_RedTower: {
      Door_RedElevator: (_) => true,
      Spazer: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
      Door_MaridiaTube: (samus) => samus.canUsePowerBombs,
      Door_KraidEntry: (_) => true,
      XrayHallway: (samus) => samus.canUsePowerBombs,
    },

    XrayHallway: {
      Door_RedTower: (samus) => samus.canUsePowerBombs,
      XrayScope: (samus) =>
        samus.canOpenRedDoors && samus.hasMorph && (samus.hasSpaceJump || samus.hasGrapple),
    },

    XrayScope: {
      XrayHallway: (samus) =>
        (samus.canUseBombs || samus.canUsePowerBombs) && (samus.hasSpaceJump || samus.hasGrapple),
    },

    Door_AboveKraid: {
      Door_RedTower: (samus) => samus.superPacks >= 1,
    },

    Door_KraidEntry: {
      Door_RedTower: (_) => true,
    },

    Spazer: {
      Door_RedTower: (samus) => samus.hasMorph,
    },

    Door_MaridiaTube: {
      Door_RedTower: (samus) => samus.hasMorph,
    },

    Door_RedElevator: {
      Door_RedTower: (samus) => samus.canUsePowerBombs,
      PBs_Alpha: (samus) => samus.canOpenGreenDoors,
      PBs_Beta: (samus) => samus.canOpenGreenDoors && samus.canUsePowerBombs,
    },

    PBs_Alpha: {
      Door_RedElevator: (_) => true,
      Missiles_AlphaPBs: (samus) => samus.canUsePowerBombs,
    },

    Missiles_AlphaPBs: {
      PBs_Alpha: (_) => true,
    },

    PBs_Beta: {
      Door_RedElevator: (_) => true,
    },

    Door_MaridiaEscape: {
      Door_RedElevator: (samus) => samus.hasMorph && samus.superPacks >= 1,
    },
  },
  UpperNorfair: {
    Door_ElevatorEntry: {
      BusinessCenter: (_) => true,
    },

    BusinessCenter: {
      Door_ElevatorEntry: (_) => true,
      Door_KraidMouth: (samus) => samus.superPacks >= 1,
      IceBeam: (samus) => samus.canOpenGreenDoors && (samus.hasVaria || samus.energyTanks >= 3),
      Missiles_CrumbleShaft: (samus) =>
        samus.canUsePowerBombs && (samus.hasVaria || samus.energyTanks >= 2),
      Missiles_Cathedral: (samus) => samus.hasVaria || samus.energyTanks >= 3,
      EnergyTank_HiJump: (samus) => samus.canOpenRedDoors,
    },

    EnergyTank_HiJump: {
      BusinessCenter: (_) => true,
      HiJumpBoots: (samus) => samus.hasMorph,
    },

    HiJumpBoots: {
      EnergyTank_HiJump: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Missiles_HiJump: (_) => true,
    },

    Missiles_HiJump: {
      EnergyTank_HiJump: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Missiles_Cathedral: {
      BusinessCenter: (samus) =>
        (samus.hasVaria || samus.energyTanks >= 3) &&
        (samus.canUseBombs || samus.canUsePowerBombs || samus.hasSpringBall || samus.hasSpaceJump),
      BubbleMountain: (samus) =>
        samus.canOpenGreenDoors && (samus.hasVaria || samus.energyTanks >= 3),
    },

    BubbleMountain: {
      BusinessCenter: (samus) => samus.hasSpeed,
      Missiles_Cathedral: (samus) => samus.hasVaria || samus.energyTanks >= 3,
      Missiles_BubbleMountain: (_) => true,
      Missiles_SpeedBooster: (_) => true,
      PreCrocomire: (_) => true,
      Door_LavaDive: (_) => true,
      Missiles_NorfairReserve1: (samus) =>
        (samus.hasVaria || samus.energyTanks >= 3) && (samus.hasHiJump || samus.canFly),
      Missiles_Wave: (_) => true,
    },

    Missiles_Wave: {
      BubbleMountain: (_) => true, // TODO
      WaveBeam: (_) => true, // TODO
    },

    WaveBeam: {
      Missiles_Wave: (_) => true, // TODO
    },

    Missiles_NorfairReserve1: {
      BubbleMountain: (_) => true, // TODO
      Missiles_NorfairReserve2: (_) => true, // TODO
    },

    Missiles_NorfairReserve2: {
      Missiles_NorfairReserve1: (_) => true, // TODO
      ReserveTank_Norfair: (_) => true, // TODO
    },

    ReserveTank_Norfair: {
      Missiles_NorfairReserve2: (_) => true, // TODO
    },

    Door_SingleChamber: {
      BubbleMountain: (_) => true, // TODO
    },

    Door_LavaDive: {
      BubbleMountain: (_) => true, // TODO
    },

    Missiles_SpeedBooster: {
      BubbleMountain: (_) => true, // TODO
      SpeedBooster: (_) => true, // TODO
    },

    SpeedBooster: {
      Missiles_SpeedBooster: (_) => true, // TODO
    },

    Missiles_BubbleMountain: {
      BubbleMountain: (_) => true,
    },

    Door_KraidMouth: {
      BusinessCenter: (samus) => samus.superPacks >= 1,
    },

    IceBeam: {
      BusinessCenter: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Missiles_CrumbleShaft: {
      BusinessCenter: (samus) => samus.canUsePowerBombs,
      PreCrocomire: (samus) => samus.hasVaria && samus.hasSpeed,
    },

    PreCrocomire: {
      Door_CrocEntry: (samus) => samus.canOpenGreenDoors,
      BubbleMountain: (samus) => samus.hasVaria || samus.energyTanks >= 2,
      Missiles_CrocEscape: (samus) =>
        (samus.hasVaria || samus.energyTanks >= 3) &&
        (samus.hasSpaceJump || samus.hasGrapple || (samus.hasSpeed && samus.hasHiJump)),
    },

    Missiles_CrocEscape: {
      BusinessCenter: (samus) => samus.canOpenGreenDoors,
      PreCrocomire: (samus) => samus.hasMorph,
    },

    Door_CrocEntry: {
      PreCrocomire: (samus) => samus.canDefeatCrocomire,
    },
  },
  KraidsLair: {
    Door_KraidsLair: {
      EnergyTank_Kraid: (samus) =>
        samus.canDefeatKraid &&
        (samus.missilePacks >= 1 ||
          samus.hasScrewAttack ||
          samus.canUseBombs ||
          samus.canUsePowerBombs),
      KraidsHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    EnergyTank_Kraid: {
      Door_KraidsLair: (_) => true,
    },

    KraidsHallway: {
      Door_KraidsLair: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Missiles_Kraid: (samus) => samus.canUsePowerBombs,
      Door_KraidBoss: (samus) => samus.canOpenRedDoors,
    },

    Missiles_Kraid: {
      KraidsHallway: (_) => true,
    },

    Door_KraidBoss: {
      KraidsHallway: (_) => true,
    },
  },
  WreckedShip: {
    Door_Ocean: {
      Missiles_Ocean: (_) => true,
    },

    Missiles_Ocean: {
      Door_Ocean: (_) => true,
      ShipHallway: (samus) => samus.canOpenGreenDoors,
    },

    ShipHallway: {
      Missiles_Ocean: (_) => true,
      Missiles_Spooky: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Door_PhantoonBoss: (samus) =>
        samus.canOpenGreenDoors && (samus.hasSpeed || samus.canUseBombs || samus.canUsePowerBombs),
      Supers_LeftSide: (samus) => samus.canDefeatPhantoon,
      Supers_RightSide: (samus) =>
        samus.canDefeatPhantoon && (samus.canUseBombs || samus.canUsePowerBombs),
      Missiles_Attic: (samus) => samus.canDefeatPhantoon,
      ShipRearExit: (samus) =>
        samus.canDefeatPhantoon && (samus.hasSpaceJump || samus.hasHiJump || samus.hasGravity),
    },

    Missiles_Spooky: {
      ShipHallway: (_) => true,
    },

    ShipRearExit: {
      EnergyTank_Ship: (samus) => samus.canDefeatPhantoon,
      ShipHallway: (_) => true,
      Door_HighwayExit: (samus) => samus.hasGravity || samus.hasHiJump,
    },

    EnergyTank_Ship: {
      ShipRearExit: (_) => true,
    },

    Door_HighwayExit: {
      ShipRearExit: (samus) => samus.hasGravity || samus.hasHiJump,
    },

    Missiles_Attic: {
      ShipHallway: (_) => true,
      Missiles_Sky: (samus) => samus.canFly || samus.hasSpeed,
      Missiles_OceanMiddle: (samus) => samus.superPacks >= 1 && samus.hasMorph,
      GravitySuit: (samus) =>
        (samus.energyTanks >= 3 || (samus.hasVaria && samus.energyTanks >= 2)) &&
        (samus.canUseBombs || samus.canUsePowerBombs || samus.hasSpringBall),
    },

    Missiles_Sky: {
      Missiles_Attic: (_) => true,
    },

    Missiles_OceanMiddle: {
      Missiles_Attic: (samus) => samus.hasMorph && samus.superPacks >= 1,
    },

    GravitySuit: {
      Missiles_Bowling: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Missiles_Ocean: (_) => true,
    },

    Missiles_Bowling: {
      ReserveTank_Ship: (samus) => samus.canUsePowerBombs && samus.hasSpeed,
      GravitySuit: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    ReserveTank_Ship: {
      Missiles_Bowling: (_) => true,
    },

    Door_PhantoonBoss: {
      ShipHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Supers_LeftSide: {
      ShipHallway: (_) => true,
    },

    Supers_RightSide: {
      ShipHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },
  },
  WestMaridia: {
    Door_MainStreet: {
      MainStreet: (_) => true,
    },

    MainStreet: {
      Door_MainStreet: (_) => true,
      Missiles_MainStreet: (samus) => samus.hasGravity && samus.hasSpeed,
      Supers_Crab: (samus) => samus.hasGravity || canDoSuitlessMaridia(samus),
      Missiles_MamaTurtle: (samus) =>
        samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
      Door_MaridiaMap: (samus) => samus.canOpenGreenDoors,
      Door_EverestTopRight: (samus) => samus.hasGravity || canDoSuitlessMaridia(samus),
    },

    Missiles_MainStreet: {
      MainStreet: (_) => true,
    },

    Door_EverestTopRight: {
      Supers_Crab: (_) => true,
      Missiles_Beach: (samus) => samus.hasGravity || (samus.hasHiJump && samus.hasIce),
      Door_PreAqueduct: (samus) => samus.canOpenGreenDoors,
    },

    Door_PreAqueduct: {
      Door_EverestTopRight: (samus) => samus.hasGravity || samus.hasHiJump,
    },

    Missiles_Beach: {
      Door_EverestTopRight: (_) => true,
      Missiles_WateringHole: (samus) => samus.hasGravity || samus.hasHiJump,
      Supers_WateringHole: (samus) => samus.hasGravity || samus.hasHiJump,
    },

    Missiles_WateringHole: {
      Missiles_Beach: (_) => true,
      Supers_WateringHole: (_) => true,
    },

    Supers_WateringHole: {
      Missiles_Beach: (_) => true,
      Missiles_WateringHole: (_) => true,
    },

    Door_MaridiaMap: {
      MainStreet: (samus) => samus.hasGravity && samus.hasHiJump,
    },

    Supers_Crab: {
      MainStreet: (samus) => samus.hasMorph,
      Missiles_MamaTurtle: (samus) => samus.hasMorph,
      Door_RedFish: (samus) => samus.hasGravity && (samus.canFly || samus.hasSpeed),
    },

    Door_RedFish: {
      Supers_Crab: (samus) => samus.hasMorph,
    },

    Missiles_MamaTurtle: {
      EnergyTank_MamaTurtle: (samus) => samus.canFly || samus.hasGrapple,
      MainStreet: (samus) => samus.hasGravity || samus.hasHiJump,
    },

    EnergyTank_MamaTurtle: {
      Missiles_MamaTurtle: (_) => true,
    },
  },
  EastMaridia: {
    Door_Aqueduct: {
      Aqueduct: (samus) => samus.hasGravity && samus.canUsePowerBombs,
    },

    Aqueduct: {
      Door_Aqueduct: (samus) =>
        samus.canUsePowerBombs || (samus.hasGravity && (samus.canUseBombs || samus.hasScrewAttack)),
      Missiles_Aqueduct: (samus) => samus.hasGravity && samus.hasSpeed,
      Door_Botwoon: (samus) =>
        (samus.hasGravity && samus.hasSpeed) ||
        (samus.hasIce && (samus.hasGravity || canDoSuitlessMaridia(samus))),
      Missiles_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
      ReserveTank_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
      Missiles_RightSandPit: (samus) => samus.hasGravity && samus.hasMorph,
      PBs_RightSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    },

    Missiles_LeftSandPit: {
      Oasis: (samus) => samus.hasGravity,
    },

    ReserveTank_LeftSandPit: {
      Oasis: (samus) => samus.hasGravity,
    },

    Missiles_RightSandPit: {
      Oasis: (samus) => samus.hasGravity,
    },

    PBs_RightSandPit: {
      Oasis: (samus) => samus.hasGravity,
    },

    Oasis: {
      MainStreet: (samus) => samus.hasGravity,
      SpringBall: (samus) =>
        samus.hasGravity && samus.canUsePowerBombs && (samus.hasGrapple || samus.hasIce),
      Door_PlasmaSpark: (samus) =>
        samus.canOpenGreenDoors &&
        (samus.canUsePowerBombs || samus.canUseBombs || (samus.hasGravity && samus.hasScrewAttack)),
    },

    Door_PlasmaSpark: {
      Oasis: (samus) => samus.canOpenGreenDoors,
      PlasmaBeam: (samus) => samus.canDefeatDraygon,
      MaridiaHighway: (samus) => samus.hasGravity,
    },

    PlasmaBeam: {
      Door_PlasmaSpark: (samus) =>
        (samus.hasScrewAttack || samus.hasPlasma) && (samus.canFly || samus.hasHiJump),
    },

    SpringBall: {
      Oasis: (samus) => samus.hasGravity && samus.hasMorph,
    },

    Door_Botwoon: {
      Aqueduct: (samus) => (samus.hasGravity && samus.hasSpeed) || samus.canDefeatBotwoon,
      EnergyTank_Botwoon: (samus) => samus.canDefeatBotwoon && samus.hasMorph,
    },

    EnergyTank_Botwoon: {
      Door_Botwoon: (samus) => samus.hasMorph,
      Aqueduct: (_) => true,
      ColosseumTopLeft: (samus) => samus.hasGravity,
      Missiles_Precious: (samus) => samus.hasGravity && samus.canOpenGreenDoors,
    },

    ColosseumTopLeft: {
      EnergyTank_Botwoon: (samus) => samus.hasGravity,
      ColosseumTopRight: (samus) => samus.hasGravity,
      Door_PlasmaSpark: (samus) => samus.hasGravity,
    },

    ColosseumTopRight: {
      Missiles_Precious: (samus) => samus.hasGravity && samus.canOpenGreenDoors,
      ColosseumTopLeft: (samus) => samus.hasGravity,
    },

    Missiles_Precious: {
      ColosseumTopRight: (samus) => samus.hasGravity,
      Door_DraygonBoss: (samus) => samus.canOpenGreenDoors,
    },

    Door_DraygonBoss: {
      Missiles_Precious: (samus) => samus.hasGravity,
    },

    Missiles_Aqueduct: {
      Aqueduct: (_) => true,
      Supers_Aqueduct: (_) => true,
    },

    Supers_Aqueduct: {
      Missiles_Aqueduct: (_) => true,
      Aqueduct: (_) => true,
    },

    Door_Highway: {
      MaridiaHighway: (samus) => samus.hasGravity,
    },

    MaridiaHighway: {
      Door_Highway: (_) => true,
      Door_PlasmaSpark: (samus) => samus.hasGravity,
    },
  },
  LowerNorfair: {
    Door_RidleyMouth: {
      Ruins: (samus) => samus.hasVaria && (samus.hasGravity || samus.hasHiJump),
    },

    Door_Muskateers: {
      Muskateers: (samus) => samus.hasVaria,
    },

    Muskateers: {
      Door_Muskateers: (_) => true,
      Missiles_Muskateers: (samus) => samus.hasMorph && samus.canDestroyBombWalls,
      Missiles_Maze: (samus) => samus.hasMorph,
    },

    Missiles_Muskateers: {
      Muskateers: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    Ruins: {
      Door_RidleyMouth: (_) => true,
      Missiles_GT: (samus) => samus.hasSpaceJump && samus.canUsePowerBombs,
      PrePillars: (samus) => samus.canUsePowerBombs,
    },

    PrePillars: {
      Ruins: (samus) => samus.canUsePowerBombs,
      ScrewAttack: (samus) => samus.superPacks >= 1 && samus.canDestroyBombWalls,
      WorstRoomBottom: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
    },

    WorstRoomBottom: {
      PrePillars: (samus) => samus.canDestroyBombWalls,
      WorstRoomTop: (samus) =>
        (samus.hasScrewAttack && samus.hasSpaceJump) ||
        (samus.hasHiJump && samus.canUsePowerBombs) ||
        samus.canUseBombs,
    },

    WorstRoomTop: {
      WorstRoomBottom: (_) => true,
      Missiles_MickeyMouse: (samus) => samus.canDestroyBombWalls && samus.hasMorph,
      Ruins: (samus) => samus.canDestroyBombWalls,
      RedKihunterShaft: (_) => true,
    },

    RedKihunterShaft: {
      EnergyTank_Firefleas: (_) => true,
      WorstRoomTop: (samus) => samus.energyTanks >= 3,
      Missiles_Maze: (_) => true, // TODO
      PBs_Shame: (samus) => samus.canUsePowerBombs,
    },

    EnergyTank_Firefleas: {
      RedKihunterShaft: (samus) => samus.hasSpaceJump || samus.hasHiJump,
    },

    Missiles_Maze: {
      RedKihunterShaft: (_) => true, // TODO
      PBs_Maze: (_) => true, // TODO
      Muskateers: (samus) => samus.hasMorph,
    },

    PBs_Maze: {
      RedKihunterShaft: (_) => true, // TODO
    },

    PBs_Shame: {
      RedKihunterShaft: (_) => true, // TODO
      Door_RidleyBoss: (samus) => samus.canUsePowerBombs && samus.canOpenGreenDoors,
    },

    Door_RidleyBoss: {
      PBs_Shame: (samus) => samus.canUsePowerBombs,
    },

    Missiles_MickeyMouse: {
      WorstRoomTop: (samus) => samus.hasMorph,
    },

    Missiles_GT: {
      Supers_GT: (samus) => samus.hasScrewAttack || samus.canUsePowerBombs,
      ScrewAttack: (_) => true,
    },

    Supers_GT: {
      ScrewAttack: (_) => true,
    },

    ScrewAttack: {
      Supers_GT: (samus) => samus.hasScrewAttack || samus.canUsePowerBombs,
      PrePillars: (samus) =>
        samus.canUseBombs ||
        (samus.hasSpaceJump && (samus.hasScrewAttack || samus.canUsePowerBombs)) ||
        (samus.hasScrewAttack && samus.hasSpeed && samus.hasHiJump) ||
        (samus.canUsePowerBombs && samus.hasSpringBall),
    },
  },
  CrocomiresLair: {
    Door_Croc: {
      EnergyTank_Croc: (samus) =>
        samus.canDefeatCrocomire && (samus.energyTanks >= 3 || samus.hasSpaceJump),
      PBs_Croc: (samus) =>
        samus.canDefeatCrocomire && (samus.canFly || samus.hasIce || samus.hasHiJump),
      GrappleBeam: (samus) =>
        samus.canDefeatCrocomire &&
        (samus.superPacks >= 1 || samus.canFly || (samus.hasSpeed && samus.canUsePowerBombs)),
      Missiles_IndianaJones: (samus) =>
        samus.canDefeatCrocomire && (samus.canFly || (samus.hasSpeed && samus.canUsePowerBombs)),
      Missiles_Cosine: (samus) => samus.canOpenRedDoors,
    },

    EnergyTank_Croc: {
      Door_Croc: (_) => true,
    },

    PBs_Croc: {
      Door_Croc: (_) => true,
    },

    GrappleBeam: {
      Door_Croc: (_) => true,
    },

    Missiles_IndianaJones: {
      Door_Croc: (_) => true,
    },

    Missiles_Cosine: {
      Door_Croc: (_) => true,
    },
  },
};
