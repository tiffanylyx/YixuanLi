const data = [
  { label: "EdTech", value: 35 ,icon:'🏛️'},
  { label: "DataVis", value: 25 ,icon:'📊'},
  { label: "Tech4Novice", value: 15,icon:'💻' },
  { label: "GenAI", value: 10,icon:'🎨' },
  { label: "Dance", value: 10,icon:'💃🏽' },
  { label: "Cat", value: 5,icon:'🐈' },
  { label: "Gym", value: 5,icon:'💪' },
];
// set the dimensions and margins of the graph
const margin = {top: 100, right: 50, bottom: 10, left: 50},
    width = 500 - margin.top - margin.bottom,
    height = 400 - margin.top - margin.bottom;


// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2

// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${width/2+margin.left},${height/2+margin.top})`);
const range = []
for(i in data){
  range.push(data.icon)
}

// set the color scale
const color = d3.scaleOrdinal()
  .domain(range)
  .range(d3.schemePuBu[7]);

// Compute the position of each group on the pie:
const pie = d3.pie()
  .value(d => d.value)
  .sort(null);
const data_ready = pie(data)
console.log(data_ready)

// The arc generator
const arc = d3.arc()
  .innerRadius(radius * 0.4)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
const outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('allSlices')
  .data(data_ready)
  .join('path')
  .attr('d', arc)
  .attr('fill', d => color(d.data.icon))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
svg
  .selectAll('allPolylines')
  .data(data_ready)
  .join('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 0.5)
    .attr('points', function(d) {
      const posA = arc.centroid(d) // line insertion in the slice
      const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      const posC = outerArc.centroid(d); // Label position = almost the same as posB
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

svg
  .append('text')
    .text('My Mind Set')
    .attr('class',"Title")
    .attr('x',0)
    .attr('y',-height/2-margin.top/2+20)
    .style('text-anchor', 'middle')
// Add the polylines between chart and labels:
svg
  .selectAll('allLabels')
  .data(data_ready)
  .join('text')
    .text(d => d.data.label)
    .attr('class',"Text")
    .style('font-size',14)
    .attr('transform', function(d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
    })
    .style('text-anchor', function(d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
