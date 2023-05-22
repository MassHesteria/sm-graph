const canHellRun = (samus) => {
  return samus.totalTanks >= 4 || samus.hasVaria;
};

const UpperNorfair_CathedralEntrance_Main_to_TopRightDoor = {
  edges: ["CathedralEntranceMain", "CathedralEntranceRightDoor"],
  requires: (samus) => canHellRun(samus),
};

export const CommonLogicUpdates = [UpperNorfair_CathedralEntrance_Main_to_TopRightDoor];
