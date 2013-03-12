//Template.graphsPageTemplate.destroyed = function () {
//    this.handle && this.handle.stop();
//};
//Template.graphsPageTemplate.rendered = function () {
//
//    $('.sidebar').css('height', window.innerHeight - 80);
//    $('.d3chart').css('height', window.innerHeight - 80);
//
//    //var resize = Session.get("resize");
//    self.node = self.find("svg");
//
//    if (! self.handle) {
//        self.handle = Meteor.autorun(function(){
//            switch(Session.get("selected_graph")){
//                case 'ultrasimple':
//                    $('#breadCrumbLink').html('Ultra Simple Line Chart');
//                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
//                    clearGraphs();
//                    renderUltraSimpleLineChart();
//                    break;
//                case 'simple':
//                    $('#breadCrumbLink').html('Simple Line Chart');
//                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
//                    clearGraphs();
//                    renderSimpleLineChart();
//                    break;
//                case 'scatter':
//                    $('#breadCrumbLink').html('Scatter Plot');
//                    $('#graphInstructions').html('Mouseover or tap a graph node to inspect the node values.  Double click on a connection node to collapse/expand it.');
//                    clearGraphs();
//                    renderScatterPlotChart();
//                    break;
//                case 'stream':
//                    $('#breadCrumbLink').html('Stream Graph');
//                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
//                    clearGraphs();
//                    renderStreamChart();
//                    break;
//                case 'bar':
//                    $('#breadCrumbLink').html('Bar Chart');
//                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
//                    clearGraphs();
//                    renderBarChart();
//                    break;
//                case 'multibar':
//                    $('#breadCrumbLink').html('Multibar Chart');
//                    $('#graphInstructions').html('Mouseover or tap a graph node to inspect the node values.  Double click on a connection node to collapse/expand it.');
//                    clearGraphs();
//                    renderMultiBarChart();
//                    break;
//                case 'horizontalBar':
//                    $('#breadCrumbLink').html('Horizontal Bar Chart');
//                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
//                    clearGraphs();
//                    renderHorizontalBarChart();
//                    break;
//                case 'cumulativeLine':
//                    $('#breadCrumbLink').html('Cumulative Line Chart');
//                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
//                    clearGraphs();
//                    renderCumulativeLineChart();
//                    break;
//                case 'viewFinder':
//                    $('#breadCrumbLink').html('Line Chart with View Finder');
//                    $('#graphInstructions').html('Mouseover or tap a graph node to inspect the node values.  Double click on a connection node to collapse/expand it.');
//                    clearGraphs();
//                    renderLineChartWithViewFinder();
//                    break;
//                case 'pie':
//                    $('#breadCrumbLink').html('Pie Chart');
//                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
//                    clearGraphs();
//                    renderPieChart();
//                    break;
//                case 'bullet':
//                    $('#breadCrumbLink').html('Bullet Chart');
//                    $('#graphInstructions').html('Mouseover or tap a tree node to inspect the node value.  Double click on the node to collapse/expand the tree.');
//                    clearGraphs();
//                    renderBulletChart();
//                    break;
//
//                default:
//                    $('#breadCrumbLink').html('Simple Line Chart');
//                    $('#graphInstructions').html('Mouseover or tap on the sunburst chart to inspect an item.');
//                    clearGraphs();
//                    renderUltraSimpleLineChart();
//                    break;
//            }
//        });
//    };
//};
//
//Template.inspectionSidebarTemplate.data_title = function(){
//    if(Session.get('data_inspection_title')){
//        return Session.get('data_inspection_title');
//    }else{
//        return "Title not available.";
//    }
//};
//Template.inspectionSidebarTemplate.data_size = function(){
//    if(Session.get('data_inspection_size')){
//        return Session.get('data_inspection_size');
//    }else{
//        return "this is a size: 1000";
//    }
//};
//Template.inspectionSidebarTemplate.data_color = function(){
//    if(Session.get('data_inspection_color')){
//        return Session.get('data_inspection_color');
//    }else{
//        return "#4488aa";
//    }
//};

function clearGraphs(){
    $('#forceDirectGraph').html('');
    $('#sunburstChart').html('');
    $('#collapsibleTreeChart').html('');
    $('#dataDrivenDocumentChart').html('<svg id="simpleLineChartGraphic"></svg>');
};