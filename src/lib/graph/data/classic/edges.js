import { CommonEdgeUpdates } from "../common/edges";

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const UpperNorfair_BubbleMountain_KingCacLedge_to_TopLeftDoor = {
  edges: ["BubbleMountainKingCacLedge", "BubbleMountainTopLeftDoor"],
  requires: () => HasGrapple || CanFly,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const ClassicEdgeUpdates = CommonEdgeUpdates.concat([
  UpperNorfair_BubbleMountain_KingCacLedge_to_TopLeftDoor,
]);
