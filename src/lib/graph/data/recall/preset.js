import { Item } from "../../../items";
import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "../../params";

export const Preset_Recall_MM = {
  title: "Recall M/M",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Recall,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_RecallV2_MM = {
  title: "Recall v2 M/M",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Recall,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.New,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_RecallV2_Full = {
  title: "Recall v2 Full",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.New,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Recall_Full = {
  title: "Recall Full",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};
