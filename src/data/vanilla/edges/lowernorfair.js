export const lowernorfairEdges = {
  Door_RidleyMouth: {
    Ruins: (samus) => samus.hasVaria && (samus.hasGravity || samus.hasHiJump),
  },

  Door_Muskateers: {
    Muskateers: (samus) => samus.hasVaria,
  },

  Muskateers: {
    Door_Muskateers: true,
    Missiles_Muskateers: (samus) => samus.hasMorph && samus.canDestroyBombWalls,
    Missiles_Maze: (samus) => samus.hasMorph,
  },

  Missiles_Muskateers: {
    Muskateers: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  Ruins: {
    Door_RidleyMouth: true,
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
      (samus.canPassBombPassages && (samus.canFly || samus.hasSpringBall || samus.hasHiJump)),
  },

  WorstRoomTop: {
    WorstRoomBottom: (samus) => samus.canDestroyBombWalls,
    Missiles_MickeyMouse: (samus) => samus.canDestroyBombWalls && samus.hasMorph,
    Ruins: (samus) => samus.canDestroyBombWalls,
    RedKihunterShaft: true,
  },

  RedKihunterShaft: {
    EnergyTank_Firefleas: (samus) => samus.canUsePowerBombs || samus.superPacks >= 1,
    WorstRoomTop: (samus) =>
      (samus.hasGravity && samus.energyTanks >= 3 && samus.totalTanks >= 6) ||
      samus.energyTanks >= 6,
    Missiles_Maze: true,
    PBs_Shame: (samus) => samus.canDestroyBombWalls,
  },

  EnergyTank_Firefleas: {
    RedKihunterShaft: (samus) => samus.canUsePowerBombs || samus.superPacks >= 1,
  },

  Missiles_Maze: {
    RedKihunterShaft: true,
    PBs_Maze: (samus) => samus.canPassBombPassages,
    Muskateers: (samus) => samus.hasMorph,
  },

  PBs_Maze: {
    RedKihunterShaft: true,
  },

  PBs_Shame: {
    //don't think escaping ridley with 1 PB pack is in logic, but this line implies it
    RedKihunterShaft: (samus) => samus.canPassBombPassages,
    Door_RidleyBoss: (samus) => samus.canUsePowerBombs && samus.canOpenGreenDoors,
  },

  Door_RidleyBoss: {
    PBs_Shame: (samus) => samus.canUsePowerBombs,
  },

  Missiles_MickeyMouse: {
    WorstRoomTop: (samus) => samus.hasHijump || samus.canFly,
    Ruins: true,
  },

  Missiles_GT: {
    Supers_GT: (samus) => samus.hasScrewAttack || samus.canUsePowerBombs,
    ScrewAttack: true,
  },

  Supers_GT: {
    ScrewAttack: true,
  },

  ScrewAttack: {
    Supers_GT: (samus) => samus.hasScrewAttack || samus.canUsePowerBombs,
    PrePillars: (samus) =>
      (samus.hasSpaceJump && samus.hasScrewAttack) ||
      ((samus.canUseBombs || samus.hasSpringBall) && samus.canPassBombPassages) ||
      (samus.hasSpeed &&
        ((samus.hasHiJump && samus.canDestroyBombWalls) || samus.canDefeatGoldTorizo)), //does this exist?
  },
};
