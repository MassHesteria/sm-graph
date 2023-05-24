export const crateriaEdges = {
  Ship: {
    PBs_LandingSite: (samus) =>
      (samus.canFly || (samus.hasSpeed && samus.totalTanks >= 1)) && CanUsePowerBombs,
    PreGauntlet: (samus) => samus.canDestroyBombWalls,
    PreMoat: (samus) => samus.canOpenGreenDoors,
    Parlor: true,
  },

  PBs_LandingSite: {
    Ship: true,
  },

  PreMoat: {
    Ship: true,
    Missiles_Moat: () => CanUsePowerBombs,
    Door_Crabs: () => CanUsePowerBombs,
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
      CanUseBombs ||
      (HasMorph && samus.powerPacks >= 2) ||
      HasScrewAttack ||
      (CanUsePowerBombs && HasSpeed && samus.totalTanks >= 2) /* TODO: remove this */,
  },

  EnergyTank_Gauntlet: {
    PreGauntlet: (samus) =>
      CanUseBombs & (samus.totalTanks >= 2) ||
      (HasMorph && samus.powerPacks >= 2 && samus.totalTanks >= 1) ||
      HasScrewAttack,
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
    EnergyTank_Terminator: (samus) => samus.canDestroyBombWalls || HasSpeed,
    Bombs: () => HasMorph && CanOpenRedDoors,
    Climb: true,
    Missiles_230: (samus) => samus.canPassBombPassages,
    Ship: true,
  },

  Bombs: {
    Parlor: () => HasMorph,
  },

  Missiles_230: {
    Parlor: () => HasMorph,
  },

  Climb: {
    Parlor: true,
    ClimbSupersBottom: () => CanUsePowerBombs,
    Missiles_OldMB: (samus) => samus.canDestroyBombWalls,
    MorphBall: true,
  },

  ClimbSupersBottom: {
    Climb: (samus) => samus.canPassBombPassages,
    Supers_Climb: (samus) => HasSpeed && samus.energyTanks >= 1,
  },

  Supers_Climb: {
    Climb: (samus) =>
      samus.hasGrapple || HasSpaceJump || (samus.energyTanks >= 2 && samus.totalTanks >= 3),
  },

  Missiles_OldMB: {
    Climb: (samus) => samus.canDestroyBombWalls,
  },

  MorphBall: {
    Climb: true,
    PBs_Retro: () => CanUsePowerBombs,
    ConstructionZone: true,
  },

  ConstructionZone: {
    Missiles_Alpha: () => HasMorph,
    TacoTankRoom: () => CanOpenRedDoors,
    MorphBall: true,
  },

  TacoTankRoom: {
    ConstructionZone: true,
    EnergyTank_Ceiling: true,
    Missiles_Beta: () => HasMorph,
  },

  PBs_Retro: {
    MorphBall: () => CanUsePowerBombs,
    Door_RetroPBs: (samus) => samus.canPassBombPassages,
  },

  Door_RetroPBs: {
    PBs_Retro: (samus) => samus.canPassBombPassages,
  },

  Missiles_Alpha: {
    MorphBall: () => HasMorph,
  },

  EnergyTank_Ceiling: {
    MorphBall: true,
    Missiles_Beta: () => HasMorph,
    Missiles_BillyMays1: () => CanUsePowerBombs,
    Missiles_BillyMays2: () => CanUsePowerBombs,
  },

  Missiles_Beta: {
    TacoTankRoom: () => HasMorph,
  },

  Missiles_BillyMays1: {
    EnergyTank_Ceiling: () => CanUsePowerBombs,
    Missiles_BillyMays2: true,
  },

  Missiles_BillyMays2: {
    Missiles_BillyMays1: true,
  },
};
