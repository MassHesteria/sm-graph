import { vertices } from "./data/vertex.js";
import { edges } from "./data/edge.js";
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

export const createGraph = (areaMapping) => {
  return allEdges
    .map((e) => {
      const from = allVertices.find((v) => v.name == e.from);
      const to = allVertices.find((v) => v.name == e.to);
      return {
        from: from,
        to: to,
        condition: e.condition,
      };
    })
    .concat(
      areaMapping.map((a) => {
        const from = allVertices.find((v) => v.name == a[0]);
        const to = allVertices.find((v) => v.name == a[1]);
        return {
          from: from,
          to: to,
          condition: (_) => true,
        };
      })
    )
    .concat(
      areaMapping.map((a) => {
        const from = allVertices.find((v) => v.name == a[0]);
        const to = allVertices.find((v) => v.name == a[1]);
        return {
          from: to,
          to: from,
          condition: (_) => true,
        };
      })
    );
};

export const getAvailableLocations = (graph, samus, collected) => {
  const available = breadthFirstSearch(graph, graph[0].from, samus);
  const notCollected = available.filter((v) => v.item != "" && !collected.includes(v.name));
  return notCollected.map((v) => v.name);
};
