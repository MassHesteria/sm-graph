import {
  BeamMode,
  MapLayout,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const VanillaPreset = {
  mapLayout: MapLayout.Vanilla,
  itemPoolParams: {
    numMajors: 34,
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 10, max: 10 },
      powerbombs: { min: 10, max: 10 },
    },
    extraMajors: [],
  },
  settings: {
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Vanilla,
  },
};
