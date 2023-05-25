export const getRecallFlags = (load) => {
  return {
    CanUseBombs: load.canUseBombs,
    CanUsePowerBombs: load.canUsePowerBombs,
    CanOpenRedDoors: load.canOpenRedDoors,
    CanOpenGreenDoors: load.canOpenGreenDoors,
    HasDoubleJump: load.hasDoubleJump,
    HasGravity: load.hasGravity,
    HasGrapple: load.hasGrapple,
    HasHeatShield: load.hasHeatShield,
    HasHiJump: load.hasHiJump,
    HasIce: load.hasIce,
    HasMorph: load.hasMorph,
    HasPlasma: load.hasPlasma,
    HasPressureValve: load.hasPressureValve,
    HasScrewAttack: load.hasScrewAttack,
    HasSpaceJump: load.hasSpaceJump,
    HasSpazer: load.hasSpazer,
    HasSpeed: load.hasSpeed,
    HasSpringBall: load.hasSpringBall,
    HasVaria: load.hasVaria,
    TotalTanks: load.totalTanks,
    CanFly: load.canFly,
    CanHellRun:
      load.totalTanks >= 4 ||
      (load.hasGravity && load.totalTanks >= 3) ||
      load.hasVaria ||
      load.hasHeatShield,
    CanDoSuitlessMaridia: load.hasHiJump && load.hasGrapple && (load.hasIce || load.hasSpringBall),
    CanPassBombPassages: load.canPassBombPassages,
    CanDestroyBombWalls: load.canDestroyBombWalls,
    CanMoveInWestMaridia: load.hasGravity || load.hasPressureValve,
  };
};
