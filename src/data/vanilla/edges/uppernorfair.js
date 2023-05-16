export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: (_) => true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: (_) => true,
    Door_KraidMouth: (samus) => samus.superPacks >= 1,
    IceBeam: (samus) => samus.canOpenGreenDoors && (samus.hasVaria || samus.energyTanks >= 3),
    Missiles_CrumbleShaft: (samus) =>
      samus.canUsePowerBombs && (samus.hasVaria || samus.energyTanks >= 2),
    Missiles_Cathedral: (samus) => samus.hasVaria || samus.energyTanks >= 3,
    EnergyTank_HiJump: (samus) => samus.canOpenRedDoors,
  },

  EnergyTank_HiJump: {
    BusinessCenter: (_) => true,
    HiJumpBoots: (samus) => samus.hasMorph,
  },

  HiJumpBoots: {
    EnergyTank_HiJump: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
    Missiles_HiJump: (_) => true,
  },

  Missiles_HiJump: {
    EnergyTank_HiJump: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  Missiles_Cathedral: {
    BusinessCenter: (samus) =>
      (samus.hasVaria || samus.energyTanks >= 3) &&
      (samus.canUseBombs || samus.canUsePowerBombs || samus.hasSpringBall || samus.hasSpaceJump),
    BubbleMountain: (samus) =>
      samus.canOpenGreenDoors && (samus.hasVaria || samus.energyTanks >= 3),
  },

  BubbleMountain: {
    BusinessCenter: (samus) => samus.hasSpeed,
    Missiles_Cathedral: (samus) => samus.hasVaria || samus.energyTanks >= 3,
    Missiles_BubbleMountain: (_) => true,
    Missiles_SpeedBooster: (_) => true,
    PreCrocomire: (_) => true,
    Door_LavaDive: (_) => true,
    Missiles_NorfairReserve1: (samus) =>
      (samus.hasVaria || samus.energyTanks >= 3) && (samus.hasHiJump || samus.canFly),
    Missiles_Wave: (_) => true,
  },

  Missiles_Wave: {
    BubbleMountain: (_) => true, // TODO
    WaveBeam: (_) => true, // TODO
  },

  WaveBeam: {
    Missiles_Wave: (_) => true, // TODO
  },

  Missiles_NorfairReserve1: {
    BubbleMountain: (_) => true, // TODO
    Missiles_NorfairReserve2: (_) => true, // TODO
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: (_) => true, // TODO
    ReserveTank_Norfair: (_) => true, // TODO
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: (_) => true, // TODO
  },

  Door_SingleChamber: {
    BubbleMountain: (_) => true, // TODO
  },

  Door_LavaDive: {
    BubbleMountain: (_) => true, // TODO
  },

  Missiles_SpeedBooster: {
    BubbleMountain: (_) => true, // TODO
    SpeedBooster: (_) => true, // TODO
  },

  SpeedBooster: {
    Missiles_SpeedBooster: (_) => true, // TODO
  },

  Missiles_BubbleMountain: {
    BubbleMountain: (_) => true,
  },

  Door_KraidMouth: {
    BusinessCenter: (samus) => samus.superPacks >= 1,
  },

  IceBeam: {
    BusinessCenter: (samus) => samus.canUseBombs || samus.canUsePowerBombs,
  },

  Missiles_CrumbleShaft: {
    BusinessCenter: (samus) => samus.canUsePowerBombs,
    PreCrocomire: (samus) => samus.hasVaria && samus.hasSpeed,
  },

  PreCrocomire: {
    Door_CrocEntry: (samus) => samus.canOpenGreenDoors,
    BubbleMountain: (samus) => samus.hasVaria || samus.energyTanks >= 2,
    Missiles_CrocEscape: (samus) =>
      (samus.hasVaria || samus.energyTanks >= 3) &&
      (samus.hasSpaceJump || samus.hasGrapple || (samus.hasSpeed && samus.hasHiJump)),
  },

  Missiles_CrocEscape: {
    BusinessCenter: (samus) => samus.canOpenGreenDoors,
    PreCrocomire: (samus) => samus.hasMorph,
  },

  Door_CrocEntry: {
    PreCrocomire: (samus) => samus.canDefeatCrocomire,
  },
};
