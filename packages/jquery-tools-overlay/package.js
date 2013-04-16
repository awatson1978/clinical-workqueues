Package.describe({
  summary: "Meteorite package that adds logic for tutorial overlays."
});

//Npm.depends({jquery: "1.7.0"});

Package.on_use(function (api) {
    api.use('jquery', "client");

    //api.add_files('jquery.tools.overlay.js', "client");
});
