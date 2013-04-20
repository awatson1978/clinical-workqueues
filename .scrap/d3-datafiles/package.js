Package.describe({
    summary: "d3-datafile provides the datafiles for many/most of the D3 sample graphs; specifically flare.json."
});

Package.on_use(function (api) {
    api.add_files('flare.json', "client");
});
