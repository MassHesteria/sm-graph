export const redbrinstarEdges = {
  Door_RedTower: {
    Door_RedElevator: (_) => true,
    Door_MaridiaEscape: (_) => false,   //for future use
    Spazer: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
    Door_MaridiaTube: (samus) => samus.canUsePowerBombs && (samus.hasHiJump || samus.hasGravity),
    Door_KraidEntry: (_) => true,
    XrayHallway: (samus) => samus.canUsePowerBombs,
  },

  XrayHallway: {
    Door_RedTower: (samus) => samus.canUsePowerBombs,
    XrayScope: (samus) =>
      samus.canOpenRedDoors && samus.hasMorph && 
        (samus.hasSpaceJump || samus.hasGrapple || 
            ((samus.hasHiJump && samus.hasSpeed) || samus.hasIce) && samus.totalTanks >= 4
        ),
  },

  XrayScope: {
    XrayHallway: (samus) =>
      (samus.canUseBombs || samus.canUsePowerBombs) && 
      (samus.hasSpaceJump || samus.hasGrapple || 
        ((samus.hasHiJump && samus.hasSpeed) || samus.hasIce) && samus.totalTanks >= 4
      ),
  },

  Door_AboveKraid: {
    Door_RedTower: (samus) => samus.superPacks >= 1,
  },

  Door_KraidEntry: {
    Door_RedTower: (_) => true,
  },

  Spazer: {
    Door_RedTower: (samus) => samus.hasMorph && samus.canOpenGreenDoors,
  },

  Door_MaridiaTube: {
    Door_RedTower: (samus) => samus.hasMorph,
  },

  Door_RedElevator: {
    Door_RedTower: (samus) => samus.canUsePowerBombs,
    PBs_Alpha: (samus) => samus.canOpenGreenDoors,
    PBs_Beta: (samus) => samus.canOpenGreenDoors && samus.canUsePowerBombs,
  },

  PBs_Alpha: {
    Door_RedElevator: (_) => true,
    Missiles_AlphaPBs: (samus) => samus.canUsePowerBombs,
  },

  Missiles_AlphaPBs: {
    PBs_Alpha: (_) => true,
  },

  PBs_Beta: {
    Door_RedElevator: (_) => true,
  },

  Door_MaridiaEscape: {
    Door_RedElevator: (samus) => samus.hasMorph && samus.superPacks >= 1,
  },
};