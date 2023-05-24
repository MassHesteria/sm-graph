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
    RedTowerBottom: () => HasMorph,
  },

  RedBrinstarElevatorRoom: {
    Door_RedElevator: () => CanUsePowerBombs,
    RedTowerElevatorRoom: true,
  },

  RedTowerElevatorRoom: {
    Door_MaridiaEscape: (_) => false, //for future use
    RedBrinstarElevatorRoom: true,
    RedTowerTop: () => CanUsePowerBombs,
    PBs_Alpha: () => CanOpenGreenDoors,
    PBs_Beta: () => CanOpenGreenDoors && CanUsePowerBombs,
  },

  RedTowerTop: {
    RedTowerElevatorRoom: true,
    RedTowerMid: true,
  },

  RedTowerMid: {
    Door_RedTower: true,
    RedTowerTop: true,
    RedTowerBottom: true,
    XrayHallway: () => CanUsePowerBombs,
  },

  RedTowerBottom: {
    Door_KraidEntry: true,
    Door_MaridiaTube: (samus) => CanUsePowerBombs && (samus.hasHiJump || HasGravity),
    RedTowerMid: (samus) => samus.hasIce || samus.hasHiJump || samus.hasSpaceJump,
    Spazer: () => HasMorph && CanOpenGreenDoors,
  },

  Door_RedElevator: {
    RedBrinstarElevatorRoom: true,
  },

  PBs_Alpha: {
    RedTowerElevatorRoom: true,
    Missiles_AlphaPBs: () => CanUsePowerBombs,
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
