import { vertices } from "./data/vertex.js";
import { edges } from "./data/edge.js";
import { portals } from "./data/portals.js";
import { breadthFirstSearch } from "./search.js";

const allVertices = Object.entries(vertices)
  .map(([_, v]) => {
    return Object.entries(v).map(([name, item]) => {
      return {
        name: name,
        item: item,
      };
    });
  })
  .reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

export const allEdges = Object.entries(edges)
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

export const mapPortals = () => {
  return Object.values(portals).reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
};

export const createGraph = (portalMapping) => {
  const findVertex = (name) => {
    const vertex = allVertices.find((v) => v.name == name);
    if (vertex == undefined) {
      throw new Error(`createGraph: could not find vertex, ${name}`);
    }
    return vertex;
  };
  return allEdges
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
          condition: (_) => true,
        };
      })
    )
    .concat(
      portalMapping.map((a) => {
        return {
          from: findVertex(a[1]),
          to: findVertex(a[0]),
          condition: (_) => true,
        };
      })
    );
};

export const getAvailableLocations = (graph, samus, collected) => {
  const available = breadthFirstSearch(graph, graph[0].from, samus);
  return available.filter((v) => v.item != "" && !collected.includes(v.name));
};
