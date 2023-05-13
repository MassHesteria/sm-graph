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
      EarlySupers: (samus) => samus.canOpenRedDoors,
      EtecoonsTank: (samus) => samus.canUsePowerBombs,
    },

    EarlySupers: {
      GreenElevator: (_) => true,
      EarlySupersBridge: (_) => true,
    },

    //EarlySupersBridge: {
    //EarlySupers: (_) => true,
    //},

    EtecoonsTank: {
      GreenElevator: (_) => samus.canUsePowerBombs,
    },
  },
};
