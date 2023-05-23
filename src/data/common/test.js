const canHellRun = (samus) => {
  return samus.totalTanks >= 4 || (samus.totalTanks >= 3 && samus.hasGravity) || samus.hasVaria;
};

const UpperNorfair_CathedralEntrance_Main_to_TopRightDoor = {
  edges: ["CathedralEntranceMain", "CathedralEntranceRightDoor"],
  requires: (samus) => canHellRun(samus),
};

const UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank = {
  edges: ["Missiles_HiJump", "EnergyTank_HiJump"],
  requires: (samus) => samus.hasMorph,
};

export const CommonLogicUpdates = [
  UpperNorfair_CathedralEntrance_Main_to_TopRightDoor,
  UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank,
];
