export const wreckedshipEdges = {
  Door_Ocean: {
    Missiles_Ocean: (_) => true,
  },

  Missiles_Ocean: {
    Door_Ocean: (_) => true,
    ShipHallway: (samus) => samus.canOpenGreenDoors,
  },

  ShipHallway: {
    Missiles_Ocean: (_) => true,
    Missiles_Spooky: (samus) => samus.canPassBombPassages,
    Door_PhantoonBoss: (samus) =>
      samus.canOpenRedDoors && (samus.hasSpeed || samus.canPassBombPassages),
    Supers_LeftSide: (samus) => samus.canDefeatPhantoon,
    Supers_RightSide: (samus) =>
      samus.canDefeatPhantoon && samus.canPassBombPassages,
    Missiles_Attic: (samus) => samus.canDefeatPhantoon,
    ShipRearExit: (samus) =>
      samus.canDefeatPhantoon && 
        (samus.canfly || 
         samus.canUsePowerBombs || 
         samus.hasSpeed || 
         samus.hasHiJump || 
         samus.hasGravity),
  },

  Missiles_Spooky: {
    ShipHallway: (_) => true,
  },

  ShipRearExit: {
    EnergyTank_Ship: (samus) => samus.canDefeatPhantoon,
    ShipHallway: (_) => true,
    Door_HighwayExit: (samus) => samus.hasGravity || samus.hasHiJump || samus.hasSpaceJump,
  },

  EnergyTank_Ship: {
    ShipRearExit: (_) => true,
  },

  Door_HighwayExit: {
    ShipRearExit: (samus) => samus.hasGravity || samus.hasHiJump || samus.hasSpaceJump,
  },

  Missiles_Attic: {
    ShipHallway: (_) => true,
    Missiles_Sky: (_) => true,
    Missiles_OceanMiddle: (samus) => samus.superPacks >= 1 && samus.hasMorph,
    GravitySuit: (samus) =>
      samus.hasMorph && (samus.canPassBombPassages || samus.hasSpringBall) &&
      //like climb supers, the DASH logic doesn't seem to account for space/grapple
      (samus.totalTanks >= 2 || (samus.hasVaria && samus.totalTanks >= 1)),
  },

  Missiles_Sky: {
    Missiles_Attic: (_) => true,
  },

  Missiles_OceanMiddle: {
    Missiles_Attic: (samus) => samus.hasMorph && samus.superPacks >= 1,
    Missiles_Ocean: (samus) => samus.hasMorph,
  },

  GravitySuit: {
    Missiles_Bowling: (samus) => samus.canDestroyBombWalls,
    Missiles_Ocean: (_) => true,
  },

  Missiles_Bowling: {
    ReserveTank_Ship: (samus) => samus.canUsePowerBombs && samus.hasSpeed,
    GravitySuit: (samus) => samus.canPassBombPassages,
  },

  ReserveTank_Ship: {
    Missiles_Bowling: (_) => true,
  },

  Door_PhantoonBoss: {
    ShipHallway: (samus) => samus.canPassBombPassages,
  },

  Supers_LeftSide: {
    ShipHallway: (_) => true,
  },

  Supers_RightSide: {
    ShipHallway: (samus) => samus.canPassBombPassages,
  },
};