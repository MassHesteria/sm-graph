export const crocomireEdges = {
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
};
