(function(){
  const data = [
  {
  year: 2020,
  type: "Painting",
  count: 3
  },
  {
  year: 2020,
  type: "Sculpture",
  count: 6
  },
  {
  year: 2020,
  type: "Digital Art",
  count: 4
  },
  {
  year: 2021,
  type: "Painting",
  count: 7
  },
  {
  year: 2021,
  type: "Photography",
  count: 5
  },
  {
  year: 2021,
  type: "Digital Art",
  count: 2
  },
  {
  year: 2022,
  type: "Sculpture",
  count: 9
  },
  {
  year: 2022,
  type: "Digital Art",
  count: 5
  },
  {
  year: 2023,
  type: "Painting",
  count: 6
  },
  {
  year: 2023,
  type: "Photography",
  count: 4
  },
  {
  year: 2023,
  type: "Sculpture",
  count: 3
  },
  {
  year: 2023,
  type: "Digital Art",
  count: 7
  }
];

  // Group data by year
  const groupedData = d3.group(data, d => d.year);

  // Set up dimensions and margins
  const margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 120 // Increased left margin to accommodate labels
  };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select("#vis-scatterplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  // Extract unique years for x-axis
  const years = Array.from(groupedData.keys()).sort();

  // Define scales
  const xScale = d3.scaleBand()
  .domain(years)
  .range([0, width])
  .padding(0.1);

  const yScale = d3.scaleBand()
  .domain(data.map(d => d.type))
  .range([height, 0])
  .padding(0.1);

  const radiusScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .range([2, 15]); // Adjust the range for desired dot size

  // Create tooltip
  const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  // Add X axis
  svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .selectAll("text")
  .style("text-anchor", "middle");

  svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom)
  .style("text-anchor", "middle")
  .text("Year");

  // Add Y axis
  svg.append("g")
  .call(d3.axisLeft(yScale));

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Type of Work");

  // Function to animate circles
  function animateCircles() {
    // Draw circles with initial state (hidden)
    const circles = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2) // Center the circles within the band
      .attr("cy", d => yScale(d.type) + yScale.bandwidth() / 2) // Center the circles vertically within the band
      .attr("r", 0) // Start with radius 0
      .style("fill", "steelblue")
      .style("opacity", 0) // Start invisible
      .on("mouseover", function(event, d) {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);
        tooltip.html(`Year: ${d.year}<br>Type: ${d.type}<br>Count: ${d.count}`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");

        // Interactive highlight: temporarily increase radius
        d3.select(this).transition().duration(200).attr("r", radiusScale(d.count) * 1.2);
      })
      .on("mouseout", function(event, d) {
        tooltip.transition()
        .duration(500)
        .style("opacity", 0);

        // Reset radius
        d3.select(this).transition().duration(200).attr("r", radiusScale(d.count));
      });

    // Animate: fade in and grow, delayed by year
    circles.transition()
      .duration(1000)
      .delay(d => (d.year - 2020) * 1000) // 1s delay per year after 2020
      .attr("r", d => radiusScale(d.count))
      .style("opacity", 1);
  }

  // Initial animation on load
  animateCircles();

  // Add a replay button for interaction (appended to the parent section for visibility)
  d3.select("#vis-scatterplot")
    .append("button")
    .text("Replay Animation")
    .style("margin-top", "10px")
    .style("padding", "8px 16px")
    .style("background-color", "steelblue")
    .style("color", "white")
    .style("border", "none")
    .style("border-radius", "4px")
    .style("cursor", "pointer")
    .on("click", function() {
      // Remove existing circles to reset
      svg.selectAll("circle").remove();
      // Replay animation
      animateCircles();
    });

})();