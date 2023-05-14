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
      EnergyTank_Ceiling: (_) => true,
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
      BubbleMountain: (samus) =>
        samus.canOpenGreenDoors && (samus.hasVaria || samus.energyTanks >= 3),
    },

    BubbleMountain: {
      BusinessCenter: (samus) =>
        samus.hasSpeed ||
        ((samus.hasVaria || samus.energyTanks >= 3) &&
          (samus.canUseBombs || samus.canUsePowerBombs || samus.hasSpringBall)),
      Missiles_BubbleMountain: (_) => true,
      Missiles_SpeedBooster: (_) => true,
      PreCrocomire: (_) => true,
    },

    Missiles_SpeedBooster: {
      BubbleMountain: (_) => true,
      SpeedBooster: (_) => true,
    },

    SpeedBooster: {
      Missiles_SpeedBooster: (_) => true,
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
