//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const canHellRun = (samus) => {
  return samus.totalTanks >= 4 || (samus.totalTanks >= 3 && samus.hasGravity) || samus.hasVaria;
};

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_ConstructionZoneToTacoTank = {
  edges: ["ConstructionZone", "TacoTankRoom"],
  requires: (_) => true,
};

const RedBrinstar_RedBrinstarElevatorRoomToPreMoat = {
  edges: ["RedBrinstarElevatorRoom", "Door_RedElevator"],
  requires: (_) => true,
};

const RedBrinstar_RedTower_Bottom_to_Mid = {
  edges: ["RedTowerBottom", "RedTowerMid"],
  requires: (_) => true,
};

const UpperNorfair_CathedralEntrance_Main_to_TopRightDoor = {
  edges: ["CathedralEntranceMain", "CathedralEntranceRightDoor"],
  requires: (samus) => canHellRun(samus),
};

const UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank = {
  edges: ["Missiles_HiJump", "EnergyTank_HiJump"],
  requires: (samus) => samus.hasMorph,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const CommonLogicUpdates = [
  Crateria_ConstructionZoneToTacoTank,
  RedBrinstar_RedBrinstarElevatorRoomToPreMoat,
  RedBrinstar_RedTower_Bottom_to_Mid,
  UpperNorfair_CathedralEntrance_Main_to_TopRightDoor,
  UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank,
];
