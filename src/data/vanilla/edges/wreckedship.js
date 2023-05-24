export const wreckedshipEdges = {
  Door_Ocean: {
    Missiles_Ocean: true,
  },

  Missiles_Ocean: {
    Door_Ocean: true,
    ShipHallway: () => CanOpenGreenDoors,
  },

  ShipHallway: {
    Missiles_Ocean: true,
    Missiles_Spooky: (samus) => samus.canPassBombPassages,
    Door_PhantoonBoss: (samus) => CanOpenRedDoors && (HasSpeed || samus.canPassBombPassages),
    Supers_LeftSide: () => CanDefeatPhantoon,
    Supers_RightSide: (samus) => CanDefeatPhantoon && samus.canPassBombPassages,
    Missiles_Attic: () => CanDefeatPhantoon,
    //TODO: Double check this. Probably add more nodes to clarify logic.
    ShipRearExit: (samus) =>
      CanDefeatPhantoon &&
      (samus.canFly || CanUsePowerBombs || HasSpeed || HasHiJump || HasGravity),
  },

  Missiles_Spooky: {
    ShipHallway: true,
  },

  ShipRearExit: {
    EnergyTank_Ship: () => CanDefeatPhantoon,
    ShipHallway: true,
    Door_HighwayExit: () => HasGravity || HasHiJump || HasSpaceJump,
  },

  EnergyTank_Ship: {
    ShipRearExit: true,
  },

  Door_HighwayExit: {
    ShipRearExit: () => HasGravity || HasHiJump || HasSpaceJump,
  },

  Missiles_Attic: {
    ShipHallway: true,
    Missiles_Sky: true,
    Missiles_OceanMiddle: (samus) => samus.superPacks >= 1 && HasMorph,
    GravitySuit: (samus) =>
      HasMorph &&
      (samus.canPassBombPassages || HasSpringBall) &&
      //like climb supers, the DASH logic doesn't seem to account for space/grapple
      (samus.totalTanks >= 2 || (HasVaria && samus.totalTanks >= 1)),
  },

  Missiles_Sky: {
    Missiles_Attic: true,
  },

  Missiles_OceanMiddle: {
    Missiles_Attic: () => HasMorph && samus.superPacks >= 1,
    Missiles_Ocean: () => HasMorph,
  },

  GravitySuit: {
    Missiles_Bowling: (samus) => samus.canDestroyBombWalls,
    Missiles_Ocean: true,
  },

  Missiles_Bowling: {
    ReserveTank_Ship: () => CanUsePowerBombs && HasSpeed,
    GravitySuit: (samus) => samus.canPassBombPassages,
  },

  ReserveTank_Ship: {
    Missiles_Bowling: true,
  },

  Door_PhantoonBoss: {
    ShipHallway: (samus) => samus.canPassBombPassages,
  },

  Supers_LeftSide: {
    ShipHallway: true,
  },

  Supers_RightSide: {
    ShipHallway: (samus) => samus.canPassBombPassages,
  },
};
