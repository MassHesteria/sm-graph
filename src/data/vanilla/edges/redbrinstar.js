export const redbrinstarEdges = {
  Door_RedTower: {
    RedTowerMid: (_) => true,
  },

  XrayHallway: {
    RedTowerMid: (samus) => samus.canUsePowerBombs,
    XrayScope: (samus) =>
      samus.canOpenRedDoors &&
      samus.hasMorph &&
      (samus.hasSpaceJump ||
        samus.hasGrapple ||
        (((samus.hasHiJump && samus.hasSpeed) || samus.hasIce) && samus.totalTanks >= 4)),
  },

  XrayScope: {
    XrayHallway: (samus) =>
      (samus.canUseBombs || samus.canUsePowerBombs) &&
      (samus.hasSpaceJump ||
        samus.hasGrapple ||
        (((samus.hasHiJump && samus.hasSpeed) || samus.hasIce) && samus.totalTanks >= 4)),
  },

  Door_AboveKraid: {
    RedTowerBottom: (samus) => samus.superPacks >= 1,
  },

  Door_KraidEntry: {
    RedTowerBottom: (_) => true,
  },

  Spazer: {
    RedTowerBottom: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
  },

  Door_MaridiaTube: {
    RedTowerBottom: (samus) => samus.hasMorph,
  },

  RedBrinstarElevatorRoom: {
    Door_RedElevator: (samus) => samus.canUsePowerBombs,
    RedTowerElevatorRoom: (_) => true,
  },

  RedTowerElevatorRoom: {
    Door_MaridiaEscape: (_) => false, //for future use
    RedBrinstarElevatorRoom: (_) => true,
    RedTowerTop: (samus) => samus.canUsePowerBombs,
    PBs_Alpha: (samus) => samus.canOpenGreenDoors,
    PBs_Beta: (samus) => samus.canOpenGreenDoors && samus.canUsePowerBombs,
  },

  RedTowerTop: {
    RedTowerElevatorRoom: (_) => true,
    RedTowerMid: (_) => true,
  },

  RedTowerMid: {
    Door_RedTower: (_) => true,
    RedTowerTop: (_) => true,
    RedTowerBottom: (_) => true,
    XrayHallway: (samus) => samus.canUsePowerBombs,
  },

  RedTowerBottom: {
    Door_KraidEntry: (_) => true,
    Door_MaridiaTube: (samus) => samus.canUsePowerBombs && (samus.hasHiJump || samus.hasGravity),
    RedTowerMid: (samus) => samus.hasIce || samus.hasHiJump || samus.hasSpaceJump,
    Spazer: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
  },

  Door_RedElevator: {
    RedBrinstarElevatorRoom: (_) => true,
  },

  PBs_Alpha: {
    RedTowerElevatorRoom: (_) => true,
    Missiles_AlphaPBs: (samus) => samus.canUsePowerBombs,
  },

  Missiles_AlphaPBs: {
    PBs_Alpha: (_) => true,
  },

  PBs_Beta: {
    RedTowerElevatorRoom: (_) => true,
  },

  Door_MaridiaEscape: {
    RedTowerElevatorRoom: (samus) => samus.hasMorph && samus.superPacks >= 1,
  },
};
