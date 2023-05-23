export const redbrinstarEdges = {
  Door_RedTower: {
    RedTowerMid: true,
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
    RedTowerBottom: true,
  },

  Spazer: {
    RedTowerBottom: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
  },

  Door_MaridiaTube: {
    RedTowerBottom: (samus) => samus.hasMorph,
  },

  RedBrinstarElevatorRoom: {
    Door_RedElevator: (samus) => samus.canUsePowerBombs,
    RedTowerElevatorRoom: true,
  },

  RedTowerElevatorRoom: {
    Door_MaridiaEscape: (_) => false, //for future use
    RedBrinstarElevatorRoom: true,
    RedTowerTop: (samus) => samus.canUsePowerBombs,
    PBs_Alpha: (samus) => samus.canOpenGreenDoors,
    PBs_Beta: (samus) => samus.canOpenGreenDoors && samus.canUsePowerBombs,
  },

  RedTowerTop: {
    RedTowerElevatorRoom: true,
    RedTowerMid: true,
  },

  RedTowerMid: {
    Door_RedTower: true,
    RedTowerTop: true,
    RedTowerBottom: true,
    XrayHallway: (samus) => samus.canUsePowerBombs,
  },

  RedTowerBottom: {
    Door_KraidEntry: true,
    Door_MaridiaTube: (samus) => samus.canUsePowerBombs && (samus.hasHiJump || samus.hasGravity),
    RedTowerMid: (samus) => samus.hasIce || samus.hasHiJump || samus.hasSpaceJump,
    Spazer: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
  },

  Door_RedElevator: {
    RedBrinstarElevatorRoom: true,
  },

  PBs_Alpha: {
    RedTowerElevatorRoom: true,
    Missiles_AlphaPBs: (samus) => samus.canUsePowerBombs,
  },

  Missiles_AlphaPBs: {
    PBs_Alpha: true,
  },

  PBs_Beta: {
    RedTowerElevatorRoom: true,
  },

  Door_MaridiaEscape: {
    RedTowerElevatorRoom: (samus) => samus.hasMorph && samus.superPacks >= 1,
  },
};
