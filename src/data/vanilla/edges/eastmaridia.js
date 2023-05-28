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
    Door_Aqueduct: () => CanUsePowerBombs || (HasGravity && CanDestroyBombWalls),
    //TODO: Snail clip is techincally in logic
    Missiles_Aqueduct: () => HasGravity,
    Supers_Aqueduct: () => HasGravity,
    BotwoonHallwayLeft: () => HasGravity || CanDoSuitlessMaridia,
    LeftSandPitBottom: () => HasGravity,
    Missiles_RightSandPit: () => HasGravity,
    PBs_RightSandPit: () => HasGravity && HasMorph,
    OasisBottom: () => HasGravity || HasHiJump,
  },

  LeftSandPitBottom: {
    Missiles_LeftSandPit: () =>
      HasGravity && HasMorph && (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    ReserveTank_LeftSandPit: () =>
      HasGravity && HasMorph && (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    OasisBottom: () => CanMoveInWestMaridia || HasHiJump,
  },

  BotwoonHallwayLeft: {
    BotwoonHallwayRight: () => (HasGravity && HasSpeed) || HasIce,
    Aqueduct: true,
  },

  Missiles_LeftSandPit: {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  ReserveTank_LeftSandPit: {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  Missiles_RightSandPit: {
    OasisBottom: () => HasGravity || HasHiJump,
  },

  PBs_RightSandPit: {
    OasisBottom: () => (HasGravity || HasHiJump) && HasMorph,
  },

  OasisBottom: {
    MainStreet: () => (HasGravity || HasHiJump) && HasMorph,
    SpringBall: () =>
      HasGravity && CanUsePowerBombs && ((HasGrapple && (CanFly || HasHiJump)) || HasIce),
    OasisTop: () => CanUsePowerBombs || CanUseBombs || (HasGravity && HasScrewAttack),
  },

  OasisTop: {
    PlasmaSparkRoomTop: () => CanOpenGreenDoors,
    OasisBottom: () => CanUsePowerBombs || CanUseBombs || (HasGravity && HasScrewAttack),
  },

  PlasmaSparkRoomTop: {
    OasisTop: () => CanOpenGreenDoors,
    PrePlasmaBeam: () => CanDefeatDraygon,
    MaridiaHighway: true,
  },

  PlasmaSparkRoomBottom: {
    PlasmaSparkRoomTop: () => HasGravity,
  },

  PrePlasmaBeam: {
    PlasmaBeam: true,
    PlasmaSparkRoomTop: true,
  },

  PlasmaBeam: {
    PrePlasmaBeam: () =>
      (HasScrewAttack || HasPlasma || (HasGravity && HasCharge && TotalTanks >= 3)) &&
      (CanFly || HasHiJump || HasSpeed || HasSpringBall),
  },

  SpringBall: {
    OasisBottom: () => HasGravity && HasMorph,
  },

  BotwoonHallwayRight: {
    Aqueduct: () => (HasGravity && HasSpeed) || HasIce || CanDefeatBotwoon,
    EnergyTank_Botwoon: () =>
      CanDefeatBotwoon && HasMorph && (HasGravity || HasHiJump || HasSpringBall),
    ColosseumTopLeft: () => HasGravity && (HasSpeed || HasMorph),
  },

  EnergyTank_Botwoon: {
    BotwoonHallwayRight: () => HasMorph,
    Aqueduct: true,
    ColosseumTopLeft: () => HasGravity && HasMorph,
  },

  ColosseumTopLeft: {
    EnergyTank_Botwoon: () => HasMorph && (HasGravity || HasHiJump || HasSpringBall),
    ColosseumTopRight: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
    PlasmaSparkRoomBottom: () => CanDefeatDraygon && (HasGravity || (HasHiJump && HasSpaceJump)),
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
    Missiles_Precious: () => HasGravity || (HasHiJump && HasSpringBall),
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
    MaridiaHighway: () => HasGravity || HasHiJump,
  },

  MaridiaHighway: {
    Door_Highway: true,
    PlasmaSparkRoomTop: () => HasGravity || HasHiJump,
  },
};
