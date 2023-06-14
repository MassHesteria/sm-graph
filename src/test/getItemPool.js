import { ClassicPreset } from "../lib/graph/data/classic/preset";
import { RecallPreset } from "../lib/graph/data/recall/preset";
import { SeasonPreset } from "../lib/graph/data/season/preset";
import ModeStandard from "../lib/modes/modeStandard";
import ModeRecall from "../lib/modes/modeRecall";
import { getLocations } from "../lib/locations";
import { getItemPool } from "../lib/graph/items";

export const UnitTest_getItemPool = (quiet) => {
  const showItem = (i) => console.log(i.name);
  const print = (msg) => {
    if (!quiet) {
      console.log(msg);
    }
  };

  const compare = (title, seed, orig, itemPoolParams) => {
    print("---- New ----");
    const uni = getItemPool(
      seed,
      itemPoolParams.majorDistribution,
      itemPoolParams.minorDistribution
    );

    print("---- Old ----");
    const old = orig(seed);

    //uni.forEach(showItem);
    //old.forEach(showItem);

    print("---- Results ----");
    if (uni.length != old.length) {
      console.log(`${title} different length ${seed}`);
      return false;
    } else {
      for (let j = 0; j < uni.length; j++) {
        if (uni[j].name != old[j].name) {
          console.log(`${title} mismatch ${seed}, uni: ${uni[j].name}, old ${old[j].name}`);
          return false;
        }
      }
    }
    console.log(`match ${seed}`);
    return true;
  };

  const testSeed = (seed) => {
    if (
      !compare(
        "Classic",
        seed,
        new ModeStandard(seed, getLocations()).setupItemPool,
        ClassicPreset.itemPoolParams
      )
    ) {
      process.exit(1);
    }
    if (
      !compare(
        "Recall",
        seed,
        new ModeRecall(seed, getLocations()).setupItemPool,
        RecallPreset.itemPoolParams
      )
    ) {
      process.exit(1);
    }
    //if (!compare("Season", seed, getSeasonItemPool, SeasonPreset.itemPoolParams)) {
    //process.exit(1);
    //}
  };

  for (let i = 1; i <= 1000; i++) {
    testSeed(i);
  }
};
