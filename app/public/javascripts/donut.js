// Dimensions
const donutDims = {width: 1400, height: 600};
const donutCent = {x: (donutDims.width/2 + 5), y: (donutDims.height/1.6 + 5)};
const donutRadius = Math.min(donutDims.width, donutDims.height) / 2;

// Colour scale
const donutColour = d3.scaleOrdinal(d3['schemeSet3']);

// SVG
const donutSVG = d3.select('#donut-chart')
  .append("svg")
  .attr('width', donutDims.width + 150)
  .attr('height', donutDims.height + 150);

// Graph group
const donutGraph = donutSVG.append('g')
  .attr("class", "graph")
  .attr('transform', `translate(${donutCent.x}, ${donutCent.y})`);

// Slices group
const slicesGroup = donutGraph.append('g')
  .attr("class", "slices");

// Labels group
const labelsGroup = donutGraph.append('g')
  .attr("class", "labels");

// Polylines group
const polylinesGroup = donutGraph.append('g')
  .attr("class", "polylines");

// Legend group
const legendGroup = donutSVG.append('g')
  .attr("class", "legend")
  .attr('transform', `translate(${donutDims.width-150}, 100)`);

// Pie function
var pie = d3.pie()
  .sort(null)
  .value(d => d.doc_count);

// Arc function
var arcPath = d3.arc()
  .outerRadius(donutRadius)
  .innerRadius(donutRadius/2);

// Arc function for label position calculation
var labelPositionArc = d3.arc()
.innerRadius(donutRadius * 0.9)
.outerRadius(donutRadius * 0.9)

// Legend function
var legend = d3.legendColor()
  .shape('circle')
  .shapePadding(10)
  .scale(donutColour);

// Arc enter tween
var arcEnterTween = (d) => {
  let i = d3.interpolate(d.endAngle, d.startAngle);
  return function(t){
    d.startAngle = i(t);
    return arcPath(d);
  }
};

// Update function
const donutUpdate = (data => {

  // Update donutColour scale domain
  donutColour.domain(data.map(d => d.key));

  // Initiate slice
  const slice = donutGraph.selectAll(".slices").selectAll("path.slice")
    .data(pie(data));

  // Slice enter selection
  slice.enter()
    .append('path')
      .attr('class', 'arc')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('fill', d => donutColour(d.data.key))
      .each(function(d){ this._current = d})
      .transition().duration(750)
        .attrTween('d', arcEnterTween);

  // Initiate label
  const label = donutGraph.selectAll(".labels").selectAll("path.label")
    .data(pie(data));

  // Label enter selection
  label.enter()
  .append("text")
    .attr('class', 'label')
    .attr('transform', function(d) {
      var pos = labelPositionArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = donutRadius * 1.2 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text((d) => {
      return `${d.data.doc_count}`
    });

  // Initiate polylines
  const polyline = donutGraph.selectAll(".polylines").selectAll("path.polyline")
    .data(pie(data));

  // Polyline enter selection
  polyline.enter()
    .append('polyline')
      .attr('class', 'polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 4)
      .attr('points', function(d) {
        var posA = arcPath.centroid(d); // line insertion in the slice
        var posB = labelPositionArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = labelPositionArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = donutRadius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      })

  // Legend
  legendGroup.call(legend);
  legendGroup.selectAll('text').attr('fill', 'white');
  legendGroup.selectAll('circle').attr('stroke', 'black');

});

// Data function
async function getData() {
  data = await d3.json("http://localhost:3000/data/donut");
  return data;
};

// Plot graph function
async function plotGraph() {
  var data = [];
  data = await getData();
  var touchdowns = [];
  touchdowns = data.aggregations.touchdowns.buckets;
  donutUpdate(touchdowns);
};

// Main
plotGraph();