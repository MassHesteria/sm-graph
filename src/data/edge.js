export const edges = {
  Crateria: {
    Ship: {
      LedgePBs: (samus) => samus.canFly && samus.canUsePowerBombs,
      PreGauntlet: (samus) => samus.canDestroyBombWalls,
      Crabs: (samus) => samus.canOpenGreenDoors,
      Parlor: (_) => true,
    },

    LedgePBs: {
      Ship: (_) => true,
    },

    Crabs: {
      Ship: (_) => true,
      Moat: (samus) => samus.canUsePowerBombs,
    },

    Moat: {
      Crabs: (_) => true,
      MoatDoor: (samus) =>
        (samus.hasMorph && samus.hasSpringBall) ||
        samus.hasSpeed ||
        samus.hasGrapple ||
        samus.hasSpaceJump ||
        samus.hasGravity,
    },

    MoatDoor: {
      Moat: (_) => true,
    },

    PreGauntlet: {
      Ship: (samus) => samus.canDestroyBombWalls,
      Gauntlet: (samus) =>
        samus.tankCount >= 2 &&
        (samus.canUseBombs || (samus.hasMorph && samus.powerPacks >= 2) || samus.hasScrewAttack),
    },

    Gauntlet: {
      PreGauntlet: (samus) =>
        samus.tankCount >= 2 &&
        (samus.canUseBombs || (samus.hasMorph && samus.powerPacks >= 2) || samus.hasScrewAttack),
      GauntletLeft: (_) => true,
      GauntletRight: (_) => true,
      Terminator: (_) => true,
    },

    GauntletLeft: {
      GauntletRight: (_) => true,
      Terminator: (_) => true,
    },

    GauntletRight: {
      GauntletLeft: (_) => true,
      Terminator: (_) => true,
    },

    Terminator: {
      Parlor: (samus) => samus.canDestroyBombWalls,
      G4: (samus) => samus.canOpenRedDoors,
    },

    G4: {
      Terminator: (_) => true,
    },

    Parlor: {
      Terminator: (samus) => samus.canDestroyBombWalls,
      Bombs: (samus) => samus.hasMorph && samus.canOpenRedDoors,
      Climb: (_) => true,
      TwoThirty: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Ship: (_) => true,
    },

    Bombs: {
      Parlor: (samus) => samus.hasMorph,
    },

    TwoThirty: {
      Parlor: (samus) => samus.hasMorph,
    },

    Climb: {
      Parlor: (_) => true,
      ClimbSupersBottom: (samus) => samus.canUsePowerBombs,
      OldMB: (samus) => samus.canDestroyBombWalls,
      MorphBall: (_) => true,
    },

    ClimbSupersBottom: {
      Climb: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      ClimbSupersTop: (samus) => samus.hasSpeed && samus.tankCount >= 1,
    },

    ClimbSupersTop: {
      Climb: (samus) => samus.hasGrapple || samus.tankCount >= 2,
    },

    OldMB: {
      Climb: (samus) => samus.canDestroyBombWalls,
    },
  },
  BlueBrinstar: {
    MorphBall: {
      Climb: (_) => true,
      Ceiling: (_) => true,
      RetroPBs: (samus) => samus.canUsePowerBombs,
      AlphaMissiles: (samus) => samus.hasMorph,
    },

    RetroPBs: {
      MorphBall: (samus) => samus.canUsePowerBombs,
    },

    AlphaMissiles: {
      MorphBall: (samus) => samus.hasMorph,
    },

    Ceiling: {
      MorphBall: (_) => true,
      BetaMissiles: (samus) => samus.hasMorph,
      BillyMays1: (samus) => samus.canUsePowerBombs,
    },

    BetaMissiles: {
      Ceiling: (samus) => samus.hasMorph,
    },

    BillyMays1: {
      Ceiling: (samus) => samus.canUsePowerBombs,
      BillyMays2: (_) => true,
    },

    BillyMays2: {
      BillyMays1: (_) => true,
    },
  },
  GreenBrinstar: {
    GreenElevator: {
      EarlySupersBridge: (samus) => samus.canOpenRedDoors,
      EtecoonsTank: (samus) => samus.canUsePowerBombs,
      DachoraRoomLeft: (_) => true,
    },

    EarlySupersBridge: {
      GreenElevator: (_) => true,
      EarlySupers: (samus) => samus.hasMorph || samus.hasSpeed,
    },

    EarlySupers: {
      EarlySupersBridge: (_) => true,
      BrinstarReserve: (samus) => samus.canOpenRedDoors,
    },

    BrinstarReserve: {
      EarlySupers: (_) => true,
      BrinstarReserveMissiles1: (samus) => samus.hasMorph,
    },

    BrinstarReserveMissiles1: {
      BrinstarReserve: (samus) => samus.hasMorph,
      BrinstarReserveMissiles2: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },

    BrinstarReserveMissiles2: {
      BrinstarReserveMissiles1: (_) => true,
      BrinstarReserve: (samus) => samus.hasMorph,
    },

    EtecoonsTank: {
      GreenElevator: (samus) => samus.canUsePowerBombs,
      EtecoonsSupers: (samus) => samus.canOpenGreenDoors,
      EtecoonsPBs: (samus) => samus.hasMorph,
    },

    EtecoonsSupers: {
      EtecoonsTank: (_) => true,
    },

    EtecoonsPBs: {
      EtecoonsTank: (samus) => samus.hasMorph,
    },

    DachoraRoomLeft: {
      GreenElevator: (_) => true,
      DachoraRoomRight: (samus) => samus.canDestroyBombWalls || samus.hasScrewAttack,
    },

    DachoraRoomRight: {
      DachoraRoomLeft: (samus) => samus.canDestroyBombWalls || samus.hasScrewAttack,
      BigPink: (_) => true,
    },

    BigPink: {
      DachoraRoomRight: (_) => true,
      ChargeMissiles: (_) => true,
      WaveGate: (samus) => samus.canUsePowerBombs && (samus.superPacks >= 1 || samus.hasWave),
      SpoSpoSupers: (samus) =>
        (samus.canUseBombs || samus.canUsePowerBombs) && samus.superPacks >= 1,
    },

    SpoSpoSupers: {
      BigPink: (samus) => (samus.canUseBombs || samus.canUsePowerBombs) && samus.superPacks >= 1,
    },

    ChargeMissiles: {
      BigPink: (_) => true,
      ChargeBeam: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      TubeMissiles: (samus) => samus.canOpenGreenDoors,
    },

    ChargeBeam: {
      ChargeMissiles: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      Waterway: (samus) => samus.canUsePowerBombs && samus.canOpenRedDoors && samus.hasSpeed,
    },

    Waterway: {
      ChargeBeam: (samus) => samus.canUsePowerBombs,
    },

    TubeMissiles: {
      ChargeMissiles: (_) => true,
      NoobBridge: (samus) => samus.canOpenGreenDoors,
      GreenHills: (samus) => samus.canUsePowerBombs,
    },

    GreenHills: {
      TubeMissiles: (_) => true,
    },

    NoobBridge: {
      TubeMissiles: (samus) => samus.missilePacks >= 2 || samus.hasWave,
    },

    WaveGate: {
      BigPink: (_) => true,
    },
  },
  RedBrinstar: {
    RedTower: {
      RedElevator: (_) => true,
      Spazer: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
      MaridiaTube: (samus) => samus.canUsePowerBombs,
      KraidEntry: (_) => true,
    },

    AboveKraid: {
      RedTower: (samus) => samus.superPacks >= 1,
    },

    KraidEntry: {
      RedTower: (_) => true,
    },

    Spazer: {
      RedTower: (samus) => samus.hasMorph,
    },

    MaridiaTube: {
      RedTower: (samus) => samus.hasMorph,
    },

    RedElevator: {
      RedTower: (samus) => samus.canUsePowerBombs,
      AlphaPBs: (samus) => samus.canOpenGreenDoors,
      BetaPBs: (samus) => samus.canOpenGreenDoors && samus.canUsePowerBombs,
    },

    AlphaPBs: {
      RedElevator: (_) => true,
      AlphaPBMissiles: (samus) => samus.canUsePowerBombs,
    },

    AlphaPBMissiles: {
      AlphaPBs: (_) => true,
    },

    BetaPBs: {
      RedElevator: (_) => true,
    },

    MaridiaEscape: {
      RedElevator: (samus) => samus.hasMorph && samus.superPacks >= 1,
    },
  },
  UpperNorfair: {
    ElevatorEntry: {
      KraidMouth: (samus) => samus.superPacks >= 1,
    },
    KraidMouth: {
      ElevatorEntry: (samus) => samus.superPacks >= 1,
    },
  },
  KraidsLair: {
    KraidsLairExit: {
      KraidsCloset: (samus) =>
        samus.canDefeatKraid &&
        (samus.missilePacks >= 1 ||
          samus.hasScrewAttack ||
          samus.canUseBombs ||
          samus.canUsePowerBombs),
      KraidsHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    },
    KraidsCloset: {
      KraidsLairExit: (_) => true,
    },
    KraidsHallway: {
      KraidsLairExit: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
      KraidPBs: (samus) => samus.canUsePowerBombs,
      KraidBossDoor: (samus) => samus.canOpenRedDoors,
    },
    KraidPBs: {
      KraidsHallway: (_) => true,
    },
    KraidBossDoor: {
      KraidsHallway: (_) => true,
    },
  },
};
