import data from "./vertex.json" assert { type: "json" };
import table from "table";

const vertices = data.vertices;

export const con = (from, to, condition = () => true) => {
  const a = vertices.find((v) => v.name == from);
  const b = vertices.find((v) => v.name == to);
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

export const printAvailable = (map, samus) => {
  const queue = [];

  const first = map[0];

  for (let i = 1; i < map.length; i++) {}
};
