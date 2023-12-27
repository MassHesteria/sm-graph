import { canReachStart, searchAndCache } from "./search";
import { isFungible } from "../items";
import { cloneGraph } from "./init";
import { MajorDistributionMode } from "./params";
import {
  addItem,
  checkFlags,
  cloneLoadout,
  copyLoadout,
  createLoadout
} from "../loadout";

export const isGraphValid = (graph, settings, loadout, logger) => {
  const solver = new GraphSolver(graph, settings, logger);
  return solver.isValid(loadout);
};

export const getItemProgression = (graph, settings, loadout) => {
  const initLoad = loadout != undefined ? loadout : createLoadout();
  const solver = new GraphSolver(cloneGraph(graph), settings);
  solver.trackProgression = true;
  if (!solver.isValid(initLoad)) {
    return [];
  }
  return solver.progression;
}

const revSolve = (solver, load, node) => {
  // Setup a graph with the item location as the start vertex
  const clonedGraph = cloneGraph(solver.graph);
  clonedGraph.forEach((e) => (e.from.pathToStart = false));
  const clonedVertex = clonedGraph.find(
    (e) => e.from.name == node.name
  ).from;
  clonedVertex.pathToStart = true;

  // Create a solver for the new graph
  const reverseSolver = new GraphSolver(clonedGraph, solver.settings);
  reverseSolver.startVertex = clonedVertex;

  try {
    if (reverseSolver.isValid(load)) {
      return true;
    }
  } catch (e) {
  }
  return false;
};

class GraphSolver {
  constructor(graph, settings, logMethods) {
    this.graph = graph;
    this.settings = settings;
    this.startVertex = graph[0].from;
    this.trackProgression = false;
    this.progression = [];
    if (settings.majorDistribution == MajorDistributionMode.Chozo) {
      this.graph.forEach(n => {
        if (n.from.item != undefined && n.from.type == "minor") {
          n.from.item = undefined;
        }
      });
    }
    if (logMethods != undefined) {
      this.printAvailableItems = logMethods.printAvailableItems;
      this.printCollectedItems = logMethods.printCollectedItems;
      this.printDefeatedBoss = logMethods.printDefeatedBoss;
    }
  }

  recordProgression(itemNode) {
    if (!this.trackProgression) {
      return;
    }
    let locationName = itemNode.name;

    if (itemNode.type == "boss") {
      const bossName = itemNode.name.substring(5)
      locationName = `${bossName} @ ${itemNode.area}`;
    }

    this.progression.push({
      itemName: itemNode.item.name,
      itemType: itemNode.item.type,
      locationName: locationName,
      isMajor: itemNode.item.isMajor,
    })
  }

  isValid(initLoad) {
    let samus = cloneLoadout(initLoad);
    let collected = [];

    this.progression = [];

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, checkFlags(samus));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // ship. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectItem = (p) => {
      this.recordProgression(p);
      if (this.printDefeatedBoss && p.type == "boss") {
        this.printDefeatedBoss(`Defeated ${p.item.name} (${p.name}) in ${p.area}`);
      }
      p.item = undefined;
    }

    const collectEasyItems = (itemLocations) => {
      const load = cloneLoadout(samus);

      collected.length = 0;

      itemLocations.forEach((p) => {
        addItem(load, p.item.type);
        if (!canReachStart(this.graph, p, checkFlags(load))) {
          copyLoadout(load, samus);
          return;
        }
        addItem(samus, p.item.type);
        collected.push(p.item);
        collectItem(p);
      });

      if (collected.length > 0) {
        return true;
      }

      //-----------------------------------------------------------------
      // Utility function that determines if collecting an available
      // item that does not have a round trip to the starting vertex
      // would result in a valid graph.
      //-----------------------------------------------------------------

      const reverseSolve = (filtered) => {
        const p = filtered.find(n => revSolve(this, samus, n));

        if (p == undefined) {
          return false;
        }

        // Collect the item
        addItem(samus, p.item.type);
        collected.push(p.item);
        collectItem(p);
        return true;
      };

      //-----------------------------------------------------------------
      // Try to reverse solve the majors first and then the rest.
      //-----------------------------------------------------------------

      if (reverseSolve(itemLocations.filter((p) => !isFungible(p.item.type)))) {
        return true;
      }
      if (reverseSolve(itemLocations.filter((p) => isFungible(p.item.type)))) {
        return true;
      }

      return false;
    };

    while (true) {
      const all = findAll();
      const uncollected = all.filter((v) => v.item != undefined);
      if (uncollected.length == 0) {
        break;
      }
      if (this.printAvailableItems != undefined) {
        this.printAvailableItems(uncollected);
      }

      // Collect all items where we can make a round trip back to the start
      if (!collectEasyItems(uncollected)) {
        return false;
      }

      if (this.printCollectedItems) {
        this.printCollectedItems(collected);
      }
    }

    //-----------------------------------------------------------------
    // Check for uncollected items. This indicates an invalid graph.
    //-----------------------------------------------------------------

    return !this.graph.some((n) => n.from.item != undefined);
  }
}