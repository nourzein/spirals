const width = 250;
const height = 250;

var maxSize = Math.min(width, height) / 2,
  drawDuration = 20;

function plotSpiroGraph() {
  //Function adjusted from: https://github.com/alpha2k/HTML5Demos/blob/master/Canvas/spiroGraph.html

  var R = maxSize;
  var r = getRandomNumber(40, R * 0.75);
  var alpha = getRandomNumber(25, r);
  var l = alpha / r;
  var k = r / R;

  //Create the x and y coordinates for the spirograph and put these in a variable
  var lineData = [];
  for (var theta = 1; theta <= 20000; theta += 1) {
    var t = (Math.PI / 180) * theta;
    var ang = ((l - k) / k) * t;
    var x = R * ((1 - k) * Math.cos(t) + l * k * Math.cos(ang));
    var y = R * ((1 - k) * Math.sin(t) - l * k * Math.sin(ang));

    lineData.push({ x: x, y: y });
  }

  //Output the variables of this spiro
  //console.log(
  //   "R: " + R + ", r: " + r + ", alpha: " + alpha + ", l: " + l + ", k: " + k
  // );

  console.log(lineData);

  return lineData;
}

function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}
//plotSpiroGraph();

$(".spiral").each((i, elem) => {
  var svg = d3
    .select(elem)
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", [0, 0, width, height])

    .append("g")
    .attr("class", "wrapper")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var curves = d3.svg
    .line()
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    });

  var colors = ["#f200ae", "#3402fa", "#00c271", "#e85d00", "#e80000"];
  var numColors = 5;
  var startColor = getRandomNumber(0, numColors); //Loop through the colors, but the starting color is random

  function addSpiro() {
    var path = svg
      .append("path")
      .attr("class", "spirograph")
      .attr("d", curves(plotSpiroGraph())) //convert into d element using line function
      .style("stroke-width", 1)
      .style("stroke", colors[startColor]);

    path
      .attr("stroke-dasharray", `${500} ${100}`)
      .attr("stroke-dashoffset", 500)
      .transition()
      .duration(drawDuration * 1000)
      .ease("linear")
      .attr("stroke-dashoffset", 0);
  }
  addSpiro(false);
});
