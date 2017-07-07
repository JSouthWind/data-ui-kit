import $ from 'jquery';
var d3 = require("d3");
import d3TimeFormat from 'd3-time-format';


class Chart {
  constructor(graphData){
    this.data = graphData;
    this.update = this.insertChart();
  }
  
  insertChart(){
    
    var divSVG = document.getElementById('svg'),
        that = this,
        margin = {top: 40, right: 20, bottom: 30, left: 50},
        width = (parseFloat(window.getComputedStyle(divSVG).width) - margin.left - margin.right),
        height = parseFloat(window.getComputedStyle(divSVG).height) - margin.top - margin.bottom;
    
    var formatDate = function(d){
      var formatWeek = d3.timeFormat("%b %e");
      var formatDay = d3.timeFormat("%e");
      return formatWeek(d);//width >= 500 ? formatWeek(d) + ' - ' + (+formatDay(d) + 6) : formatWeek(d);
    }
    var max = d3.max(this.data, function(d){return d.value}),
        minDate = this.data[0].id,
        maxDate = this.data[this.data.length - 1].id;

    var y = d3.scaleLinear()
          .domain([0, max])
          .range([height, 0]);
   
    var x = d3.scaleLinear()
          .domain([minDate, maxDate])
          .range([0, width]);
    
    var yAxis = d3.axisLeft(y);
    var xAxis = d3.axisBottom(x).tickFormat(formatDate);
    
    var svg = d3.select('#svg').append('svg')
                .style('width', '100%')
                .style('height', '100%');
    
    var chartGroup = svg.append("g")
                      .attr("transform", 
                            "translate(" + margin.left + "," + margin.top + ")")
                      .attr('class', 'main');
    
    // Add Axis
    chartGroup.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr('class', 'xaxis').call(xAxis);
    chartGroup.append("g")
      .attr('class', 'yaxis').call(yAxis);
    
    // Add Chart
    
    var line = d3.line()
          .x((d) => x(d.id))
          .y((d) => y(d.value));
    
    var area = d3.area()
                  .x((d) => x(d.id))
                  .y0(height)
                  .y1((d) => y(d.value));
    
    chartGroup.append("path")
      .attr("d", area(this.data))
      .attr('class', 'chart__area');
    
    chartGroup.append("path")
      .attr("d", line(this.data))
      .attr('class', 'chart__line');
    
    if(width >= 500 || this.timeInt !== 'day' ) {
      chartGroup.selectAll(".chart__circle")
        .data(this.data)
        .enter().append("circle")
        .attr("r", 10)
        .attr("cx", (d) => x(d.id))
        .attr("cy", function(d) { return y(d.value); })
        .attr("class", "chart__circle");
    }
    
    chartGroup.selectAll(".chart__circle__inner")
      .data(this.data)
      .enter().append("circle")
      .attr("r", 4)
      .attr("cx", (d) => x(d.id))
      .attr("cy", function(d) { return y(d.value); })
      .attr("class", "chart__circle__inner");
    
    function updateData(data) {
      
      var updateSpeed = 1000;

      // Scale the range of the data again 
      x.domain(d3.extent(data, function(d) { return d.id; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);
      
      // Select the section we want to apply our changes to
      var svg = d3.select('#svg').transition();

      // Make the changes
      svg.select(".chart__line")   // change the line
        .duration(updateSpeed)
        .attr("d", line(data));
      
      svg.select(".chart__area")   // change the area
        .duration(updateSpeed)
        .attr("d", area(data));
      
      svg.select(".xaxis") // change the x axis
        .duration(updateSpeed)
        .call(xAxis);
      
      svg.select(".yaxis") // change the y axis
        .duration(updateSpeed)
        .call(yAxis);
      
      var mainG = d3.select('.main');
      mainG.selectAll(".chart__circle") // change the circle
        .remove(); 
      mainG.selectAll(".chart__circle__inner") // change the circle
        .remove();
      
      if(width >= 500 || that.timeInt !== 'day' ) { 
        mainG.selectAll(".chart__circle")
          .data(data)
          .enter().append("circle")
          .attr("r", 10)
          .attr("cx", (d) => x(d.id))
          .attr("cy", function(d) { return y(d.value); })
          .attr("class", "circle--not chart__circle");
      }
      
      mainG.selectAll(".chart__circle__inner")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .attr("cx", (d) => x(d.id))
        .attr("cy", function(d) { return y(d.value); })
        .attr("class", "circle--not chart__circle__inner");
      
      setTimeout(function(){
        $('circle').addClass('chart__circle--is--visible')
      }, 400);

    }
    
    return updateData;
    
  }
  
}

export default Chart;