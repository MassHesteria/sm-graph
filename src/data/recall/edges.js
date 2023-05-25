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

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const RecallEdgeUpdates = CommonEdgeUpdates.concat([
  Crocomire_PostCroc_to_IndianaJones,
  LowerNorfair_WorstRoom_Bottom_to_Top,
  WreckedShip_Bowling_Missiles_to_Reserve,
]);
