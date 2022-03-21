// SVG Group
const treeSVG = d3.select('#tree-chart')
  .append("svg");

// Graph group
const graph = treeSVG.append('g')
  .attr("class", "graph")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10);

// Links group
const linksGroup = graph.append('g')
  .attr("class", "links")
  .attr("fill", "none")
  .attr("stroke", "#555")
  .attr("stroke-opacity", 0.4)
  .attr("stroke-width", 1.5);

// Nodes group
const nodesGroup = graph.append('g')
  .attr("class", "nodes")
  .attr("stroke-linejoin", "round")
  .attr("stroke-width", 3);

// Colour
const colour = d3.scaleOrdinal(d3['schemeCategory10']);

// Update function
function treeUpdate(data) {

  const root = tree(data);

  // Find min and max x
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Update colour scale domain
  console.log(data);

  // Update viewBox
  treeSVG.join("svg")
    .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

  // Update graph translate
  graph.join("g")
    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

  // Get link selection and join data
  const links = linksGroup.selectAll('.links')
    .data(root.links());

  // Enter new links
  links.enter()
    .append('path')
    .attr('class', 'link')
    .attr("d", d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x));

  // Get node selection and join data
  const nodes = nodesGroup.selectAll('.nodes')
    .data(root.descendants());

  // Create and enter nodes group
  const enterNodes = nodes.enter()
    .append("g")
      .attr('class', 'node')
      .attr("transform", d => `translate(${d.y},${d.x})`);

    enterNodes.append("circle")
      // .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5)
      .style("fill", function (d) {
        console.log(d.data.key)
        return d.children ? "#ffffff" : colour[+d.data.key - 1];
      })
      .style("stroke", function (d) {
        // console.log(d);
        return d.children ? "#4682B4" : colour[+d.data.key - 1];
      });

    enterNodes.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(function(d) { return d.children? d.data.key : "Qtr " + d.data.key + " - " + d.data.doc_count + " Touchdowns"; })
      .clone(true).lower();

};

// Tree function
function tree (data) {
  const root = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
};

width = 954;

// Structure data function
function structureData() {

  // Initialise root
  var root = {};
  root.key = "NFL";

  // TEAMS \\

  // Make teams children of root
  root.children = data.aggregations.teams.buckets;

  // PLAYERS \\

  // Make players children of teams
  root.children.forEach(function (d) { d.children = d.players.buckets; });

  // Delete players key
  root.children.forEach(function (d) { delete d.players; });

  // QTRS \\

  // Make qtrs children of players
  root.children.forEach(function (d) {
    d.children.forEach(function (d) {
      d.children = d.qtrs.buckets;
    });
  });

  // Delete qtrs key
  root.children.forEach(function (d) {
    d.children.forEach(function (d) {delete d.qtrs; });
  });

  return root;
}

// Data function
async function getData() {
  data = await d3.json("http://localhost:3000/data/tree");
  return data;
};

// Plot graph function
async function plotGraph() {
  var data = [];
  data = await getData();
  structuredData = structureData(data);
  treeUpdate(structuredData);
};

// Main
plotGraph();