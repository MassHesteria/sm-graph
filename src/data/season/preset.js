import { BeamMode, MapLayout, MinorDistributionMode } from "../../params";

export const SeasonPreset = {
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    numMajors: 34,
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 3,
      supers: 2,
      powerbombs: 1,
    },
    extraMajors: [],
  },
  settings: {
    beamMode: BeamMode.Vanilla,
  },
};
