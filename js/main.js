// Part 1: In-meeting activity

var svg = d3.select("#chart-area1")
    .append("svg")
    .attr("width", 800)
    .attr("height", 200)
    .append("g");

var textLine = svg.append("text")
    .attr("x", 20)
    .attr("y", 100)
    .text("Orders");


function updateVisualization(orders) {
    //console.log(orders);

    // Step 1: Append new circles for new orders
    // The color of the circle should be brown for coffee orders and green for tea
    // Radius should vary with the price
    var circles = svg.selectAll("circle").data(orders);

    circles.enter()
        .append("circle")
        .merge(circles)
        .transition()
        .attr("fill", function (d) {
            if (d.product === "coffee") {
                return "brown";
            } else {
                return "green";
            }
        })
        .attr("r", function (d) {
            return 20*d.price;
        })
        .attr("cx", function (d, i) {
            return (i*150) + 200;
        })
        .attr("cy", 100);


    // Step 2: Delete elements that have been removed from orders

    circles.exit().transition().duration(100).remove();

    // Step 3: Update the text label

    textLine.text("Orders: " + orders.length);
}

// Part 2: Assignment - Synthesis of everything we've learned!

loadData();

d3.select("#ranking-type").on("change", updateBarChart);


// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
    // data getter
    get: function() { return _data; },
    // data setter
    set: function(value) {
        _data = value;
        // update the visualization each time the data property is set by using the equal sign (e.g. data = [])
        updateBarChart();
    }
});
var width = 800,
    height = 600;
var margin = {top: 40, right: 40, bottom: 50, left: 40};
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

// Step 1: Define an SVG drawing area with our margin conventions. Append
// the drawing area to the div with id chart-area2
var svg2 = d3.select("#chart-area2")
     .append("svg")
     .attr("width", 800)
     .attr("height", 600)
     .append("g");

// Step 2: Create scales for x and y.
// Hint: You should use scaleBand() for x. What should you use for y?

var companies = [];
function loadData() {
    d3.csv("data/coffee-house-chains.csv",function(error, csv) {

        // Step 3: Get the data ready: change numeric fields to being numbers!
        csv.forEach( function (d) {
            d.stores = +d.stores;
            d.revenue = +d.revenue;
            if (!companies.includes(d.company)) {
                companies.push(d.company);
            }
        });

        // Store csv data in global variable

        data=csv;


        // updateVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });
}
// console.log(companies);
// var x=["Starbucks", "Tim Hortons", "Panera Bread", "Costa Coffee", "Dunkin Brands", "Krispy Kreme", "Caffé Nero", "Einstein Noah"];
var xScale = d3.scaleBand()
    .range([0,width]);
var yScale = d3.scaleLinear()
    .range([height,0]);

function updateBarChart() {
    data.sort(function (a, b) {
        if (a[d3.select("#ranking-type").node().value] > b[d3.select("#ranking-type").node().value]) return -1;
        if (a[d3.select("#ranking-type").node().value] < b[d3.select("#ranking-type").node().value]) return 1;
        return 0;
    });
    console.log(data);
    console.log(d3.select("#ranking-type").node().value);
    x = [];
    data.forEach(function(d) {x.push(d.company)});
    console.log(x);
    xScale.domain(x);
    // Step 5: Sort the coffee house chains by number of stores,
    // and display the sorted data in the bar chart. Use the sort function
    // and provide it with an anonymous function.

    //console.log(xScale("Panera Bread"));
    // Step 6: Get the currently selected option from the select box using D3


    // Step 7: Change the scales, the sorting and the dynamic
    // properties in a way that they correspond to the selected option
    // (stores or revenue).
    // Hint: You can access JS object properties with bracket notation (product["price"])
    yScale.domain([0, d3.max(data, function (d) {
        return d[d3.select("#ranking-type").node().value];
    })]);

    // Step 4: Implement the bar chart for number of stores worldwide
    // -  Specify domains for the two scales
    // -  Implement the enter-update-exit sequence for rect elements
    // -  Use class attribute bar for the rects
    data.forEach(function (d) {console.log(yScale(d[d3.select("#ranking-type").node().value]));});
    var bars = svg2.selectAll("rect").data(data);
    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .attr("class", "bar")
        .attr("fill", "brown")
        .attr("x", function (d) {
            return margin.left + xScale(d.company);
        })
        .attr("y", function (d) {
            return margin.top + yScale(d[d3.select("#ranking-type").node().value]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return height - yScale(d[d3.select("#ranking-type").node().value]);
        });

    // rects.enter()
    //     .append("rect")
    //     .merge(rects)
    //     .transition()
    //     .attr("fill", "brown")
    //     .attr("x", function (d) {
    //         return margin.left + xScale(d.company);
    //     })
    //     .attr("y", function (d) {
    //         return margin.top + yScale(d.stores);
    //     })
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", function (d) {
    //         return height - yScale(d.stores);
    //     });

    bars.exit().transition().duration(100).remove();

    var xAxis = d3.axisBottom()
        .scale(xScale);
    var yAxis = d3.axisLeft()
        .scale(yScale);

    // Step 7: Append the x- and y-axis to your scatterplot
    // Add the axes to a group element that you add to the SVG drawing area.
    // Use translate() to change the axis position
    var xAxisGroup = svg2.append("g")
        .attr("class", "x-axis  axis");

    svg2.select(".x-axis")
        .attr("transform", "translate(" + (0) + "," + (margin.top + height) + ")")
        .call(xAxis);

    var yAxisGroup = svg2.append("g")
        .attr("class", "y-axis axis");

    svg2.select(".y-axis")
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")")
        .call(yAxis);
}

    // Step 8: Append dynamic axes.
    // Use the following HTML class attributes:
    // x-axis and axis for the x-axis
    // y-axis and axis for the y-axis


    // Step 9: Add transitions to the bars/rectangles of your chart


    // Step 10: Add transitions to the x and y axis
