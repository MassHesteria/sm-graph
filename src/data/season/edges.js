import { CommonEdgeUpdates } from "../common/edges";

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_Gauntlet_Pre_to_EnergyTank = {
  edges: ["PreGauntlet", "EnergyTank_Gauntlet"],
  requires: () =>
    CanUseBombs ||
    (HasMorph && PowerBombPacks >= 2) ||
    HasScrewAttack ||
    (TotalTanks >= 3 && HasSpeed),
};

const Crateria_Gauntlet_EnergyTank_to_BackSideLeftDoor = {
  edges: ["EnergyTank_Gauntlet", "GauntletBackSideLeftDoor"],
  requires: () =>
    CanUseBombs ||
    (HasMorph && PowerBombPacks >= 2) ||
    HasScrewAttack ||
    (TotalTanks >= 3 && HasSpeed),
};

const Crocomire_PostCroc_to_EnergyTank = {
  edges: ["PostCroc", "EnergyTank_Croc"],
  requires: () => HasSpaceJump || HasGrapple || TotalTanks >= 3 || (HasVaria && TotalTanks >= 1),
};

const RedBrinstar_Xray_Hallway_to_Scope = {
  edges: ["XrayHallway", "XrayScope"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (TotalTanks >= 6 && (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

const RedBrinstar_Xray_Scope_to_Hallway = {
  edges: ["XrayScope", "XrayHallway"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (TotalTanks >= 6 && (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

const WestMaridia_MamaTurtle_Missiles_to_EnergyTank = {
  edges: ["Missiles_MamaTurtle", "EnergyTank_MamaTurtle"],
  requires: () =>
    CanFly || (CanMoveInWestMaridia && HasSpeed) || (HasMorph && HasSpringBall) || HasGrapple,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonEdgeUpdates = CommonEdgeUpdates.concat([
  Crateria_Gauntlet_Pre_to_EnergyTank,
  Crateria_Gauntlet_EnergyTank_to_BackSideLeftDoor,
  Crocomire_PostCroc_to_EnergyTank,
  RedBrinstar_Xray_Hallway_to_Scope,
  RedBrinstar_Xray_Scope_to_Hallway,
  WestMaridia_MamaTurtle_Missiles_to_EnergyTank,
]);
