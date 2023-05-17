export const breadthFirstSearch = (graph, vertex, load) => {
  let queue = [vertex];
  let visited = [];

  while (queue.length > 0) {
    const v = queue.shift();
    visited.push(v);

    const connections = graph.filter((c) => c.from == v);
    connections.forEach((c) => {
      if (!visited.includes(c.to) && !queue.includes(c.to) && c.condition(load)) {
        queue.push(c.to);
      }
    });
  }

  return visited;
};

export const mergeGraph = (graph, vertex, load) => {
  for (let i = 0; i < graph.length; i++) {
    // Skip all item vertices
    if (graph[i].to.item != "" || graph[i].from.item != "") {
      continue;
    }
    // Not a connection from the specified vertex?
    if (graph[i].from != vertex || !graph[i].condition(load)) {
      continue;
    }
    // Find the connection that goes back to our vertex
    const back = graph.findIndex((n) => n.from == graph[i].to && n.to == vertex);
    if (back >= 0 && graph[back].condition(load)) {
      graph.forEach((n, idx) => {
        if (idx == i || idx == back) {
          return;
        }
        if (n.from == graph[i].to) {
          n.from = vertex;
        }
        if (n.to == graph[i].to) {
          n.to = vertex;
        }
      });
      if (back > i) {
        graph.splice(back, 1);
        graph.splice(i, 1);
      } else {
        graph.splice(i, 1);
        graph.splice(back, 1);
      }
      mergeGraph(graph, vertex, load);
      return;
    }
  }
};
