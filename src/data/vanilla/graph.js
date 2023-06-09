import { vanillaVertices } from "./vertex";
import { crateriaEdges } from "./edges/crateria";
import { greenbrinstarEdges } from "./edges/greenbrinstar";
import { redbrinstarEdges } from "./edges/redbrinstar";
import { kraidslairEdges } from "./edges/kraid";
import { crocomireEdges } from "./edges/crocomire";
import { westmaridiaEdges } from "./edges/westmaridia";
import { eastmaridiaEdges } from "./edges/eastmaridia";
import { uppernorfairEdges } from "./edges/uppernorfair";
import { lowernorfairEdges } from "./edges/lowernorfair";
import { wreckedshipEdges } from "./edges/wreckedship";
import { bossEdges } from "./edges/boss";

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
  return Object.entries(vanillaVertices)
    .map(([k, v]) => {
      return Object.entries(v).map(([name, type]) => {
        return {
          name: name,
          type: type,
          area: k,
          item: undefined,
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

export const createGraph = (portalMapping, vertexUpdates, edgeUpdates, startVertex) => {
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
    v.item = orig.item;
    v.pathToStart = orig.pathToStart;
  });

  return graph.map((e) => {
    return {
      from: remap(e.from),
      to: remap(e.to),
      condition: e.condition,
    };
  });
  //const newEdges = [...graph];
  //newEdges.forEach((e) => {
  //e.from = remap(e.from);
  //e.to = remap(e.to);
  //});
  //return newEdges;
};
