const canDoSuitlessMaridia = (samus) => {
  return samus.hasHiJump && samus.hasGrapple && (samus.hasIce || samus.hasSpringBall);
};

export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: (_) => true,
  },

  MainStreet: {
    Door_MainStreet: (_) => true,
    Missiles_MainStreet: (samus) => samus.hasGravity && samus.hasSpeed,
    Supers_Crab: (samus) => samus.hasGravity || canDoSuitlessMaridia(samus),
    Missiles_MamaTurtle: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
    Door_MaridiaMap: (samus) => samus.canOpenGreenDoors,
    Door_EverestTopRight: (samus) => samus.hasGravity || canDoSuitlessMaridia(samus),
  },

  Missiles_MainStreet: {
    MainStreet: (_) => true,
  },

  Door_EverestTopRight: {
    Supers_Crab: (_) => true,
    Missiles_Beach: (samus) => samus.hasGravity || (samus.hasHiJump && samus.hasIce),
    Door_PreAqueduct: (samus) => samus.canOpenGreenDoors,
  },

  Door_PreAqueduct: {
    Door_EverestTopRight: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  Missiles_Beach: {
    Door_EverestTopRight: (_) => true,
    Missiles_WateringHole: (samus) => samus.hasGravity || samus.hasHiJump,
    Supers_WateringHole: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  Missiles_WateringHole: {
    Missiles_Beach: (_) => true,
    Supers_WateringHole: (_) => true,
  },

  Supers_WateringHole: {
    Missiles_Beach: (_) => true,
    Missiles_WateringHole: (_) => true,
  },

  Door_MaridiaMap: {
    MainStreet: (samus) => samus.hasGravity && samus.hasHiJump,
  },

  Supers_Crab: {
    MainStreet: (samus) => samus.hasMorph,
    Missiles_MamaTurtle: (samus) => samus.hasMorph,
    Door_RedFish: (samus) => samus.hasGravity && (samus.canFly || samus.hasSpeed),
  },

  Door_RedFish: {
    Supers_Crab: (samus) => samus.hasMorph,
  },

  Missiles_MamaTurtle: {
    EnergyTank_MamaTurtle: (samus) => samus.canFly || samus.hasGrapple,
    MainStreet: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  EnergyTank_MamaTurtle: {
    Missiles_MamaTurtle: (_) => true,
  },
};
