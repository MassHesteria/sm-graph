import { vanillaVertices } from "./data/vanilla/vertex";
import { crateriaEdges } from "./data/vanilla/edges/crateria";
import { greenbrinstarEdges } from "./data/vanilla/edges/greenbrinstar";
import { redbrinstarEdges } from "./data/vanilla/edges/redbrinstar";
import { kraidslairEdges } from "./data/vanilla/edges/kraid";
import { crocomireEdges } from "./data/vanilla/edges/crocomire";
import { westmaridiaEdges } from "./data/vanilla/edges/westmaridia";
import { eastmaridiaEdges } from "./data/vanilla/edges/eastmaridia";
import { uppernorfairEdges } from "./data/vanilla/edges/uppernorfair";
import { lowernorfairEdges } from "./data/vanilla/edges/lowernorfair";
import { wreckedshipEdges } from "./data/vanilla/edges/wreckedship";
import { bossEdges } from "./data/vanilla/edges/boss";
import { MapLayout, MajorDistributionMode } from "./params";
import { SeasonVertexUpdates } from "./data/season/vertex";
import { RecallVertexUpdates } from "./data/recall/vertex";
import { SeasonEdgeUpdates } from "./data/season/edges";
import { RecallEdgeUpdates } from "./data/recall/edges";
import { RecallAreaEdgeUpdates } from "./data/recall/area";
import { SeasonAreaEdgeUpdates } from "./data/season/area";
import { mapPortals } from "./data/portals";
import { bossItem, Item } from "../items";

const getVanillaEdges = () => {
  return {
    Crateria: crateriaEdges,
    GreenBrinstar: greenbrinstarEdges,
    RedBrinstar: redbrinstarEdges,
    KraidsLair: kraidslairEdges,
    Crocomire: crocomireEdges,
    WestMaridia: westmaridiaEdges,
    EastMaridia: eastmaridiaEdges,
    UpperNorfair: uppernorfairEdges,
    LowerNorfair: lowernorfairEdges,
    WreckedShip: wreckedshipEdges,
    Bosses: bossEdges,
  };
};

const getAllVertices = () => {
  const getItem = (name, type) => {
    if (type != "boss") {
      return undefined;
    }
    switch (name) {
      case "Boss_Kraid":
        return bossItem(Item.DefeatedKraid);
      case "Boss_Phantoon":
        return bossItem(Item.DefeatedPhantoon);
      case "Boss_Draygon":
        return bossItem(Item.DefeatedDraygon);
      case "Boss_Ridley":
        return bossItem(Item.DefeatedRidley);
      default:
        return undefined;
    }
  };
  return Object.entries(vanillaVertices)
    .map(([k, v]) => {
      return Object.entries(v).map(([name, type]) => {
        return {
          name: name,
          type: type,
          area: k,
          item: getItem(name, type),
          pathToStart: false,
        };
      });
    })
    .reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
};

const allEdges = Object.entries(getVanillaEdges())
  .map(([_, v]) => {
    return Object.entries(v)
      .map(([from, w]) => {
        return Object.entries(w).map(([to, condition]) => {
          return {
            from: from,
            to: to,
            condition: condition,
          };
        });
      })
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, []);
  })
  .reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

export const createGraph = (
  portalMapping,
  vertexUpdates,
  edgeUpdates,
  startVertex
) => {
  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const allVertices = getAllVertices();

  const findVertex = (name) => {
    const vertex = allVertices.find((v) => v.name == name);
    if (vertex == undefined) {
      throw new Error(`createGraph: could not find vertex, ${name}`);
    }
    return vertex;
  };

  //-----------------------------------------------------------------
  // Apply specified vertex updates. Currently restricted to type
  // but may include other options eventually.
  //-----------------------------------------------------------------

  vertexUpdates.forEach((v) => {
    findVertex(v.name).type = v.type;
  });

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  if (startVertex != undefined) {
    findVertex(startVertex).pathToStart = true;
  } else {
    findVertex("Ship").pathToStart = true;
  }

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const edges = allEdges
    .map((e) => {
      return {
        from: findVertex(e.from),
        to: findVertex(e.to),
        condition: e.condition,
      };
    })
    .concat(
      portalMapping.map((a) => {
        return {
          from: findVertex(a[0]),
          to: findVertex(a[1]),
          condition: true,
        };
      })
    )
    .concat(
      portalMapping.map((a) => {
        return {
          from: findVertex(a[1]),
          to: findVertex(a[0]),
          condition: true,
        };
      })
    );

  //-----------------------------------------------------------------
  // Apply specified edge updates. This could simply be a logic
  // change or could include edits to the map.
  //-----------------------------------------------------------------

  edgeUpdates.forEach((c) => {
    const [from, to] = c.edges;
    const edge = edges.find((n) => n.from.name == from && n.to.name == to);
    if (edge == null) {
      throw new Error(`Could not find edge from ${from} to ${to}`);
    }
    edge.condition = c.requires;
  });

  //-----------------------------------------------------------------
  // Update boss areas.
  //-----------------------------------------------------------------

  //const updateArea = (entry, newArea) => {

  //}

  return edges;
};

export const cloneGraph = (graph) => {
  const newVertices = getAllVertices();
  const remap = (vertex) => {
    return newVertices.find((v) => v.name == vertex.name);
  };

  newVertices.forEach((v) => {
    const orig = graph.map((o) => o.from).find((t) => t.name == v.name);
    v.type = orig.type;
    v.area = orig.area;
    v.pathToStart = orig.pathToStart;
    if (orig.item != undefined) {
      v.item = {
        type: orig.item.type,
        name: orig.item.name,
        isMajor: orig.item.isMajor,
        spoilerAddress: orig.item.spoilerAddress,
      };
    }
  });

  return graph.map((e) => {
    return {
      from: remap(e.from),
      to: remap(e.to),
      condition: e.condition,
    };
  });
};

const getEdgeUpdates = (mapLayout, areaShuffle) => {
  switch (mapLayout) {
    case MapLayout.Vanilla:
      if (areaShuffle) {
        throw new Error("Unsupport vanilla area shuffle");
      }
      return [];
    case MapLayout.Recall:
      if (areaShuffle) {
        return RecallAreaEdgeUpdates;
      }
      return RecallEdgeUpdates;
    default:
      if (areaShuffle) {
        return SeasonAreaEdgeUpdates;
      }
      return SeasonEdgeUpdates;
  }
};

export const loadGraph = (
  seed,
  mapLayout,
  majorDistributionMode,
  areaShuffle = false,
  bossShuffle = false,
  portals = undefined
) => {
  const edgeUpdates = getEdgeUpdates(mapLayout, areaShuffle);
  const vertexUpdates =
    majorDistributionMode == MajorDistributionMode.Standard
      ? SeasonVertexUpdates
      : RecallVertexUpdates;

  if (portals != undefined) {
    return createGraph(portals, vertexUpdates, edgeUpdates);
  }

  return createGraph(
    mapPortals(seed, areaShuffle, bossShuffle),
    vertexUpdates,
    edgeUpdates
  );
};
