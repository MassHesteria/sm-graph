export const crateriaEdges = {
  Ship: {
    PBs_LandingSite: (samus) =>
      (samus.canFly || (samus.hasSpeed && samus.totalTanks >= 1)) && samus.canUsePowerBombs,
    PreGauntlet: (samus) => samus.canDestroyBombWalls,
    PreMoat: (samus) => samus.canOpenGreenDoors,
    Parlor: true,
  },

  PBs_LandingSite: {
    Ship: true,
  },

  PreMoat: {
    Ship: true,
    Missiles_Moat: (samus) => samus.canUsePowerBombs,
    Door_Crabs: (samus) => samus.canUsePowerBombs,
  },

  Door_Crabs: {
    PreMoat: true,
  },

  Missiles_Moat: {
    Door_Crabs: true,
    Door_Moat: true,
  },

  Door_Moat: {
    Missiles_Moat: true,
  },

  PreGauntlet: {
    //more specifically, the door from landing site to gauntlet
    Ship: (samus) => samus.canDestroyBombWalls,
    EnergyTank_Gauntlet: (samus) =>
      samus.canUseBombs ||
      (samus.hasMorph && samus.powerPacks >= 2 && samus.totalTanks >= 1) ||
      samus.hasScrewAttack,
  },

  EnergyTank_Gauntlet: {
    PreGauntlet: (samus) =>
      samus.canUseBombs & (samus.totalTanks >= 2) ||
      (samus.hasMorph && samus.powerPacks >= 2 && samus.totalTanks >= 1) ||
      samus.hasScrewAttack,
    Missiles_GauntletLeft: (samus) => samus.canPassBombPassages,
    Missiles_GauntletRight: (samus) => samus.canPassBombPassages,
    EnergyTank_Terminator: (samus) => samus.canPassBombPassages,
  },

  Missiles_GauntletLeft: {
    Missiles_GauntletRight: true,
    EnergyTank_Terminator: true,
  },

  Missiles_GauntletRight: {
    Missiles_GauntletLeft: true,
    EnergyTank_Terminator: true,
  },

  EnergyTank_Terminator: {
    Parlor: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
    Door_G4: (samus) => samus.canOpenRedDoors,
    Door_Kago: true,
  },

  Door_G4: {
    EnergyTank_Terminator: true,
  },

  Door_Kago: {
    EnergyTank_Terminator: true,
  },

  Parlor: {
    EnergyTank_Terminator: (samus) => samus.canDestroyBombWalls || samus.hasSpeed,
    Bombs: (samus) => samus.hasMorph && samus.canOpenRedDoors,
    Climb: true,
    Missiles_230: (samus) => samus.canPassBombPassages,
    Ship: true,
  },

  Bombs: {
    Parlor: (samus) => samus.hasMorph,
  },

  Missiles_230: {
    Parlor: (samus) => samus.hasMorph,
  },

  Climb: {
    Parlor: true,
    ClimbSupersBottom: (samus) => samus.canUsePowerBombs,
    Missiles_OldMB: (samus) => samus.canDestroyBombWalls,
    MorphBall: true,
  },

  ClimbSupersBottom: {
    Climb: (samus) => samus.canPassBombPassages,
    Supers_Climb: (samus) => samus.hasSpeed && samus.energyTanks >= 1,
  },

  Supers_Climb: {
    Climb: (samus) =>
      samus.hasGrapple || samus.hasSpaceJump || (samus.energyTanks >= 2 && samus.totalTanks >= 3),
  },

  Missiles_OldMB: {
    Climb: (samus) => samus.canDestroyBombWalls,
  },

  MorphBall: {
    Climb: true,
    PBs_Retro: (samus) => samus.canUsePowerBombs,
    ConstructionZone: true,
  },

  ConstructionZone: {
    Missiles_Alpha: (samus) => samus.hasMorph,
    TacoTankRoom: (samus) => samus.canOpenRedDoors,
    MorphBall: true,
  },

  TacoTankRoom: {
    ConstructionZone: true,
    EnergyTank_Ceiling: true,
    Missiles_Beta: (samus) => samus.hasMorph,
  },

  PBs_Retro: {
    MorphBall: (samus) => samus.canUsePowerBombs,
    Door_RetroPBs: (samus) => samus.canPassBombPassages,
  },

  Door_RetroPBs: {
    PBs_Retro: (samus) => samus.canPassBombPassages,
  },

  Missiles_Alpha: {
    MorphBall: (samus) => samus.hasMorph,
  },

  EnergyTank_Ceiling: {
    MorphBall: true,
    Missiles_Beta: (samus) => samus.hasMorph,
    Missiles_BillyMays1: (samus) => samus.canUsePowerBombs,
    Missiles_BillyMays2: (samus) => samus.canUsePowerBombs,
  },

  Missiles_Beta: {
    TacoTankRoom: (samus) => samus.hasMorph,
  },

  Missiles_BillyMays1: {
    EnergyTank_Ceiling: (samus) => samus.canUsePowerBombs,
    Missiles_BillyMays2: true,
  },

  Missiles_BillyMays2: {
    Missiles_BillyMays1: true,
  },
};
