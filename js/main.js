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
    console.log(orders);

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

d3.select("#ranking-type").on("change", updateBarChart());

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
    // data getter
    get: function() { return _data; },
    // data setter
    set: function(value) {
        _data = value;
        // update the visualization each time the data property is set by using the equal sign (e.g. data = [])
        updateBarChart()
    }
});



// Step 1: Define an SVG drawing area with our margin conventions. Append
// the drawing area to the div with id chart-area2


// Step 2: Create scales for x and y.
// Hint: You should use scaleBand() for x. What should you use for y?


function loadData() {
    d3.csv("data/coffee-house-chains.csv", function(error, csv) {

        // Step 3: Get the data ready: change numeric fields to being numbers!


        // Store csv data in global variable
        data = csv;

        // updateVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });
}

// Render visualization
function updateBarChart() {

    // Step 5: Sort the coffee house chains by number of stores,
    // and display the sorted data in the bar chart. Use the sort function
    // and provide it with an anonymous function.



    // Step 6: Get the currently selected option from the select box using D3



    // Step 7: Change the scales, the sorting and the dynamic
    // properties in a way that they correspond to the selected option
    // (stores or revenue).
    // Hint: You can access JS object properties with bracket notation (product["price"])



    // Step 4: Implement the bar chart for number of stores worldwide
    // -  Specify domains for the two scales
    // -  Implement the enter-update-exit sequence for rect elements
    // -  Use class attribute bar for the rects

    /* You can use this code to position the elements

        .attr("x", function(d) { return x(d.company); })
        .attr("y", function(d) { return y(d.stores); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.stores); }) */



    // Step 8: Append dynamic axes.
    // Use the following HTML class attributes:
    // x-axis and axis for the x-axis
    // y-axis and axis for the y-axis


    // Step 9: Add transitions to the bars/rectangles of your chart


    // Step 10: Add transitions to the x and y axis
}