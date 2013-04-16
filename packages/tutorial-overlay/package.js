Package.describe({
  summary: "Meteorite package that adds logic for tutorial overlays."
});

//Npm.depends({jquery: "1.7.0"});

Package.on_use(function (api) {
    //api.use('less', "client");

    api.add_files('overlay.css', "client");
    api.add_files('overlay.js', "client");
});
