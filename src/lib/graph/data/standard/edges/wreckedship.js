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
    Missiles_Spooky: () => CanPassBombPassages,
    Door_PhantoonBoss: () =>
      CanOpenGreenDoors && (HasSpeed || CanPassBombPassages),
    Supers_LeftSide: () => HasDefeatedWreckedShipBoss,
    Supers_RightSide: () => HasDefeatedWreckedShipBoss && CanPassBombPassages,
    Missiles_Attic: () => HasDefeatedWreckedShipBoss,
    SpongeBathLeft: () => HasDefeatedWreckedShipBoss,
  },

  SpongeBathLeft: {
    SpongeBathRight: () =>
      !HasDefeatedWreckedShipBoss ||
      (HasDefeatedWreckedShipBoss &&
        (CanFly || CanUsePowerBombs || HasSpeed || HasHiJump || HasGravity)),
    ShipHallway: true,
  },

  SpongeBathRight: {
    SpongeBathLeft: true,
    ShipRearExit: true,
  },

  Missiles_Spooky: {
    ShipHallway: true,
  },

  ShipRearExit: {
    EnergyTank_Ship: () => HasDefeatedWreckedShipBoss,
    SpongeBathRight: true,
    Door_HighwayExit: () =>
      CanUsePowerBombs &&
      (HasGravity || (HasHiJump && (HasSpaceJump || HasSpringBall))),
  },

  EnergyTank_Ship: {
    ShipRearExit: true,
  },

  Door_HighwayExit: {
    ShipRearExit: () => (HasGravity || HasHiJump) && HasMorph,
  },

  Missiles_Attic: {
    ShipHallway: true,
    Missiles_Sky: true,
    Missiles_OceanMiddle: () => SuperPacks >= 1 && HasMorph,
    GravitySuit: () =>
      HasMorph &&
      (CanPassBombPassages || HasSpringBall) &&
      (HasGrapple || HasSpaceJump || TotalTanks >= 1 || HasVaria),
  },

  Missiles_Sky: {
    Missiles_Attic: true,
  },

  Missiles_OceanMiddle: {
    Missiles_Attic: () => HasMorph && SuperPacks >= 1,
    Missiles_Ocean: () => HasMorph,
  },

  GravitySuit: {
    Missiles_Bowling: () => CanDestroyBombWalls,
    Missiles_Ocean: true,
  },

  Missiles_Bowling: {
    ReserveTank_Ship: () => CanUsePowerBombs && HasSpeed,
    GravitySuit: () => CanPassBombPassages,
  },

  ReserveTank_Ship: {
    Missiles_Bowling: true,
  },

  Door_PhantoonBoss: {
    ShipHallway: () => CanPassBombPassages,
  },

  Supers_LeftSide: {
    ShipHallway: true,
  },

  Supers_RightSide: {
    ShipHallway: () => CanPassBombPassages,
  },
};
