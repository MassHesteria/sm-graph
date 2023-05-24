/***
 * I might've been more thorough than I needed to be,
 * since some things are very easy to do but not technically in logic.
 * With that being said, you can traverse between both entrances with just hijump and supers/pbs,
 * which is non-trivial for area rando purposes
 *  - AJ
 ***/

export const eastmaridiaEdges = {
  Door_Aqueduct: {
    Aqueduct: () => CanUsePowerBombs,
  },

  Aqueduct: {
    Door_Aqueduct: (samus) => CanUsePowerBombs || (HasGravity && samus.canDestroyBombWalls),
    Missiles_Aqueduct: (samus) => HasGravity && samus.hasSpeed,
    Supers_Aqueduct: (samus) => HasGravity && samus.hasSpeed,
    Door_Botwoon: (samus) =>
      (HasGravity && samus.hasSpeed) || (samus.hasIce && (HasGravity || CanDoSuitlessMaridia)),
    Missiles_LeftSandPit: () => HasGravity && HasMorph,
    ReserveTank_LeftSandPit: () => HasGravity && HasMorph,
    Missiles_RightSandPit: () => HasGravity,
    PBs_RightSandPit: () => HasGravity && HasMorph,
    Oasis: (samus) => HasGravity || samus.hasHiJump,
  },

  Missiles_LeftSandPit: {
    Oasis: (samus) => (HasGravity || samus.hasHiJump) && HasMorph,
  },

  ReserveTank_LeftSandPit: {
    Oasis: (samus) => (HasGravity || samus.hasHiJump) && HasMorph,
  },

  Missiles_RightSandPit: {
    Oasis: (samus) => HasGravity || samus.hasHiJump,
  },

  PBs_RightSandPit: {
    Oasis: (samus) => (HasGravity || samus.hasHiJump) && HasMorph,
  },

  Oasis: {
    MainStreet: (samus) => (samus.hasGravity || samus.hasHiJump) && samus.hasMorph,
    SpringBall: (samus) =>
      samus.hasGravity &&
      samus.canUsePowerBombs &&
      ((samus.hasGrapple && (samus.canFly || samus.hasHiJump)) || samus.hasIce),
    Door_PlasmaSpark: () =>
      CanOpenGreenDoors && (CanUsePowerBombs || CanUseBombs || (HasGravity && HasScrewAttack)),
  },

  Door_PlasmaSpark: {
    Oasis: () => CanOpenGreenDoors,
    PlasmaBeam: () => CanDefeatDraygon,
    MaridiaHighway: true,
  },

  PlasmaBeam: {
    Door_PlasmaSpark: (samus) =>
      (HasScrewAttack ||
        samus.hasPlasma ||
        (HasGravity && samus.hasCharge && samus.totalTanks >= 3)) &&
      (samus.canFly || samus.hasHiJump || samus.hasSpeed || samus.hasSpringBall),
  },

  SpringBall: {
    Oasis: () => HasGravity && HasMorph,
  },

  Door_Botwoon: {
    Aqueduct: (samus) => (HasGravity && samus.hasSpeed) || samus.hasIce || CanDefeatBotwoon,
    EnergyTank_Botwoon: (samus) =>
      CanDefeatBotwoon &&
      HasMorph &&
      //might've been overly thorough here
      (HasGravity || samus.hasHiJump || samus.hasSpringBall),
    ColosseumTopLeft: (samus) => HasGravity && (samus.hasSpeed || HasMorph),
  },

  EnergyTank_Botwoon: {
    Door_Botwoon: () => HasMorph,
    Aqueduct: true,
    ColosseumTopLeft: () => HasGravity && HasMorph,
  },

  ColosseumTopLeft: {
    EnergyTank_Botwoon: (samus) =>
      HasMorph && (HasGravity || samus.hasHiJump || samus.hasSpringBall),
    ColosseumTopRight: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
    Door_PlasmaSpark: (samus) => HasGravity || (samus.hasHiJump && HasSpaceJump),
  },

  ColosseumTopRight: {
    Missiles_Precious: () => CanOpenGreenDoors,
    ColosseumTopLeft: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
  },

  Missiles_Precious: {
    ColosseumTopRight: () => HasGravity || CanDoSuitlessMaridia,
    Door_DraygonBoss: () => CanOpenRedDoors,
  },

  Door_DraygonBoss: {
    Missiles_Precious: (samus) => HasGravity || (samus.hasHiJump && samus.hasSpringBall),
  },

  Missiles_Aqueduct: {
    Aqueduct: true,
    Supers_Aqueduct: true,
  },

  Supers_Aqueduct: {
    Missiles_Aqueduct: true,
    Aqueduct: true,
  },

  Door_Highway: {
    MaridiaHighway: (samus) => HasGravity || samus.hasHiJump,
  },

  MaridiaHighway: {
    Door_Highway: true,
    Door_PlasmaSpark: (samus) => HasGravity || samus.hasHiJump,
  },
};
