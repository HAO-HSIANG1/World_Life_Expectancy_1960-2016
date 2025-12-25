import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# World Life Expectancy 1960–2016

Data: [World Bank](https://data.worldbank.org/indicator/SP.DYN.LE00.IN).`
)}

function _year(slider){return(
slider({
  min: 1960,
  max: 2016,
  value: 2016,
  step: 1,
  title: "Year"
})
)}

function _chart(d3,projection,color,width,DOM,height,location,year,topojson,world,life,format)
{
  const path = d3.geoPath();
  const ticks = [30, 40, 50, 60, 70, 80, 90];

  path.projection(projection);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(color.domain()))
    .rangeRound([width / 2 - 120, width / 2 + 120]);

  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto");

  const defs = svg.append("defs");

  const g = svg.append("g").attr("transform", `translate(0,${height - 30})`);

  const linearGradient = defs
    .append("linearGradient")
    .attr("id", "linear-gradient");

  linearGradient
    .selectAll("stop")
    .data(
      ticks.map((t, i, n) => ({
        offset: `${(100 * i) / n.length}%`,
        color: color(t)
      }))
    )
    .enter()
    .append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);

  g.append("rect")
    .attr("height", 8)
    .attr("x", x(30))
    .attr("width", x(90) - x(30))
    .style("fill", `url(${location}#linear-gradient)`);

  g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text(`Life Expectancy in ${year} (years)`);

  g.call(
    d3
      .axisBottom(x)
      .tickSize(13)
      .tickValues(ticks)
  )
    .select(".domain")
    .remove();

  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append("path")
    .attr("fill", d =>
      life.has(d.id) && life.get(d.id)[year]
        ? color(+life.get(d.id)[year])
        : "#eee"
    )
    .attr("d", path)
    .append("title")
    .text(d =>
      life.has(d.id) && life.get(d.id)[year]
        ? format(life.get(d.id))
        : "Unknown"
    );

  svg
    .append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  const countryShapes = topojson
    .feature(world, world.objects.countries)
    .features.map(feature => ({
      feature,
      record: life.get(feature.id),
      value: life.has(feature.id) && life.get(feature.id)[year]
        ? +life.get(feature.id)[year]
        : undefined
    }))
    .filter(d => d.value != null && !isNaN(d.value));

  const topCountries = countryShapes
    .slice()
    .sort((a, b) => d3.descending(a.value, b.value))
    .slice(0, 3);

  const bottomCountries = countryShapes
    .slice()
    .sort((a, b) => d3.ascending(a.value, b.value))
    .slice(0, 3);

  const labelGroup = svg
    .append("g")
    .attr("class", "extrema-labels")
    .attr("font-weight", "bold")
    .attr("font-size", 12)
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("paint-order", "stroke");

  function drawLabels(countries, fill) {
    const labels = labelGroup
      .selectAll(`.label-${fill.replace("#", "")}`)
      .data(countries)
      .enter()
      .append("text")
      .attr("fill", fill)
      .attr("text-anchor", "middle")
      .text(d => `${d.record["Country Name"]}: ${Math.round(d.value)}`);

    labels.attr("transform", d => {
      const [x, y] = path.centroid(d.feature);
      return `translate(${x},${y})`;
    });
  }

  drawLabels(topCountries, "#b30000");
  drawLabels(bottomCountries, "#08519c");

  return svg.node();
}


function _height(width){return(
width / 2 + 60
)}

function _projection(d3,width,height){return(
d3
  .geoNaturalEarth1()
  .rotate([-10, 0])
  .fitExtent([[1, 1], [width - 1, height - 51]], { type: "Sphere" })
  .precision(0.1)
)}

async function _life(d3)
{
  let [data, codes] = await Promise.all([
    d3.csv(
      "https://gist.githubusercontent.com/jashkenas/59c7c820265537b941251dabe33a8413/raw/e5dd92dad888a75045fcab80d0077e824d38b178/world-life-expectancy.csv"
    ),
    d3.csv(
      "https://gist.githubusercontent.com/jashkenas/59c7c820265537b941251dabe33a8413/raw/7ccd0d24ef50b3152ce848e7c3f9ce21a0d75af6/country-codes.csv"
    )
  ]);
  const lookup = new Map(codes.map(d => [d["alpha-3"], d["country-code"]]));
  return new Map(
    data
      .filter(d => lookup.has(d["Country Code"]))
      .map(d => [lookup.get(d["Country Code"]), d])
  );
}


function _color(d3){return(
d3.scaleSequential(d3.interpolateSpectral).domain([30, 90])
)}

function _format(year){return(
function format(d) {
  return `${d["Country Name"]}: ${Math.round(+d[year])}`;
}
)}

function _world(){return(
fetch("https://unpkg.com/world-atlas@1/world/110m.json").then(
  response => response.json()
)
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof year")).define("viewof year", ["slider"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","projection","color","width","DOM","height","location","year","topojson","world","life","format"], _chart);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("projection")).define("projection", ["d3","width","height"], _projection);
  main.variable(observer("life")).define("life", ["d3"], _life);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("format")).define("format", ["year"], _format);
  main.variable(observer("world")).define("world", _world);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  return main;
}
