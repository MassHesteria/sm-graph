export const lowernorfairEdges = {
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
};
