import { CommonEdgeUpdates } from "../common/edges";

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crocomire_PostCroc_to_IndianaJones = {
  edges: ["PostCroc", "Missiles_IndianaJones"],
  requires: () => CanFly || (CanUsePowerBombs && HasSpeed),
};

const LowerNorfair_WorstRoom_Bottom_to_Top = {
  edges: ["WorstRoomBottom", "WorstRoomTop"],
  requires: () =>
    (HasScrewAttack && (HasSpaceJump || HasDoubleJump)) ||
    (CanUsePowerBombs && (CanFly || HasSpringBall || HasHiJump || HasDoubleJump)),
};

const WreckedShip_Bowling_Missiles_to_Reserve = {
  edges: ["Missiles_Bowling", "ReserveTank_Ship"],
  requires: () => CanUsePowerBombs,
};

const WestMaridia_MainStreet_to_OasisBottom = {
  edges: ["MainStreet", "OasisBottom"],
  requires: () => CanOpenRedDoors && CanMoveInWestMaridia,
};

const WestMaridia_OasisBottom_to_MainStreet = {
  edges: ["OasisBottom", "MainStreet"],
  requires: () => CanMoveInWestMaridia,
};

const EastMaridia_OasisBottom_to_SpringBall = {
  edges: ["OasisBottom", "SpringBall"],
  requires: () => CanMoveInWestMaridia && CanUsePowerBombs,
};

const EastMaridia_SpringBall_to_OasisBottom = {
  edges: ["SpringBall", "OasisBottom"],
  requires: () => CanMoveInWestMaridia && HasMorph,
};

const EastMaridia_PlasmaSparkRoomTop_to_PrePlasmaBeam = {
  edges: ["PlasmaSparkRoomTop", "PrePlasmaBeam"],
  requires: true,
};

const EastMaridia_PlasmaBeam_to_PrePlasmaBeam = {
  edges: ["PlasmaBeam", "PrePlasmaBeam"],
  requires: true,
};

const EastMaridia_BotwoonHallway_Left_to_Right = {
  edges: ["BotwoonHallwayLeft", "BotwoonHallwayRight"],
  requires: () => (HasGravity && HasSpeed) || HasIce || HasSpazer,
};

const GreenBrinstar_ChargeBeam_to_Waterway = {
  edges: ["ChargeBeam", "EnergyTank_Waterway"],
  requires: () => CanUsePowerBombs && CanOpenRedDoors && (HasSpeed || HasSpazer),
};

const RedBrinstar_Xray_Hallway_to_Item = {
  edges: ["XrayHallway", "XrayScope"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (((HasHiJump && HasSpeed) || HasIce || HasDoubleJump) && TotalTanks >= 4)),
};

const RedBrinstar_Xray_Item_to_Hallway = {
  edges: ["XrayScope", "XrayHallway"],
  requires: () =>
    (CanUseBombs || CanUsePowerBombs) &&
    (HasSpaceJump ||
      HasGrapple ||
      (((HasHiJump && HasSpeed) || HasIce || HasDoubleJump) && TotalTanks >= 4)),
};

const WestMaridia_MamaTurtle_to_EnergyTank = {
  edges: ["Missiles_MamaTurtle", "EnergyTank_MamaTurtle"],
  requires: () => CanFly || HasGrapple || HasSpeed || HasDoubleJump,
};

const UpperNorfair_PreCrocomire_to_CrocEscape = {
  edges: ["PreCrocomire", "Missiles_CrocEscape"],
  requires: () => CanHellRun && (CanFly || HasGrapple || HasDoubleJump || (HasHiJump && HasSpeed)),
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const RecallEdgeUpdates = CommonEdgeUpdates.concat([
  Crocomire_PostCroc_to_IndianaJones,
  LowerNorfair_WorstRoom_Bottom_to_Top,
  WreckedShip_Bowling_Missiles_to_Reserve,
  WestMaridia_MainStreet_to_OasisBottom,
  WestMaridia_OasisBottom_to_MainStreet,
  EastMaridia_OasisBottom_to_SpringBall,
  EastMaridia_SpringBall_to_OasisBottom,
  EastMaridia_PlasmaBeam_to_PrePlasmaBeam,
  EastMaridia_PlasmaSparkRoomTop_to_PrePlasmaBeam,
  GreenBrinstar_ChargeBeam_to_Waterway,
  EastMaridia_BotwoonHallway_Left_to_Right,
  RedBrinstar_Xray_Hallway_to_Item,
  RedBrinstar_Xray_Item_to_Hallway,
  WestMaridia_MamaTurtle_to_EnergyTank,
  UpperNorfair_PreCrocomire_to_CrocEscape,
]);
