import { canReachStart, canReachVertex, searchAndCache } from "./search";

class GraphSolver {
  constructor(graph, getFlags, logMethods) {
    this.graph = graph;
    this.getFlags = getFlags;
    this.startVertex = graph[0].from;
    if (logMethods != undefined) {
      this.printAvailableItems = logMethods.printAvailableItems;
      this.printCollectedItems = logMethods.printCollectedItems;
      this.printDefeatedBoss = logMethods.printDefeatedBoss;
      this.printUncollectedItems = logMethods.printUncollectedItems;
      this.printMsg = logMethods.printMsg;
    }
  }

  checkFlags(load, bossData) {
    const {
      CanUseBombs,
      CanUsePowerBombs,
      CanOpenRedDoors,
      CanOpenGreenDoors,
      HasCharge,
      HasDoubleJump,
      HasGravity,
      HasGrapple,
      HasHeatShield,
      HasHiJump,
      HasIce,
      HasMorph,
      HasPlasma,
      HasPressureValve,
      HasScrewAttack,
      HasSpazer,
      HasSpaceJump,
      HasSpeed,
      HasSpringBall,
      HasVaria,
      HasWave,
      EnergyTanks,
      MissilePacks,
      PowerBombPacks,
      SuperPacks,
      TotalTanks,
      HellRunTanks,
      CanFly,
      CanHellRun,
      CanDoSuitlessMaridia,
      CanPassBombPassages,
      CanDestroyBombWalls,
      CanMoveInWestMaridia,
      CanKillKraid,
      CanKillPhantoon,
      CanKillDraygon,
      CanKillRidley,
      CanKillSporeSpawn,
      CanKillCrocomire,
      CanKillBotwoon,
      CanKillGoldTorizo,
    } = this.getFlags(load);

    const { HasDefeatedKraid, HasDefeatedPhantoon, HasDefeatedDraygon, HasDefeatedRidley } =
      bossData;

    return (condition) => eval(`(${condition.toString()})()`);
  }

  isVertexAvailable(vertex, load, item, legacyMode = false) {
    //TODO: solve boss data?

    const bossData = {
      HasDefeatedKraid: false,
      HasDefeatedPhantoon: false,
      HasDefeatedDraygon: false,
      HasDefeatedRidley: false,
    };

    if (!canReachVertex(this.graph, this.startVertex, vertex, this.checkFlags(load, bossData))) {
      return false;
    }
    if (legacyMode || item == undefined) {
      return canReachVertex(this.graph, vertex, this.startVertex, this.checkFlags(load, bossData));
    }
    let temp = load.clone();
    temp.add(item);
    return canReachVertex(this.graph, vertex, this.startVertex, this.checkFlags(temp, bossData));
  }

  isValid(initLoad, legacyMode = false) {
    let samus = initLoad.clone();

    const bossData = {
      HasDefeatedKraid: false,
      HasDefeatedPhantoon: false,
      HasDefeatedDraygon: false,
      HasDefeatedRidley: false,
    };

    const bossVertices = {
      Kraid: this.graph.find((n) => n.to.name == "Boss_Kraid").to,
      Phantoon: this.graph.find((n) => n.to.name == "Boss_Phantoon").to,
      Draygon: this.graph.find((n) => n.to.name == "Boss_Draygon").to,
      Ridley: this.graph.find((n) => n.to.name == "Boss_Ridley").to,
    };

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, this.checkFlags(samus, bossData));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // ship. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectEasyItems = (itemLocations) => {
      let items = [];

      itemLocations.forEach((p) => {
        if (legacyMode) {
          if (!canReachStart(this.graph, p, this.checkFlags(samus, bossData))) {
            return;
          }
          samus.add(p.item);
        } else {
          const load = samus.clone();
          load.add(p.item);
          if (!canReachStart(this.graph, p, this.checkFlags(load, bossData))) {
            return;
          }
          samus = load;
        }

        items.push(p.item);
        p.item = undefined;
      });

      if (items.length == 0) {
        if (this.printUncollectedItems != undefined) {
          this.printUncollectedItems(this.graph);
        }
        throw new Error("no round trip locations");
      } else if (this.printCollectedItems) {
        this.printCollectedItems(items);
      }

      return true;
    };

    try {
      while (true) {
        const all = findAll();
        const uncollected = all.filter((v) => v.item != undefined);
        if (uncollected.length == 0) {
          break;
        }
        if (this.printAvailableItems != undefined) {
          this.printAvailableItems(uncollected);
        }

        //-----------------------------------------------------------------
        // Determines if the graph would allow a round trip from the
        // specified vertex to the starting vertex.
        //-----------------------------------------------------------------

        const hasRoundTrip = (vertex) => {
          if (!all.includes(vertex)) {
            return false;
          }

          return canReachStart(this.graph, vertex, this.checkFlags(samus, bossData));
        };

        // Update defeated boss flags. Assume that if we can get to the boss
        // and back to the start that we have defeated the boss since the
        // logic for killing the boss is considered leaving the boss.
        if (!bossData.HasDefeatedKraid) {
          bossData.HasDefeatedKraid = hasRoundTrip(bossVertices.Kraid);
          if (bossData.HasDefeatedKraid && this.printDefeatedBoss != undefined) {
            this.printDefeatedBoss("Defeated Kraid");
          }
        }
        if (!bossData.HasDefeatedPhantoon) {
          bossData.HasDefeatedPhantoon = hasRoundTrip(bossVertices.Phantoon);
          if (bossData.HasDefeatedPhantoon && this.printDefeatedBoss != undefined) {
            this.printDefeatedBoss("Defeated Phantoon");
          }
        }
        if (!bossData.HasDefeatedDraygon) {
          bossData.HasDefeatedDraygon = hasRoundTrip(bossVertices.Draygon);
          if (bossData.HasDefeatedDraygon && this.printDefeatedBoss != undefined) {
            this.printDefeatedBoss("Defeated Draygon");
          }
        }
        if (!bossData.HasDefeatedRidley) {
          bossData.HasDefeatedRidley = hasRoundTrip(bossVertices.Ridley);
          if (bossData.HasDefeatedRidley && this.printDefeatedBoss != undefined) {
            this.printDefeatedBoss("Defeated Ridley");
          }
        }

        // Collect all items where we can make a round trip back to the start
        if (collectEasyItems(uncollected)) {
          continue;
        }

        throw new Error("one way ticket");
      }

      //-----------------------------------------------------------------
      // Check for uncollected items. This indicates an invalid graph.
      //-----------------------------------------------------------------

      if (this.graph.filter((n) => n.from.item != undefined).length > 0) {
        if (this.printUncollectedItems != undefined) {
          this.printUncollectedItems(this.graph);
        }
        throw new Error("Uncollected items");
      }
    } catch (e) {
      if (this.printMsg) {
        this.printMsg(e);
      }
      return false;
    }
    return true;
  }
}

export default GraphSolver;
