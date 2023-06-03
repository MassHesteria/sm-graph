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
    Missiles_BubbleMountain: true,
    BubbleMountainKingCacLedge: true,
    BubbleMountainTopLeftDoor: () => CanFly || HasIce || HasSpringBall || HasHiJump,
    BubbleMountainBottomLeftDoor: () => CanPassBombPassages,
    Missiles_Cathedral: () => CanHellRun,
  },

  BubbleMountainKingCacLedge: {
    BubbleMountainMain: true,
    BubbleMountainTopLeftDoor: true, //NOTE: dboost in logic
    Missiles_SpeedBooster: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
    KronicBoostTop: () => CanHellRun,
  },

  BubbleMountainTopLeftDoor: {
    BubbleMountainMain: true,
    BubbleMountainKingCacLedge: true, //TODO: update?
    Missiles_NorfairReserve1: () => CanOpenGreenDoors && CanHellRun,
  },

  BubbleMountainBottomLeftDoor: {
    BubbleMountainMain: () => CanPassBombPassages,
    BusinessCenterBottomRightDoor: () => HasSpeed,
    NutellaRefill: () => (CanHellRun || TotalTanks >= 2) && (HasWave || CanOpenGreenDoors),
    KronicBoostTop: () => CanHellRun,
  },

  KronicBoostTop: {
    BubbleMountainKingCacLedge: () => CanHellRun, //TODO: need to require more than normal tanks
    BubbleMountainBottomLeftDoor: () => CanHellRun,
    NutellaRefill: () =>
      HasMorph && (HasWave || CanOpenGreenDoors) && (HasGrapple || HasSpaceJump) && CanHellRun,
    Door_LavaDive: () => CanUsePowerBombs && CanHellRun,
  },

  NutellaRefill: {
    BubbleMountainBottomLeftDoor: () => CanHellRun || TotalTanks >= 2,
    KronicBoostTop: () => CanHellRun && HasMorph && (HasGrapple || HasSpaceJump),
    PreCrocomire: () => CanHellRun || TotalTanks >= 2,
  },

  Missiles_Wave: {
    BubbleMountainKingCacLedge: () => CanHellRun,
    WaveBeam: () => CanHellRun,
  },

  WaveBeam: {
    BubbleMountainKingCacLedge: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  Missiles_NorfairReserve1: {
    BubbleMountainTopLeftDoor: () => CanHellRun,
    Missiles_NorfairReserve2: () => CanHellRun,
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: () => CanHellRun,
    ReserveTank_Norfair: () => CanHellRun,
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: () => CanHellRun,
  },

  Door_SingleChamber: {
    BubbleMountainKingCacLedge: () => CanHellRun && CanDestroyBombWalls,
  },

  Door_LavaDive: {
    KronicBoostTop: () => CanHellRun,
  },

  Missiles_SpeedBooster: {
    BubbleMountainKingCacLedge: () => CanHellRun,
    SpeedBooster: () => CanHellRun,
  },

  SpeedBooster: {
    Missiles_SpeedBooster: () => CanHellRun,
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
    NutellaRefill: () => CanHellRun || TotalTanks >= 2,
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
    PreCrocomire: true,
  },
};
