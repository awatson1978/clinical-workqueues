function renderSunburst(){
    var width = window.innerWidth,
        height = window.innerHeight - 120,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20c();

    var svg = d3.select("#sunburstChart").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
    log_event('d3 added SVG area to chart element.', LogLevel.Drawing);

    var partition = d3.layout.partition()
        .sort(null)
        .size([2 * Math.PI, radius * radius])
        .value(function(d) { return 1; });
    log_event('d3 added created partition(s).', LogLevel.Drawing);

    var arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y); })
        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
    log_event('d3 created arc(s).', LogLevel.Drawing);

    log_event('d3 loading input files', LogLevel.Drawing);
    d3.json("datafile/flare.json", function(error, root) {
        log_event('d3 loaded flare.json: ' + root, LogLevel.Drawing);

        var path = svg.datum(root).selectAll("path")
            .data(partition.nodes)
            .enter().append("path")
            .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
            .attr("d", arc)
            .style("stroke", "#fff")
            .style("fill", function(d) { return color(d.size); })
            .style("fill-rule", "evenodd")
            .on("mouseover", function(d) {
                Session.set('data_inspection_title', d.name);
                Session.set('data_inspection_size', d.size);
                Session.set('data_inspection_color', color(d.size));
            })
            .each(stash);

        log_event('d3 created paths from datum.', LogLevel.Drawing);

        d3.selectAll("input").on("change", function change() {
            var value = this.value === "count"
                ? function() { return 1; }
                : function(d) { return d.size; };

            path
                .data(partition.value(value).nodes)
                .transition()
                .duration(1500)
                .attrTween("d", arcTween);
        });
    });

    // Stash the old values for transition.
    function stash(d) {
        d.x0 = d.x;
        d.dx0 = d.dx;
    }

    // Interpolate the arcs in data space.
    function arcTween(a) {
        var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
        return function(t) {
            var b = i(t);
            a.x0 = b.x;
            a.dx0 = b.dx;
            return arc(b);
        };
    }

    d3.select(self.frameElement).style("height", height + "px");
}


