//TODO:  Publish to Atmosphere

Package.describe({
    summary: "d3-graphs-flare provides sample templates and graphs using the flare.json dataset"
});

Package.on_use(function (api) {
    api.add_files('graph.bar.js', "client");
    api.add_files('graph.sunburst.js', "client");
});
