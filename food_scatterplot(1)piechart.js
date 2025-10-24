// Date for the pie chart
document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { label: 'Hot Pot', value: 35 },
        { label: 'Barbecue', value: 25 },
        { label: 'Burgers', value: 20 },
        { label: 'Pizza', value: 10 },
        { label: 'Sushi', value: 10 }
    ];
    
    const colors = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(['#FF5733', '#36A2EB', '#FFC300', '#4CAF50', '#9966FF']);
    
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    
    // 检查元素是否存在
    const pieChartElement = document.getElementById('pie-chart');
    if (!pieChartElement) {
        console.error('Element with id "pie-chart" not found');
        return;
    }
    
    // Create the SVG element
    const svg = d3.select('#pie-chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Generate the pie layout
    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    // Create the pie slices
    const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
    
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => colors(d.data.label));
    
    // Add labels with percentages
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .text(d => {
            const percentage = (d.data.value / d3.sum(data, d => d.value) * 100).toFixed(1);
            return `${percentage}%`;
        });
    
    // 检查legend元素是否存在
    const legendElement = document.querySelector('.legend');
    if (!legendElement) {
        console.warn('Element with class "legend" not found');
        return;
    }
    
    // Create the legend
    const legend = d3.select('.legend');
    
    const legendItems = legend.selectAll('.legend-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'legend-item');
    
    legendItems.append('div')
        .attr('class', 'legend-color')
        .style('background-color', d => colors(d.label));
    
    legendItems.append('text')
        .text(d => d.label);
    
    legendItems.append('text')
        .attr('class', 'percentage')
        .text(d => {
            const percentage = (d.value / d3.sum(data, d => d.value) * 100).toFixed(1);
            return `${percentage}%`;
        });
});

