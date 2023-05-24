export const crocomireEdges = {
  Door_Croc: {
    PostCroc: () => CanDefeatCrocomire,
  },

  PostCroc: {
    Door_Croc: true,
    EnergyTank_Croc: (samus) =>
      //need to ask Kipp how many tanks should put this in logic
      (samus.energyTanks >= 3 && samus.totalTanks >= 4) || HasSpaceJump || samus.hasGrapple,
    //TODO: Standard logic allows access to Croc PBs without any movement items. While
    //      looking at the first million, one seed failed: 893225.
    //PBs_Croc: (samus) => samus.canFly || samus.hasIce || samus.hasHiJump || samus.hasGrapple,
    PBs_Croc: true,
    GrappleBeam: (samus) => samus.superPacks >= 1 || samus.canFly || samus.hasSpeed,
    Missiles_IndianaJones: (samus) => samus.canFly || samus.hasGrapple || samus.hasSpeed,
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
