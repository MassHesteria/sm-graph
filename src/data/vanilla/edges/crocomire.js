export const crocomireEdges = {
  Door_Croc: {
    PostCroc: () => CanDefeatCrocomire,
  },

  PostCroc: {
    Door_Croc: true,
    EnergyTank_Croc: () =>
      //need to ask Kipp how many tanks should put this in logic
      (EnergyTanks >= 3 && TotalTanks >= 4) || HasSpaceJump || HasGrapple,
    //TODO: Standard logic allows access to Croc PBs without any movement items but
    //      we probably do not want that. In the first million, one seed failed: 893225.
    //PBs_Croc: () => CanFly || HasIce || HasHiJump || HasGrapple,
    PBs_Croc: true,
    GrappleBeam: () => SuperPacks >= 1 || CanFly || HasSpeed,
    //TODO: Both Standard and Recall allow access to Indiana Jones using Speed
    //      without PBs to break the blocks. Not sure we want to require stutters.
    //      Also probably want to remove grapple.
    //Missiles_IndianaJones: () => CanFly || HasGrapple || (CanUsePowerBombs && HasSpeed),
    Missiles_IndianaJones: () => CanFly || HasGrapple || HasSpeed,
    Missiles_Cosine: () => CanOpenRedDoors,
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
