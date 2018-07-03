# d3学习笔记

### 选择器
1. d3初体验之选择器
d3.select()   查找所有指定DOM元素的第一个元素(同JS querySelect())
d3.selectAll()  查找所有指定DOM元素的集合，返回的是一个DOM元素集合(同JS querySelectAll())
这两个函数返回的结果选为选择集
2. d3绑定数据
datum()  绑定一个数据到选择集上
data()  绑定一个数组到选择集上，数组的各项值分别和选择集的各元素绑定


### 数据比例尺
比例尺  在实际绘画过程中直接用数值的大小来代表像素并不是一个好办法，因此我们一般使用比例尺
如：
```
var data1 = [2.5, 2.1, 2.7, 2.9];
var data2 = [2500, 3900, 5600, 7900];
```
当数值太大  根本看不见
当数值太大  会超出画布范围
于是 我们需要确定一种计算方式 能够将某一区域的值映射到另一区域，其大小关系不变、  这就是比例尺(Scale)

D3中的比例尺类似于数学中的函数 也有定义域和值域，分别称为domain和range  我们在实际开发中需要知道范围，来得到计算关系
1. 线性比例尺
能将一个连续的区间，映射到另一区间。
解决柱形图宽度的问题就需要线性比例尺
假设有如下数组：
```
var dataSet = [1.2, 2.3, 0.9,1.5,3.3];
// 要求 将dataSet中最小值，映射为0；将最大的值，映射为200
var min = d3.min(dataSet);
var max = d3.max(dataSet);
// d3.scale.linear() 返回一个线性比例尺
// domain()  定义比例尺的定义域  x坐标的范围
// range()   定义比例尺的值域    y坐标的范围
var linear = d3.scaleLinear().domain([min,max]).range([0,300]);  // 建立线性比例尺
// d3.scale.linear()的返回值可以当函数使用
linear(0.9);  // 返回0
linear(2.3);  // 返回175
linear(3.3);  // 返回300
```
2. 序数比例尺
有时候，定义域和值域不一定是连续的
```
// 如下两个数组
var index = [0, 1, 2, 3];
var color = ["blue", "red", "yellow", "pink"];
// 要求  希望0对应颜色blue,1对应yello,以此类推
// 但这些值是离散的，线性比例尺不合适,所以需要用到序数比例尺
// 代码如下  
var ordinal = d3.scaleOrdinal().domain(index).range(color);
// 用法与线性比例尺类似
ordinal(0); // 返回blue 
ordinal(1); // 返回red
```
### 坐标轴
坐标轴是可视化图表中的重要组建图像，坐标轴在SVG中是没有现成的图形元素的，需要用其他元素组合构成。D3内部提供了坐标轴组建,从而我们可以很简单的在SVG画布中绘制坐标轴。

1. 简介SVG 基本图形
 1.1 矩形<rect>
 1.2 圆形<circle>
 1.3 椭圆<ellipse>
 1.4 线段<line>
 1.5 折线<polyline>
 1.6 多边形<polygon>
 1.7 路径<path>  // 功能极强,可以构建极其复杂的图形
 画布中的所有图形都是由这七种元素组成

 d3.svg.axis() 的实现:
 分组元素 <g>，是 SVG 画布中的元素，意思是 group。此元素是将其他元素进行组合的容器，在这里是用于将坐标轴的其他元素分组存放。

如果需要手动添加这些元素就太麻烦了，为此，D3 提供了一个组件：d3.svg.axis()。它为我们完成了以上工作。
 ```
<g>
<!-- 第一个刻度 -->
<g>
<line></line>   <!-- 第一个刻度的直线 -->
<text></text>   <!-- 第一个刻度的文字 -->
</g>
<!-- 第二个刻度 -->
<g>
<line></line>   <!-- 第二个刻度的直线 -->
<text></text>   <!-- 第二个刻度的文字 -->
</g> 
...
<!-- 坐标轴的轴线 -->
<path></path>
</g>
call()
 ```
 
 ```
 function foo(selection) {
  selection
      .attr("name1", "value1")
      .attr("name2", "value2");
}
foo(d3.selectAll("div"))
// 和	
d3d .selectAll("div").call(foo);

svg.append("g").call(axis);
// 和
axis(svg.append(g)); 
// 是对等的
 ```
