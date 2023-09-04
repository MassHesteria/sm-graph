import fs from "fs";
import { loadGraph } from "./lib/graph/init";
import { MajorDistributionMode, MapLayout } from "./lib/graph/params";
import * as prettier from "prettier";

const getBody = (func) => {
  const full = func.toString();
  if (full.indexOf("{") < 0) {
    return full;
  }
  return full
    .slice(full.indexOf("{") + 1, full.lastIndexOf("}"))
    .replace(/return /g, "")
    .replace(/;/g, "")
    .replace(/\/\/.*/g, "")
    .replace(/[\n\r]/g, "")
    .trim();
};

let area = "";

const writeEdge = async (e) => {
  let output = "";
  if (e.from.area != area) {
    output += `# ${e.from.area}   \n   \n`;
    area = e.from.area;
  }
  let condition = await prettier.format(getBody(e.condition), { semi: false, parser: "babel" });
  if (condition[0] == ";") {
    condition = condition.slice(1);
  }
  output += `From **${e.from.name}** to **${e.to.name}**   \n` + "```\n" + `${condition}` + "```\n";
  return output;
};

const writeGraph = async (name, graph) => {
  let msg = "";
  for (let i = 0; i < graph.length - 40; i++) {
    msg += await writeEdge(graph[i]);
  }
  fs.writeFileSync(`${name}.md`, msg);
};

await writeGraph("standard", loadGraph(1, 1, MapLayout.Standard, MajorDistributionMode.Standard));
await writeGraph(
  "standard-area",
  loadGraph(1, 1, MapLayout.Standard, MajorDistributionMode.Standard, true)
);
await writeGraph("recall", loadGraph(1, 1, MapLayout.Recall, MajorDistributionMode.Recall));
await writeGraph(
  "recall-area",
  loadGraph(1, 1, MapLayout.Recall, MajorDistributionMode.Recall, true)
);
process.exit(0);
