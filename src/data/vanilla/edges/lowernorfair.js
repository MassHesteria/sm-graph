export const lowernorfairEdges = {
  Door_RidleyMouth: {
    Ruins: () => HasVaria && (HasGravity || HasHiJump),
  },

  Door_Muskateers: {
    Muskateers: () => HasVaria,
  },

  Muskateers: {
    Door_Muskateers: true,
    Missiles_Muskateers: () => HasMorph && CanDestroyBombWalls,
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
    Ruins: () => CanUsePowerBombs,
    ScrewAttack: (samus) => samus.superPacks >= 1 && CanDestroyBombWalls,
    WorstRoomBottom: () => CanDestroyBombWalls || HasSpeed,
  },

  WorstRoomBottom: {
    PrePillars: () => CanDestroyBombWalls,
    WorstRoomTop: () =>
      (HasScrewAttack && HasSpaceJump) ||
      (CanPassBombPassages && (CanFly || HasSpringBall || HasHiJump)),
  },

  WorstRoomTop: {
    WorstRoomBottom: () => CanDestroyBombWalls,
    Missiles_MickeyMouse: () => CanDestroyBombWalls && HasMorph,
    Ruins: () => CanDestroyBombWalls,
    RedKihunterShaft: true,
  },

  RedKihunterShaft: {
    //TODO: Don't think this is right
    EnergyTank_Firefleas: (samus) => CanUsePowerBombs || samus.superPacks >= 1,
    WorstRoomTop: (samus) =>
      (HasGravity && samus.energyTanks >= 3 && TotalTanks >= 6) || samus.energyTanks >= 6,
    Missiles_Maze: true,
    PBs_Shame: () => CanDestroyBombWalls,
  },

  EnergyTank_Firefleas: {
    //TODO: Don't think this is right
    RedKihunterShaft: (samus) => CanUsePowerBombs || samus.superPacks >= 1,
  },

  Missiles_Maze: {
    RedKihunterShaft: true,
    PBs_Maze: () => CanPassBombPassages,
    Muskateers: () => HasMorph,
  },

  PBs_Maze: {
    RedKihunterShaft: true,
  },

  PBs_Shame: {
    //don't think escaping ridley with 1 PB pack is in logic, but this line implies it
    RedKihunterShaft: () => CanPassBombPassages,
    Door_RidleyBoss: () => CanUsePowerBombs && CanOpenGreenDoors,
  },

  Door_RidleyBoss: {
    PBs_Shame: () => CanUsePowerBombs,
  },

  Missiles_MickeyMouse: {
    WorstRoomTop: () => HasHiJump || CanFly,
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
    PrePillars: () =>
      (HasSpaceJump && (HasScrewAttack || CanUsePowerBombs)) ||
      ((CanUseBombs || HasSpringBall) && CanPassBombPassages) || // don't think bomb passage matters
      (HasSpeed && ((HasHiJump && CanDestroyBombWalls) || CanDefeatGoldTorizo)), //does this exist?
  },
};
