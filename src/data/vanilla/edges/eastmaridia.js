const canDoSuitlessMaridia = (samus) => {
  return samus.hasHiJump && samus.hasGrapple && (samus.hasIce || samus.hasSpringBall);
};

export const eastmaridiaEdges = {
  Door_Aqueduct: {
    Aqueduct: (samus) => samus.hasGravity && samus.canUsePowerBombs,
  },

  Aqueduct: {
    Door_Aqueduct: (samus) =>
      samus.canUsePowerBombs || (samus.hasGravity && (samus.canUseBombs || samus.hasScrewAttack)),
    Missiles_Aqueduct: (samus) => samus.hasGravity && samus.hasSpeed,
    Door_Botwoon: (samus) =>
      (samus.hasGravity && samus.hasSpeed) ||
      (samus.hasIce && (samus.hasGravity || canDoSuitlessMaridia(samus))),
    Missiles_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    ReserveTank_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    Missiles_RightSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    PBs_RightSandPit: (samus) => samus.hasGravity && samus.hasMorph,
  },

  Missiles_LeftSandPit: {
    Oasis: (samus) => samus.hasGravity,
  },

  ReserveTank_LeftSandPit: {
    Oasis: (samus) => samus.hasGravity,
  },

  Missiles_RightSandPit: {
    Oasis: (samus) => samus.hasGravity,
  },

  PBs_RightSandPit: {
    Oasis: (samus) => samus.hasGravity,
  },

  Oasis: {
    MainStreet: (samus) => samus.hasGravity,
    SpringBall: (samus) =>
      samus.hasGravity && samus.canUsePowerBombs && (samus.hasGrapple || samus.hasIce),
    Door_PlasmaSpark: (samus) =>
      samus.canOpenGreenDoors &&
      (samus.canUsePowerBombs || samus.canUseBombs || (samus.hasGravity && samus.hasScrewAttack)),
  },

  Door_PlasmaSpark: {
    Oasis: (samus) => samus.canOpenGreenDoors,
    PlasmaBeam: (samus) => samus.canDefeatDraygon,
    MaridiaHighway: (samus) => samus.hasGravity,
  },

  PlasmaBeam: {
    Door_PlasmaSpark: (samus) =>
      (samus.hasScrewAttack || samus.hasPlasma) && (samus.canFly || samus.hasHiJump),
  },

  SpringBall: {
    Oasis: (samus) => samus.hasGravity && samus.hasMorph,
  },

  Door_Botwoon: {
    Aqueduct: (samus) => (samus.hasGravity && samus.hasSpeed) || samus.canDefeatBotwoon,
    EnergyTank_Botwoon: (samus) => samus.canDefeatBotwoon && samus.hasMorph,
  },

  EnergyTank_Botwoon: {
    Door_Botwoon: (samus) => samus.hasMorph,
    Aqueduct: (_) => true,
    ColosseumTopLeft: (samus) => samus.hasGravity,
    Missiles_Precious: (samus) => samus.hasGravity && samus.canOpenGreenDoors,
  },

  ColosseumTopLeft: {
    EnergyTank_Botwoon: (samus) => samus.hasGravity,
    ColosseumTopRight: (samus) => samus.hasGravity,
    Door_PlasmaSpark: (samus) => samus.hasGravity,
  },

  ColosseumTopRight: {
    Missiles_Precious: (samus) => samus.hasGravity && samus.canOpenGreenDoors,
    ColosseumTopLeft: (samus) => samus.hasGravity,
  },

  Missiles_Precious: {
    ColosseumTopRight: (samus) => samus.hasGravity,
    Door_DraygonBoss: (samus) => samus.canOpenGreenDoors,
  },

  Door_DraygonBoss: {
    Missiles_Precious: (samus) => samus.hasGravity,
  },

  Missiles_Aqueduct: {
    Aqueduct: (_) => true,
    Supers_Aqueduct: (_) => true,
  },

  Supers_Aqueduct: {
    Missiles_Aqueduct: (_) => true,
    Aqueduct: (_) => true,
  },

  Door_Highway: {
    MaridiaHighway: (samus) => samus.hasGravity,
  },

  MaridiaHighway: {
    Door_Highway: (_) => true,
    Door_PlasmaSpark: (samus) => samus.hasGravity,
  },
};
