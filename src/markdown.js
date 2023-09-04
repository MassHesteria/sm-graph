import fs from "fs";
import { loadGraph } from "./lib/graph/init";
import { MajorDistributionMode, MapLayout } from "./lib/graph/params";

const getBody = (func) => {
  const full = func.toString();
  if (full.indexOf("{") < 0) {
    return full;
  }
  return full
    .slice(full.indexOf("{") + 1, full.lastIndexOf("}"))
    .replace(/return /g, "")
    .replace(/;/g, "")
    .trim();
};

let area = "";

const writeEdge = (e) => {
  let output = "";
  if (e.from.area != area) {
    output += `# ${e.from.area}   \n\n`;
    area = e.from.area;
  }
  output +=
    `From **${e.from.name}** to **${e.to.name}**   \n` +
    "```\n" +
    `${getBody(e.condition)}` +
    "\n```\n";
  return output;
};

const writeGraph = (name, graph) => {
  let msg = "";
  graph.slice(0, graph.length - 40).forEach((e) => (msg += writeEdge(e)));
  fs.writeFileSync(`${name}.md`, msg);
};

writeGraph("standard", loadGraph(1, 1, MapLayout.Standard, MajorDistributionMode.Standard));
writeGraph(
  "standard-area",
  loadGraph(1, 1, MapLayout.Standard, MajorDistributionMode.Standard, true)
);
writeGraph("recall", loadGraph(1, 1, MapLayout.Recall, MajorDistributionMode.Recall));
writeGraph("recall-area", loadGraph(1, 1, MapLayout.Recall, MajorDistributionMode.Recall, true));
process.exit(0);
