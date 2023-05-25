export const crateriaEdges = {
  Ship: {
    PBs_LandingSite: () => (CanFly || (HasSpeed && TotalTanks >= 1)) && CanUsePowerBombs,
    PreGauntlet: () => CanDestroyBombWalls,
    PreMoat: () => CanOpenGreenDoors,
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
    Ship: () => CanDestroyBombWalls,
    EnergyTank_Gauntlet: (samus) =>
      CanUseBombs ||
      (HasMorph && samus.powerPacks >= 2) ||
      HasScrewAttack ||
      (CanUsePowerBombs && HasSpeed && TotalTanks >= 2) /* TODO: remove this */,
  },

  EnergyTank_Gauntlet: {
    PreGauntlet: (samus) =>
      CanUseBombs & (TotalTanks >= 2) ||
      (HasMorph && samus.powerPacks >= 2 && TotalTanks >= 1) ||
      HasScrewAttack,
    Missiles_GauntletLeft: () => CanPassBombPassages,
    Missiles_GauntletRight: () => CanPassBombPassages,
    EnergyTank_Terminator: () => CanPassBombPassages,
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
    Parlor: () => CanDestroyBombWalls || HasSpeed,
    Door_G4: () => CanOpenRedDoors,
    Door_Kago: true,
  },

  Door_G4: {
    EnergyTank_Terminator: true,
  },

  Door_Kago: {
    EnergyTank_Terminator: true,
  },

  Parlor: {
    EnergyTank_Terminator: () => CanDestroyBombWalls || HasSpeed,
    Bombs: () => HasMorph && CanOpenRedDoors,
    Climb: true,
    Missiles_230: () => CanPassBombPassages,
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
    Missiles_OldMB: () => CanDestroyBombWalls,
    MorphBall: true,
  },

  ClimbSupersBottom: {
    Climb: () => CanPassBombPassages,
    Supers_Climb: (samus) => HasSpeed && samus.energyTanks >= 1,
  },

  Supers_Climb: {
    Climb: (samus) =>
      HasGrapple || HasSpaceJump || (samus.energyTanks >= 2 && samus.totalTanks >= 3),
  },

  Missiles_OldMB: {
    Climb: () => CanDestroyBombWalls,
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
    Door_RetroPBs: () => CanPassBombPassages,
  },

  Door_RetroPBs: {
    PBs_Retro: () => CanPassBombPassages,
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
