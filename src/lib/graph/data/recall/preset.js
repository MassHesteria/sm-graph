import { Item } from "../../../items";
import {
  BeamMode,
  MapLayout,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const RecallPreset = {
  mapLayout: MapLayout.DashRecall,
  itemPoolParams: {
    numMajors: 36,
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 15, max: 18 },
      powerbombs: { min: 15, max: 18 },
    },
    extraMajors: [
      Item.DoubleJump,
      Item.PressureValve,
      Item.HeatShield,
      Item.BeamUpgrade,
      Item.BeamUpgrade,
      Item.BeamUpgrade,
      Item.BeamUpgrade,
    ],
  },
  settings: {
    beamMode: BeamMode.DashRecallV1,
    suitMode: SuitMode.Dash,
  },
};
