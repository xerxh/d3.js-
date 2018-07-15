// 画布大小
var width = 400
var height = 400
//  添加画布

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
//  画布旁边的留白 防止图形绘制到边界上
var padding = {left : 30, right : 20, top : 20, bottom : 20};
// 定义图行数据
var yData = [10, 20, 30, 40, 50, 60];
var xData = [2017, 2018, 2019, 2020, 2021, 2022];
// x轴的比例尺  ordinal() 序数比例尺
var xScale = d3.scale.ordinal()
               .domain(d3.range(xData.length)) // 定义定义域
               // .domain([d3.min(xData), d3.max(xData)])
               // .range([0, width - padding.left - padding.right])
               .rangeRoundBands([0, width - padding.left - padding.right])
// y轴的比例尺 linear() 线性比例尺
var yScale = d3.scale.linear()
               .domain([0, d3.max(yData)])
               .range([height - padding.top - padding.bottom, 0]);
// 定义x轴
var xAxis = d3.svg.axis() //创建一个默认的轴
              .scale(xScale)
              .orient("bottom");
// 定义y轴
var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");
// 矩形之间需要留的间隙
var rectPadding = 4;
// 添加矩形
var rects = svg.selectAll(".MyRect")
               .data(yData)
               .enter()
               .append("rect")
               .attr("class", "MyRect")
               .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
               .attr("x", function (d, i) {
                   // console.log(i)
                   console.log(xScale(i))
                   return xScale(i) + rectPadding/2;
               })
               .attr("y", function (d) {
                   return yScale(d);
               })
               .attr("width", xScale.rangeBand() - rectPadding)
               .attr("height", function (d) {
                   return height - padding.top - padding.bottom - yScale(d);
               });
// 添加文字元素
var texts = svg.selectAll(".MyText")
               .data(yData)
               .enter()
               .append("text")
               .attr("class", "MyText")
               .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
               .attr("x", function (d, i) {
                   return xScale(i)-10;
               })
               .attr("y", function (d) {
                   return yScale(d);
               })
               .attr("dx", function () {
                   return (xScale.rangeBand() - rectPadding)/2;
               })
               .attr("dy", function (d) {
                   return 20;
               })
               .text(function (d) {
                   return d;
               })

// 添加x轴
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
   .call(xAxis);
// 添加y轴
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
   .call(yAxis);
