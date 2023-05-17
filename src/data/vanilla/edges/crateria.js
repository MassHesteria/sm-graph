export const crateriaEdges = {
  Ship: {
    PBs_LandingSite: (samus) => 
        (samus.canFly || (samus.hasSpeed && samus.totalTanks >= 1)) 
        && samus.canUsePowerBombs,
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
    Door_Moat: (_) => true,
  },

  Door_Moat: {
    Missiles_Moat: (_) => true,
  },

  PreGauntlet: {        //more specifically, the door from landing site to gauntlet
    Ship: (samus) => samus.canDestroyBombWalls,
    EnergyTank_Gauntlet: (samus) => (
        (samus.canUseBombs & samus.totalTanks >= 2)  || 
        (samus.hasMorph && samus.powerPacks >= 2 && samus.totalTanks >= 1) || 
        (samus.hasScrewAttack)
    ),
  },

  EnergyTank_Gauntlet: {
    PreGauntlet: (samus) => (
        (samus.canUseBombs & samus.totalTanks >= 2)  || 
        (samus.hasMorph && samus.powerPacks >= 2 && samus.totalTanks >= 1) || 
        (samus.hasScrewAttack)
    ),
    Missiles_GauntletLeft: (samus) => samus.canPassBombPassages,
    Missiles_GauntletRight: (samus) => samus.canPassBombPassages,
    EnergyTank_Terminator: (samus) => samus.canPassBombPassages,
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
    Missiles_230: (samus) => samus.canPassBombPassages,
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
    Climb: (samus) => samus.canPassBombPassages,
    Supers_Climb: (samus) => samus.hasSpeed && samus.energyTanks >= 1,
  },

  Supers_Climb: {
    Climb: (samus) => 
        samus.hasGrapple || 
        samus.hasSpaceJump || 
        (samus.energyTanks >= 2 && samus.totalTanks >= 3),
  },

  Missiles_OldMB: {
    Climb: (samus) => samus.canDestroyBombWalls,
  },

  MorphBall: {
    Climb: (_) => true,
    EnergyTank_Ceiling: (samus) => samus.canOpenRedDoors,
    PBs_Retro: (samus) => samus.canUsePowerBombs,
    Missiles_Alpha: (samus) => samus.hasMorph,
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
    MorphBall: (_) => true,
    Missiles_Beta: (samus) => samus.hasMorph,
    Missiles_BillyMays1: (samus) => samus.canUsePowerBombs,
    Missiles_BillyMays2: (samus) => samus.canUsePowerBombs,
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
};