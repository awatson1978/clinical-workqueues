
function renderBarChart(){


    historicalBarChart = [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label" : "A" ,
                    "value" : 29.765957771107
                } ,
                {
                    "label" : "B" ,
                    "value" : 0
                } ,
                {
                    "label" : "C" ,
                    "value" : 32.807804682612
                } ,
                {
                    "label" : "D" ,
                    "value" : 196.45946739256
                } ,
                {
                    "label" : "E" ,
                    "value" : 0.19434030906893
                } ,
                {
                    "label" : "F" ,
                    "value" : 98.079782601442
                } ,
                {
                    "label" : "G" ,
                    "value" : 13.925743130903
                } ,
                {
                    "label" : "H" ,
                    "value" : 5.1387322875705
                }
            ]
        }
    ];



    var chart;
    nv.addGraph({
        generate: function(){
            chart = nv.models.discreteBarChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .staggerLabels(true)
                //.staggerLabels(historicalBarChart[0].values.length > 8)
                .tooltips(false)
                .showValues(true)

            d3.select('#dataDrivenDocumentChart svg')
                .datum(historicalBarChart)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;

        },
        callback: function(graph){
            window.onresize = function () {
                var width = nv.utils.windowSize().width,
                    height = nv.utils.windowSize().height - 40,
                    margin = graph.margin();


                if (width < margin.left + margin.right + 20)
                    width = margin.left + margin.right + 20;

                if (height < margin.top + margin.bottom + 20)
                    height = margin.top + margin.bottom + 20;


                graph.width(width).height(height);

                d3.select('#simpleLineChartGraphic')
                    .attr('width', width)
                    .attr('height', height)
                    .call(graph);
            };
        }
    });




};