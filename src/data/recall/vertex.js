import { CommonVertexUpdates } from "../common/vertex";

//-----------------------------------------------------------------
// Vertex definitions.
//-----------------------------------------------------------------

const LowerNorfair_Missiles_MickeyMouse = {
  name: "Missiles_MickeyMouse",
  type: "major",
};

const Kraid_EnergyTank = {
  name: "EnergyTank_Kraid",
  type: "minor",
};

const WreckedShip_Missiles_Sky = {
  name: "Missiles_Sky",
  type: "major",
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const RecallVertexUpdates = CommonVertexUpdates.concat([
  Kraid_EnergyTank,
  LowerNorfair_Missiles_MickeyMouse,
  WreckedShip_Missiles_Sky,
]);
