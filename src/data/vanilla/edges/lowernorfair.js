export const lowernorfairEdges = {
  Door_RidleyMouth: {
    Ruins: (samus) => HasVaria && (HasGravity || samus.hasHiJump),
  },

  Door_Muskateers: {
    Muskateers: () => HasVaria,
  },

  Muskateers: {
    Door_Muskateers: true,
    Missiles_Muskateers: (samus) => HasMorph && samus.canDestroyBombWalls,
    Missiles_Maze: () => HasMorph,
  },

  Missiles_Muskateers: {
    Muskateers: () => CanUseBombs || CanUsePowerBombs,
  },

  Ruins: {
    Door_RidleyMouth: true,
    Missiles_GT: () => HasSpaceJump && CanUsePowerBombs,
    PrePillars: () => CanUsePowerBombs,
  },

  PrePillars: {
    Ruins: (samus) => samus.canUsePowerBombs,
    ScrewAttack: (samus) => samus.superPacks >= 1 && samus.canDestroyBombWalls,
    WorstRoomBottom: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
  },

  WorstRoomBottom: {
    PrePillars: (samus) => samus.canDestroyBombWalls,
    WorstRoomTop: (samus) =>
      (HasScrewAttack && HasSpaceJump) ||
      (samus.canPassBombPassages && (samus.canFly || samus.hasSpringBall || samus.hasHiJump)),
  },

  WorstRoomTop: {
    WorstRoomBottom: (samus) => samus.canDestroyBombWalls,
    Missiles_MickeyMouse: (samus) => samus.canDestroyBombWalls && HasMorph,
    Ruins: (samus) => samus.canDestroyBombWalls,
    RedKihunterShaft: true,
  },

  RedKihunterShaft: {
    EnergyTank_Firefleas: (samus) => samus.canUsePowerBombs || samus.superPacks >= 1,
    WorstRoomTop: (samus) =>
      (HasGravity && samus.energyTanks >= 3 && samus.totalTanks >= 6) || samus.energyTanks >= 6,
    Missiles_Maze: true,
    PBs_Shame: (samus) => samus.canDestroyBombWalls,
  },

  EnergyTank_Firefleas: {
    RedKihunterShaft: (samus) => samus.canUsePowerBombs || samus.superPacks >= 1,
  },

  Missiles_Maze: {
    RedKihunterShaft: true,
    PBs_Maze: (samus) => samus.canPassBombPassages,
    Muskateers: () => HasMorph,
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
    Supers_GT: () => HasScrewAttack || CanUsePowerBombs,
    ScrewAttack: true,
  },

  Supers_GT: {
    ScrewAttack: true,
  },

  ScrewAttack: {
    Supers_GT: () => HasScrewAttack || CanUsePowerBombs,
    PrePillars: (samus) =>
      (HasSpaceJump && (HasScrewAttack || CanUsePowerBombs)) ||
      ((samus.canUseBombs || samus.hasSpringBall) && samus.canPassBombPassages) ||
      (samus.hasSpeed && ((samus.hasHiJump && samus.canDestroyBombWalls) || CanDefeatGoldTorizo)), //does this exist?
  },
};
