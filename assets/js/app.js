var svgWidth=825;
var svgHeight = 500;

var margin={
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
}

var width = svgWidth-margin.left-margin.right;
var height= svgHeight-margin.top-margin.bottom;

var svg=d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup=svg.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// import data

URL='https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201810DATA2/master/16_D3/Homework/Instructions/StarterCode/assets/data/data.csv?token=AiteU-o-3QAgUV2nzTtNCyUuaG34Kcbfks5ciSzowA%3D%3D'
d3.csv(URL).then(function(data){
    

    //parsing data
    data.forEach(function(state){
        state.poverty=+state.poverty;
        state.healthcare=+state.healthcare
        console.log(state)
    })

    var max = 0;
    data.forEach(function(state) {
        if (state.healthcare > max) {
            max = state.healthcare
        }
    })
    console.log(max);
    //create scale function
    var xLinearScale=d3.scaleLinear()
        .domain([8,d3.max(data, d=>d.poverty)])
        .range([0,width])

    var yLinearScale=d3.scaleLinear()
        .domain([4, d3.max(data, d=> d.healthcare )]) 
        .range([height, 0])

    //create axis function

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale)
    // Append Axes to the Chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis)

    chartGroup.append ('g')
        .call(leftAxis)

    // create circles
    var circleGroup= chartGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d=> xLinearScale(d.poverty))
    .attr('cy', d=> yLinearScale(d.healthcare))
    .attr('r', "15")
    .attr("fill", "blue")
    .attr("opacity", "0.3")

    // create text in circles

    var textGroup=chartGroup.selectAll('circle').select('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d=> xLinearScale(d.poverty)-5)
    .attr('y', d=> yLinearScale(d.healthcare)+3)
    .attr('font-size', '10')
    .attr('fill','white')
    .text(d=>d.abbr)


    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr("y", 0 - margin.left +40)
        .attr('x', 0 - (height/2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare %")
        
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty%");    
})
