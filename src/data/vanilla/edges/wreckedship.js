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
    Missiles_Spooky: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    Door_PhantoonBoss: (samus) =>
      samus.canOpenGreenDoors && (samus.hasSpeed || samus.canUseBombs || samus.canUsePowerBombs),
    Supers_LeftSide: (samus) => samus.canDefeatPhantoon,
    Supers_RightSide: (samus) =>
      samus.canDefeatPhantoon && (samus.canUseBombs || samus.canUsePowerBombs),
    Missiles_Attic: (samus) => samus.canDefeatPhantoon,
    ShipRearExit: (samus) =>
      samus.canDefeatPhantoon && (samus.hasSpaceJump || samus.hasHiJump || samus.hasGravity),
  },

  Missiles_Spooky: {
    ShipHallway: (_) => true,
  },

  ShipRearExit: {
    EnergyTank_Ship: (samus) => samus.canDefeatPhantoon,
    ShipHallway: (_) => true,
    Door_HighwayExit: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  EnergyTank_Ship: {
    ShipRearExit: (_) => true,
  },

  Door_HighwayExit: {
    ShipRearExit: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  Missiles_Attic: {
    ShipHallway: (_) => true,
    Missiles_Sky: (samus) => samus.canFly || samus.hasSpeed,
    Missiles_OceanMiddle: (samus) => samus.superPacks >= 1 && samus.hasMorph,
    GravitySuit: (samus) =>
      (samus.energyTanks >= 3 || (samus.hasVaria && samus.energyTanks >= 2)) &&
      (samus.canUseBombs || samus.canUsePowerBombs || samus.hasSpringBall),
  },

  Missiles_Sky: {
    Missiles_Attic: (_) => true,
  },

  Missiles_OceanMiddle: {
    Missiles_Attic: (samus) => samus.hasMorph && samus.superPacks >= 1,
  },

  GravitySuit: {
    Missiles_Bowling: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    Missiles_Ocean: (_) => true,
  },

  Missiles_Bowling: {
    ReserveTank_Ship: (samus) => samus.canUsePowerBombs && samus.hasSpeed,
    GravitySuit: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  ReserveTank_Ship: {
    Missiles_Bowling: (_) => true,
  },

  Door_PhantoonBoss: {
    ShipHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  Supers_LeftSide: {
    ShipHallway: (_) => true,
  },

  Supers_RightSide: {
    ShipHallway: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },
};
