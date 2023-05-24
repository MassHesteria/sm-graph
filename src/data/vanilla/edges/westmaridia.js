export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: true,
  },

  MainStreet: {
    Door_MainStreet: true,
    Missiles_MainStreet: () => HasGravity && HasSpeed,
    Supers_Crab: () => HasGravity || CanDoSuitlessMaridia,
    Missiles_MamaTurtle: () => HasGravity || (HasHiJump && (HasIce || HasSpringBall)),
    Door_MaridiaMap: () => CanOpenGreenDoors,
    Door_EverestTopRight: () => HasGravity || CanDoSuitlessMaridia,
  },

  Missiles_MainStreet: {
    MainStreet: true,
  },

  Door_EverestTopRight: {
    Supers_Crab: true,
    Missiles_Beach: () => HasGravity || (HasHiJump && (HasIce || HasSpringBall)),
    Door_PreAqueduct: () => CanOpenGreenDoors,
  },

  Door_PreAqueduct: {
    Door_EverestTopRight: () => HasGravity || HasHiJump,
  },

  Missiles_Beach: {
    Door_EverestTopRight: true,
    Missiles_WateringHole: () => HasGravity || (HasHiJump && (HasIce || HasSpringBall)),
    Supers_WateringHole: () => HasGravity || (HasHiJump && (HasIce || HasSpringBall)),
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
    MainStreet: () => HasGravity || (HasHiJump && (HasIce || HasSpringBall)),
  },

  Supers_Crab: {
    MainStreet: () => HasMorph,
    Missiles_MamaTurtle: () => HasMorph,
    Door_RedFish: () => HasGravity || CanDoSuitlessMaridia,
  },

  Door_RedFish: {
    Supers_Crab: () => HasMorph,
  },

  Missiles_MamaTurtle: {
    EnergyTank_MamaTurtle: (samus) => samus.canFly || samus.hasGrapple || HasSpeed,
    MainStreet: () => HasGravity || HasHiJump,
  },

  EnergyTank_MamaTurtle: {
    Missiles_MamaTurtle: true,
  },
};
