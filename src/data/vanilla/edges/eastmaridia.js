/***
 * I might've been more thorough than I needed to be, 
 * since some things are very easy to do but not technically in logic.
 * With that being said, you can traverse between both entrances with just hijump and supers/pbs,
 * which is non-trivial for area rando purposes
 *  - AJ
***/

const canDoSuitlessMaridia = (samus) => {
  return samus.hasHiJump && samus.hasGrapple && (samus.hasIce || samus.hasSpringBall);
};

export const eastmaridiaEdges = {
  Door_Aqueduct: {
    Aqueduct: (samus) => samus.canUsePowerBombs,
  },

  Aqueduct: {
    Door_Aqueduct: (samus) =>
      samus.canUsePowerBombs || (samus.hasGravity && samus.canDestroyBombWalls),
    Missiles_Aqueduct: (samus) => samus.hasGravity && samus.hasSpeed,
    Supers_Aqueduct: (samus) => samus.hasGravity && samus.hasSpeed,
    Door_Botwoon: (samus) =>
      (samus.hasGravity && samus.hasSpeed) ||
      (samus.hasIce && (samus.hasGravity || canDoSuitlessMaridia(samus))),
    Missiles_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    ReserveTank_LeftSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    Missiles_RightSandPit: (samus) => samus.hasGravity,
    PBs_RightSandPit: (samus) => samus.hasGravity && samus.hasMorph,
    Oasis: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  Missiles_LeftSandPit: {
    Oasis: (samus) => (samus.hasGravity || samus.hasHiJump) && samus.hasMorph,
  },

  ReserveTank_LeftSandPit: {
    Oasis: (samus) => (samus.hasGravity || samus.hasHiJump) && samus.hasMorph,
  },

  Missiles_RightSandPit: {
    Oasis: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  PBs_RightSandPit: {
    Oasis: (samus) => (samus.hasGravity || samus.hasHiJump) && samus.hasMorph,
  },

  Oasis: {
    MainStreet: (samus) => (samus.hasGravity || samus.hasHiJump) && samus.hasMorph,
    SpringBall: (samus) =>
      samus.hasGravity && samus.canUsePowerBombs && 
        ((samus.hasGrapple && (samus.canFly || samus.hasHiJump)) || samus.hasIce),
    Door_PlasmaSpark: (samus) =>
      samus.canOpenGreenDoors &&
      (samus.canUsePowerBombs || samus.canUseBombs || (samus.hasGravity && samus.hasScrewAttack)),
  },

  Door_PlasmaSpark: {
    Oasis: (samus) => samus.canOpenGreenDoors,
    PlasmaBeam: (samus) => samus.canDefeatDraygon,
    MaridiaHighway: (_) => true,
  },

  PlasmaBeam: {
    Door_PlasmaSpark: (samus) =>
      (samus.hasScrewAttack || samus.hasPlasma || 
        (samus.hasGravity && samus.hasCharge && samus.totalTanks >= 3)) && 
      (samus.canFly || samus.hasHiJump || samus.hasSpeed || samus.hasSpringBall),
  },

  SpringBall: {
    Oasis: (samus) => samus.hasGravity && samus.hasMorph,
  },

  Door_Botwoon: {
    Aqueduct: (samus) => 
        (samus.hasGravity && samus.hasSpeed) || samus.hasIce || samus.canDefeatBotwoon,
    EnergyTank_Botwoon: (samus) => 
        samus.canDefeatBotwoon && samus.hasMorph && 
            //might've been overly thorough here
            (samus.hasGravity || samus.hasHiJump || samus.hasSpringBall),
    ColosseumTopLeft: (samus) => samus.hasGravity && (samus.hasSpeed || samus.hasMorph),
  },

  EnergyTank_Botwoon: {
    Door_Botwoon: (samus) => samus.hasMorph,
    Aqueduct: (_) => true,
    ColosseumTopLeft: (samus) => samus.hasGravity && samus.hasMorph,
  },

  ColosseumTopLeft: {
    EnergyTank_Botwoon: (samus) => samus.hasMorph &&
        (samus.hasGravity || samus.hasHiJump || samus.hasSpringBall),
    ColosseumTopRight: (samus) => samus.hasGravity || samus.hasSpaceJump || canDoSuitlessMaridia(samus),
    Door_PlasmaSpark: (samus) => samus.hasGravity || (samus.hasHiJump && samus.hasSpaceJump),
  },

  ColosseumTopRight: {
    Missiles_Precious: (samus) => samus.canOpenGreenDoors,
    ColosseumTopLeft: (samus) => samus.hasGravity || samus.hasSpaceJump || canDoSuitlessMaridia(samus),
  },

  Missiles_Precious: {
    ColosseumTopRight: (samus) => samus.hasGravity || canDoSuitlessMaridia(samus),
    Door_DraygonBoss: (samus) => samus.canOpenRedDoors,
  },

  Door_DraygonBoss: {
    Missiles_Precious: (samus) => samus.hasGravity || (samus.hasHiJump && samus.hasSpringBall),
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
    MaridiaHighway: (samus) => samus.hasGravity || samus.hasHiJump,
  },

  MaridiaHighway: {
    Door_Highway: (_) => true,
    Door_PlasmaSpark: (samus) => samus.hasGravity || samus.hasHiJump,
  },
};