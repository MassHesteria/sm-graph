export const breadthFirstSearch = (map, vertex, load) => {
  let queue = [vertex];
  let visited = [];

  while (queue.length > 0) {
    const v = queue.shift();
    visited.push(v);

    const connections = map.filter((c) => c.from == v);
    connections.forEach((c) => {
      if (!visited.includes(c.to) && c.condition(load)) {
        queue.push(c.to);
      }
    });
  }

  return visited;
};
