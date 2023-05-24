//const canHellRun = (samus) => {
//return samus.totalTanks >= 4 || (samus.hasGravity && samus.totalTanks >= 3) || samus.hasVaria;
//};

export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: true,
    Door_KraidMouth: (samus) => samus.superPacks >= 1,
    IceBeam: (samus) => samus.canOpenGreenDoors && (samus.hasVaria || samus.totalTanks >= 2),
    Missiles_CrumbleShaft: (samus) =>
      samus.canUsePowerBombs && (samus.hasVaria || samus.totalTanks >= 2),
    BusinessCenterTopRightDoor: true,
    BusinessCenterBottomRightDoor: true,
    EnergyTank_HiJump: (samus) => samus.canOpenRedDoors,
  },

  BusinessCenterTopRightDoor: {
    BusinessCenter: true,
    CathedralEntranceLeftDoor: true,
  },

  BusinessCenterBottomRightDoor: {
    BusinessCenter: true,
    BubbleMountain: (samus) => samus.hasSpeed,
  },

  CathedralEntranceLeftDoor: {
    BusinessCenterTopRightDoor: true,
    CathedralEntranceMain: () => CanHellRun,
  },

  CathedralEntranceMain: {
    CathedralEntranceLeftDoor: () => CanHellRun,
    CathedralEntranceRightDoor: (samus) =>
      CanHellRun && (samus.hasHiJump || samus.canFly || samus.hasSpeed),
  },

  CathedralEntranceRightDoor: {
    Missiles_Cathedral: (samus) => CanHellRun && samus.canOpenRedDoors,
    CathedralEntranceMain: () => CanHellRun,
  },

  EnergyTank_HiJump: {
    BusinessCenter: true,
    HiJumpBoots: (samus) => samus.hasMorph,
  },

  HiJumpBoots: {
    Missiles_HiJump: true,
  },

  Missiles_HiJump: {
    EnergyTank_HiJump: (samus) => samus.canPassBombPassages,
  },

  Missiles_Cathedral: {
    CathedralEntranceRightDoor: () => CanHellRun,
    BubbleMountain: (samus) => samus.canOpenGreenDoors && CanHellRun,
  },

  BubbleMountain: {
    BusinessCenterBottomRightDoor: (samus) => samus.hasSpeed,
    Missiles_Cathedral: () => CanHellRun,
    Missiles_BubbleMountain: true,
    Missiles_SpeedBooster: () => CanHellRun,
    PreCrocomire: (samus) => samus.hasVaria || samus.totalTanks >= 2,
    Door_LavaDive: (samus) => samus.hasVaria || samus.totalTanks >= 2,
    Missiles_NorfairReserve1: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  Missiles_Wave: {
    BubbleMountain: () => CanHellRun,
    WaveBeam: () => CanHellRun,
  },

  WaveBeam: {
    BubbleMountain: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  Missiles_NorfairReserve1: {
    BubbleMountain: true,
    Missiles_NorfairReserve2: () => CanHellRun,
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: () => CanHellRun,
    ReserveTank_Norfair: true,
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: true,
  },

  Door_SingleChamber: {
    BubbleMountain: (samus) => CanHellRun && samus.canDestroyBombWalls,
  },

  Door_LavaDive: {
    BubbleMountain: () => CanHellRun,
  },

  Missiles_SpeedBooster: {
    BubbleMountain: () => CanHellRun,
    SpeedBooster: true,
  },

  SpeedBooster: {
    Missiles_SpeedBooster: true,
  },

  Missiles_BubbleMountain: {
    BubbleMountain: true,
  },

  Door_KraidMouth: {
    BusinessCenter: (samus) => samus.superPacks >= 1,
  },

  IceBeam: {
    BusinessCenter: (samus) =>
      samus.canPassBombPassages && (samus.hasVaria || samus.totalTanks >= 2),
  },

  Missiles_CrumbleShaft: {
    BusinessCenter: (samus) => samus.canUsePowerBombs,
    PreCrocomire: (samus) => samus.hasVaria && samus.hasSpeed,
  },

  PreCrocomire: {
    Door_CrocEntry: (samus) => samus.canOpenGreenDoors,
    BubbleMountain: (samus) => samus.hasVaria || samus.totalTanks >= 2,
    Missiles_CrocEscape: (samus) =>
      CanHellRun &&
      (samus.canFly ||
        samus.hasGrapple ||
        samus.hasIce || //TODO: Probably remove this
        (samus.hasHiJump && (samus.hasSpringBall || samus.hasSpeed))),
  },

  Missiles_CrocEscape: {
    BusinessCenter: (samus) => samus.canOpenGreenDoors,
    PreCrocomire: (samus) => samus.hasMorph && (samus.hasVaria || samus.totalTanks >= 2),
  },

  Door_CrocEntry: {
    PreCrocomire: (samus) => CanDefeatCrocomire,
  },
};
