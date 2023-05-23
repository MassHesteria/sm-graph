export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: true,
  },

  MainStreet: {
    Door_MainStreet: true,
    Missiles_MainStreet: (samus) => samus.hasGravity && samus.hasSpeed,
    Supers_Crab: (samus) => samus.hasGravity || CanDoSuitlessMaridia,
    Missiles_MamaTurtle: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
    Door_MaridiaMap: (samus) => samus.canOpenGreenDoors,
    Door_EverestTopRight: (samus) => samus.hasGravity || CanDoSuitlessMaridia,
  },

  Missiles_MainStreet: {
    MainStreet: true,
  },

  Door_EverestTopRight: {
    Supers_Crab: true,
    Missiles_Beach: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
    Door_PreAqueduct: (samus) => samus.canOpenGreenDoors,
  },

  Door_PreAqueduct: {
    Door_EverestTopRight: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  Missiles_Beach: {
    Door_EverestTopRight: true,
    Missiles_WateringHole: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
    Supers_WateringHole: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
  },

  Missiles_WateringHole: {
    Missiles_Beach: true,
    Supers_WateringHole: true,
  },

  Supers_WateringHole: {
    Missiles_Beach: true,
    Missiles_WateringHole: true,
  },

  Door_MaridiaMap: {
    MainStreet: (samus) =>
      samus.hasGravity || (samus.hasHiJump && (samus.hasIce || samus.hasSpringBall)),
  },

  Supers_Crab: {
    MainStreet: (samus) => samus.hasMorph,
    Missiles_MamaTurtle: (samus) => samus.hasMorph,
    Door_RedFish: (samus) => samus.hasGravity || CanDoSuitlessMaridia,
  },

  Door_RedFish: {
    Supers_Crab: (samus) => samus.hasMorph,
  },

  Missiles_MamaTurtle: {
    EnergyTank_MamaTurtle: (samus) => samus.canFly || samus.hasGrapple || samus.hasSpeed,
    MainStreet: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  EnergyTank_MamaTurtle: {
    Missiles_MamaTurtle: true,
  },
};
