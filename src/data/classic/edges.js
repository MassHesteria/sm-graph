import { CommonEdgeUpdates } from "../common/edges";

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const UpperNorfair_BubbleMountain_Main_to_Reserve = {
  edges: ["BubbleMountainMain", "Missiles_NorfairReserve1"],
  requires: () => CanHellRun && (CanFly || HasGrapple || HasIce || HasSpringBall || HasHiJump),
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const ClassicEdgeUpdates = CommonEdgeUpdates.concat([
  UpperNorfair_BubbleMountain_Main_to_Reserve,
]);
