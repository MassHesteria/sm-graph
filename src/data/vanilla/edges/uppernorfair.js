const canHellRun = (samus) => {
    return (samus.totalTanks >= 4 || samus.hasVaria);
};

export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: (_) => true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: (_) => true,
    Door_KraidMouth: (samus) => samus.superPacks >= 1,
    IceBeam: (samus) => samus.canOpenGreenDoors && (samus.hasVaria || samus.totalTanks >= 2),
    Missiles_CrumbleShaft: (samus) =>
      samus.canUsePowerBombs && (samus.hasVaria || samus.totalTanks >= 2),
    Missiles_Cathedral: (samus) => canHellRun(samus),
    BubbleMountain: (samus) => canHellRun(samus),
    EnergyTank_HiJump: (samus) => samus.canOpenRedDoors,
  },

  EnergyTank_HiJump: {
    BusinessCenter: (_) => true,
    HiJumpBoots: (samus) => samus.hasMorph,
  },

  HiJumpBoots: {
    EnergyTank_HiJump: (samus) => samus.canPassBombPassages,
    Missiles_HiJump: (_) => true,
  },

  Missiles_HiJump: {
    EnergyTank_HiJump: (samus) => samus.canPassBombPassages,
  },

  Missiles_Cathedral: {
    BusinessCenter: (samus) =>
      canHellRun(samus) && (samus.canFly || samus.hasSpaceJump || samus.hasHiJump),
    BubbleMountain: (samus) =>
      samus.canOpenGreenDoors && canHellRun(samus),
  },

  BubbleMountain: {
    BusinessCenter: (samus) => samus.hasSpeed || canHellRun(samus),
    Missiles_Cathedral: (samus) => samus.hasVaria || samus.energyTanks >= 3,
    Missiles_BubbleMountain: (_) => true,
    Missiles_SpeedBooster: (samus) => canHellRun(samus),
    PreCrocomire: samus.hasVaria || samus.totalTanks >= 2,
    Door_LavaDive: samus.hasVaria || samus.totalTanks >= 2,
    Missiles_NorfairReserve1: (samus) => canHellRun(samus),
    Missiles_Wave: (samus) => canHellRun(samus),
  },

  Missiles_Wave: {
    BubbleMountain: (samus) => canHellRun(samus),
    WaveBeam: (samus) => canHellRun(samus),
  },

  WaveBeam: {
    BubbleMountain: (samus) => canHellRun(samus),
    Missiles_Wave: (samus) => canHellRun(samus),
  },

  Missiles_NorfairReserve1: {
    BubbleMountain: (_) => true,
    Missiles_NorfairReserve2: (samus) => canHellRun(samus),
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: (samus) => canHellRun(samus),
    ReserveTank_Norfair: (_) => true,
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: (_) => true,
  },

  Door_SingleChamber: {
    BubbleMountain: (samus) => canHellRun(samus) && samus.canDestroyBombWalls,
  },

  Door_LavaDive: {
    BubbleMountain: samus.hasVaria || samus.totalTanks >= 2,
  },

  Missiles_SpeedBooster: {
    BubbleMountain: (samus) => canHellRun(samus),
    SpeedBooster: (_) => true,
  },

  SpeedBooster: {
    Missiles_SpeedBooster: (_) => true,
  },

  Missiles_BubbleMountain: {
    BubbleMountain: (_) => true,
  },

  Door_KraidMouth: {
    BusinessCenter: (samus) => samus.superPacks >= 1,
  },

  IceBeam: {
    BusinessCenter: (samus) => samus.canPassBombPassages && (samus.hasVaria || samus.totalTanks >= 2),
  },

  Missiles_CrumbleShaft: {
    BusinessCenter: (samus) => samus.canUsePowerBombs,
    PreCrocomire: (samus) => samus.hasVaria && samus.hasSpeed,
  },

  PreCrocomire: {
    Door_CrocEntry: (samus) => samus.canOpenGreenDoors,
    BubbleMountain: (samus) => samus.hasVaria || samus.totalTanks >= 2,
    Missiles_CrocEscape: (samus) => canHellRun(samus) &&
      (samus.canfly || samus.hasGrapple || 
        (samus.hasHiJump && (samus.hasSpringBall || samus.hasSpeed)
      )),
  },

  Missiles_CrocEscape: {
    BusinessCenter: (samus) => samus.canOpenGreenDoors,
    PreCrocomire: (samus) => samus.hasMorph && (samus.hasVaria || samus.totalTanks >= 2),
  },

  Door_CrocEntry: {
    PreCrocomire: (samus) => samus.canDefeatCrocomire,
  },
};