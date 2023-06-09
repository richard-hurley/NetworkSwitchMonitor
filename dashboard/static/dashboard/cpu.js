  
function generateChart(data, data1) {
    function noGo(message = "") {
      message ? console.log(message) : null;
    }
  
    data1 = null;
  
    data = data ? JSON.parse(data) : noGo("JSON Data 1");
    data1 = data1 ? JSON.parse(data1) : noGo("JSON Data 2");
  
    // Set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
    // Append the SVG object to the chart div
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Parse the time values
    var parseTime = d3.timeParse("%H:%M:%S");
    data
      ? data.forEach(function (d) {
          d.time = parseTime(d.dev_time);
        })
      : noGo();
    data1
      ? data1.forEach(function (d1) {
          d1.time = parseTime(d1.dev_time);
        })
      : noGo();
  
    // Set up the scales
    var xScale = d3
      .scaleTime()
      .domain(
        d3.extent(data ? data : data1, function (d) {
          return d.time;
        })
      )
      .range([0, width]);
  
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data ? data : data1, function (d) {
          return d.dev_cpu ? d.dev_cpu : d.dev_mem;
        }),
      ])
      .range([height, 0]);
  
    // Add the area chart
    var area = d3
      .area()
      .x(function (d) {
        return xScale(d.time);
      })
      .y0(height)
      .y1(function (d) {
        return yScale(d.dev_cpu ? d.dev_cpu : d.dev_mem);
      });
  
    svg
      .append("path")
      .datum(data ? data : data1)
      .attr("fill", "lightblue") // Set the color of the area
      .attr("d", area);
  
    // Add the scatter plot points
    svg
      .selectAll("circle")
      .data(data ? data : data1)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.time);
      })
      .attr("cy", function (d) {
        return yScale(d.dev_cpu ? d.dev_cpu : d.dev_mem);
      })
      .attr("r", 6)
      .style("fill", "steelblue")
      .on("mouseover", function (d, i) {
        // Show tooltip on mouseover
        tooltip.transition().duration(50).style("opacity", 0.9);
        tooltip
          .html(
            "Time: " +
              d.time +
              "<br/>" +
              (d.dev_cpu ? "CPU: " : "Mem: ") +
              (d.dev_cpu ? d.dev_cpu : d.dev_mem)
          )
          .style("position", "absolute")
          .style("z-index", "10")
          .style("left", d3.event.pageX + 25 + "px")
          .style("top", d3.event.pageY + 25 + "px");
      })
      .on("mouseout", function (d) {
        // Hide tooltip on mouseout
        tooltip.transition().duration(50).style("opacity", 0);
      });
  
    // Add the line
    data
      ? (() => {
          var line = d3
            .line()
            .x(function (d) {
              return xScale(d.time);
            })
            .y(function (d) {
              return yScale(d.dev_cpu);
            });
  
          svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
        })()
      : noGo("First Line");
  
    // Add the line for the second dataset
    data1
      ? (() => {
          var line1 = d3
            .line()
            .x(function (d) {
              return xScale(d.time);
            })
            .y(function (d) {
              return yScale(d.dev_mem);
            });
  
          svg
            .append("path")
            .datum(data1)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("d", line1);
        })()
      : noGo("Second Line");
  
    // Add the x-axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeMinute.every(5)) // Set ticks to every 5 minutes
          .tickFormat(d3.timeFormat("%H:%M")) // Format tick labels as hours:minutes
      );
  
    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .text("Time");
  
    // Add the y-axis
    svg.append("g").call(d3.axisLeft(yScale));
  
    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", 0 - height / 2)
      .attr("y", -35)
      .attr("transform", "rotate(-90)")
      .text("Percentage");
  
    // Add tooltip div
    var tooltip = d3
      .select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
  }
  

  
function generateChart2(data, data1){

    function noGo(message = ""){message ? console.log(message) : null;}

    data = null;

    data = data ? JSON.parse(data): noGo("JSON Data 1");
    data1 = data1 ? JSON.parse(data1) : noGo("JSON Data 2");

    

    // Set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the chart div
    var svg = d3
    .select("#chart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the time values
    var parseTime = d3.timeParse("%H:%M:%S");
    data ? data.forEach(function (d) {
        d.time = parseTime(d.dev_time);
    }) : noGo() ;
    data1 ? data1.forEach(function (d1) {
        d1.time = parseTime(d1.dev_time);
    }) : noGo() ;

    // Set up the scales
    var xScale = d3
    .scaleTime()
    .domain(d3.extent(data ? data : data1, function (d) { return d.time; }))
    .range([0, width]);

    var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data ? data : data1, function (d) { return d.dev_cpu ? d.dev_cpu : d.dev_mem; })])
    .range([height, 0]);


    // Add the area chart
    var area = d3
      .area()
      .x(function (d) {
        return xScale(d.time);
      })
      .y0(height)
      .y1(function (d) {
        return yScale(d.dev_cpu ? d.dev_cpu : d.dev_mem);
      });
  
    svg
      .append("path")
      .datum(data ? data : data1)
      .attr("fill", "lightgreen") // Set the color of the area
      .attr("d", area);

    // Add the scatter plot points
    svg.selectAll("circle")
    .data(data ? data : data1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.time); })
    .attr("cy", function (d) { return yScale(d.dev_cpu ? d.dev_cpu : d.dev_mem); })
    .attr("r", 6)
    .style("fill", "steelblue")
    .on("mouseover", function (d, i) {
        // Show tooltip on mouseover
        tooltip.transition().duration(50).style("opacity", 0.9);
        tooltip
        .html(
            "Time: " +
            d.time +
            "<br/>" +
            (d.dev_cpu ? "CPU: " : "Mem: ") +
            (d.dev_cpu ? d.dev_cpu : d.dev_mem)
        )
        .style("position","absolute")
        .style("z-index","10")
        .style("left", d3.event.pageX + 25 + "px")
        .style("top", d3.event.pageY + 25 + "px");
    })
    .on("mouseout", function (d) {
        // Hide tooltip on mouseout
        tooltip.transition().duration(50).style("opacity", 0);
    });

    // Add the line
    data ? (() => {
        var line = d3
        .line()
        .x(function (d) { return xScale(d.time); })
        .y(function (d) { return yScale(d.dev_cpu); });

        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
    
    })() : noGo("First Line");

    // Add the line for the second dataset
    data1 ? ( () => {

        var line1 = d3.line()
        .x(function (d) { return xScale(d.time); })
        .y(function (d) { return yScale(d.dev_mem); });

        svg.append("path")
            .datum(data1)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("d", line1);

    })() : noGo("Second Line");

    // Add the x-axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)
        .ticks(d3.timeMinute.every(5))  // Set ticks to every 5 minutes
        .tickFormat(d3.timeFormat("%H:%M"))  // Format tick labels as hours:minutes
    );

    // Add x-axis label
    svg.append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .text("Time");

    // Add the y-axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Add y-axis label
    svg.append("text")
    .attr("class", "y-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", 0 - (height / 2))
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .text("Percentage");


    // Add tooltip div
    var tooltip = d3
    .select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");


}

