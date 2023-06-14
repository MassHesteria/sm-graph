import {
  BeamMode,
  MapLayout,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const ClassicPreset = {
  mapLayout: MapLayout.DashClassic,
  itemPoolParams: {
    numMajors: 34,
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 12, max: 18 },
      powerbombs: { min: 14, max: 20 },
    },
    extraMajors: [],
  },
  settings: {
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
  },
};
