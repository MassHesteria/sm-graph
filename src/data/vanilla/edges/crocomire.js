export const crocomireEdges = {
  Door_Croc: {
    PostCroc: (samus) => samus.canDefeatCrocomire,
  },

  PostCroc: {
    Door_Croc: true,
    EnergyTank_Croc: (samus) =>
      //need to ask Kipp how many tanks should put this in logic
      (samus.energyTanks >= 3 && samus.totalTanks >= 4) || samus.hasSpaceJump || samus.hasGrapple,
    PBs_Croc: (samus) => samus.canFly || samus.hasIce || samus.hasHiJump || samus.hasGrapple,
    GrappleBeam: (samus) => samus.superPacks >= 1 || samus.canFly || samus.hasSpeed,
    Missiles_IndianaJones: (samus) => samus.canFly || samus.hasSpeed,
    Missiles_Cosine: (samus) => samus.canOpenRedDoors,
  },

  EnergyTank_Croc: {
    PostCroc: true,
  },

  PBs_Croc: {
    PostCroc: true,
  },

  GrappleBeam: {
    PostCroc: true,
  },

  Missiles_IndianaJones: {
    PostCroc: true,
  },

  Missiles_Cosine: {
    PostCroc: true,
  },
};
