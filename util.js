import { vertices } from "./vertex.js";
import { edges } from "./edge.js";
import { breadthFirstSearch } from "./search.js";
import table from "table";

//import wiki from "./wiki.json" assert { type: "json" };

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

const graph = allEdges.map((e) => {
  const from = allVertices.find((v) => v.name == e.from);
  const to = allVertices.find((v) => v.name == e.to);
  return {
    from: from,
    to: to,
    condition: e.condition,
  };
});

const getItemLocations = (samus, collected) => {
  const available = breadthFirstSearch(graph, graph[0].from, samus);
  return available
    .filter((v) => v.item != "none" && !collected.includes(v.name))
    .map((v) => v.name);
};

const itemPlacement = [
  { location: "MorphBall", action: (load) => (load.hasMorph = true) },
  { location: "AlphaMissiles", action: (load) => (load.canOpenRedDoors = true) },
  {
    location: "Bombs",
    action: (load) => {
      load.canUseBombs = load.hasMorph;
      load.canFly = load.hasMorph;
    },
  },
];

let samus = {};
let collected = [];

while (itemPlacement.length > 0) {
  const itemLocations = getItemLocations(samus, collected);
  console.log(itemLocations);
  const index = itemPlacement.findIndex((i) => itemLocations.includes(i.location));

  if (index < 0) {
    console.log("no items");
    break;
  }

  itemPlacement[index].action(samus);
  collected.push(itemPlacement[index].location);
  itemPlacement.splice(index, 1);
}

//console.log(graph);
//let samus = {};
//let collected = [];
//printItemLocations(samus, collected);
console.log(getItemLocations(samus, collected));

/*return Object.entries(v).map(([n, i]) => {
      return {
        name: k + "_" + n,
        item: i,
      };
    });
  })
  .reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);*/

//console.log(allEdges);
/*
export const processWiki = () => {
  console.log(wiki);
};

export const con = (from, to, condition = () => true) => {
  const a = allRooms.find((v) => v.name == from);
  const b = allRooms.find((v) => v.name == to);
  return {
    from: a,
    to: b,
    condition: condition,
  };
};

const name = (vertex) => {
  if (vertex == undefined) {
    return "(invalid name)";
  } else {
    return vertex.name;
  }
};

const room = (vertex) => {
  if (vertex == undefined) {
    return "(invalid room)";
  } else {
    const sep = vertex.name.indexOf("_");
    if (sep >= 0) {
      return vertex.name.substring(0, sep);
    } else {
      return vertex.name;
    }
  }
};

export const printRooms = (map) => {
  const rooms = map
    .map((c) => room(c.from))
    .filter((value, index, array) => {
      return array.indexOf(value) == index;
    });
  console.log(rooms);
};

export const printMap = (map) => {
  const conToString = (connection) => {
    return (
      name(connection.from) +
      " to " +
      name(connection.to) +
      "\n\n" +
      connection.condition.toString()
    );
  };

  const tableData = [];
  for (let i = 0; i < map.length; i += 2) {
    tableData.push([conToString(map[i]), conToString(map[i + 1])]);
  }

  console.log(table.table(tableData));
};

export const printPossibleRooms = () => {
  const rooms = allRooms
    .map((r) => room(r))
    .filter((value, index, array) => {
      return array.indexOf(value) == index;
    });

  console.log(rooms);
};

export const printAvailable = (map, samus) => {
  const queue = [];

  const first = map[0];

  for (let i = 1; i < map.length; i++) {}
};
*/
