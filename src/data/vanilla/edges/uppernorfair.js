export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: true,
    Door_KraidMouth: () => SuperPacks >= 1,
    IceBeam: () => CanOpenGreenDoors && (HasVaria || TotalTanks >= 2),
    Missiles_CrumbleShaft: () => CanUsePowerBombs && CanHellRun,
    BusinessCenterTopRightDoor: true,
    BusinessCenterBottomRightDoor: true,
    EnergyTank_HiJump: () => CanOpenRedDoors,
  },

  BusinessCenterTopRightDoor: {
    BusinessCenter: true,
    CathedralEntranceLeftDoor: true,
  },

  BusinessCenterBottomRightDoor: {
    BusinessCenter: true,
    BubbleMountainBottomLeftDoor: () => HasSpeed,
  },

  CathedralEntranceLeftDoor: {
    BusinessCenterTopRightDoor: true,
    CathedralEntranceMain: () => CanHellRun,
  },

  CathedralEntranceMain: {
    CathedralEntranceLeftDoor: () => CanHellRun,
    CathedralEntranceRightDoor: () => CanHellRun && (HasHiJump || CanFly || HasSpeed),
  },

  CathedralEntranceRightDoor: {
    Missiles_Cathedral: () => CanHellRun && CanOpenRedDoors,
    CathedralEntranceMain: () => CanHellRun,
  },

  EnergyTank_HiJump: {
    BusinessCenter: true,
    HiJumpBoots: () => HasMorph,
  },

  HiJumpBoots: {
    Missiles_HiJump: true,
  },

  Missiles_HiJump: {
    EnergyTank_HiJump: () => CanPassBombPassages,
  },

  Missiles_Cathedral: {
    CathedralEntranceRightDoor: () => CanHellRun,
    BubbleMountainMain: () => CanOpenGreenDoors && CanHellRun,
  },

  BubbleMountainMain: {
    BubbleMountainBottomLeftDoor: () => CanUsePowerBombs || CanUseBombs,
    Missiles_Cathedral: () => CanHellRun,
    Missiles_BubbleMountain: true,
    Missiles_SpeedBooster: () => CanHellRun,
    Door_LavaDive: () => CanHellRun,
    Missiles_NorfairReserve1: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  BubbleMountainBottomLeftDoor: {
    BubbleMountainMain: () => CanUsePowerBombs || CanUseBombs,
    BusinessCenterBottomRightDoor: () => HasSpeed,
    PreCrocomire: () => CanHellRun || TotalTanks >= 2,
  },

  Missiles_Wave: {
    BubbleMountainMain: () => CanHellRun,
    WaveBeam: () => CanHellRun,
  },

  WaveBeam: {
    BubbleMountainMain: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  Missiles_NorfairReserve1: {
    BubbleMountainMain: true,
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
    BubbleMountainMain: () => CanHellRun && CanDestroyBombWalls,
  },

  Door_LavaDive: {
    BubbleMountainMain: () => CanHellRun,
  },

  Missiles_SpeedBooster: {
    BubbleMountainMain: () => CanHellRun,
    SpeedBooster: true,
  },

  SpeedBooster: {
    Missiles_SpeedBooster: true,
  },

  Missiles_BubbleMountain: {
    BubbleMountainMain: true,
  },

  Door_KraidMouth: {
    BusinessCenter: () => SuperPacks >= 1,
  },

  IceBeam: {
    BusinessCenter: () => CanPassBombPassages && (HasVaria || TotalTanks >= 2),
  },

  Missiles_CrumbleShaft: {
    BusinessCenter: () => CanUsePowerBombs,
    PreCrocomire: () => HasVaria && HasSpeed,
  },

  PreCrocomire: {
    Door_CrocEntry: () => CanOpenGreenDoors,
    BubbleMountainBottomLeftDoor: () => CanHellRun || TotalTanks >= 2,
    //TODO: Probably remove HasIce
    Missiles_CrocEscape: () =>
      (CanHellRun || TotalTanks >= 2) &&
      (CanFly || HasGrapple || HasIce || (HasHiJump && (HasSpringBall || HasSpeed))),
  },

  Missiles_CrocEscape: {
    BusinessCenter: () => CanOpenGreenDoors,
    PreCrocomire: () => HasMorph && (HasVaria || TotalTanks >= 2),
  },

  Door_CrocEntry: {
    PreCrocomire: () => CanDefeatCrocomire,
  },
};
