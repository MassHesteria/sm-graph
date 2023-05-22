import yaml from "js-yaml";
import fs from "fs";

const updateEdge = (graph, from, to, requires) => {
  //TODO: Support parsing
  if (requires != null) {
    throw new Error(`Parsing requires failed: ${requires}`);
  }
  const edge = graph.find((n) => n.from.name == from && n.to.name == to);
  if (edge == null) {
    throw new Error(`Could not find edge from ${from} to ${to}`);
  }
  edge.condition = (_) => true;
};

export const readYAML = (graph, fileName) => {
  try {
    yaml.loadAll(fs.readFileSync(fileName), (doc) => {
      doc.edges.forEach((c) => {
        const data = Object.values(c)[0];
        const [from, to] = data.edge_nodes;
        const { requires, direction } = data;

        updateEdge(graph, from, to, requires);
        if (direction == "bidirectional") {
          updateEdge(graph, to, from, requires);
        }
      });
    });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
