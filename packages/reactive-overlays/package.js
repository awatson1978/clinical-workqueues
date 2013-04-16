Package.describe({
  summary: "Meteorite package that adds logic for tutorial overlays."
});

Package.on_use(function (api) {
    api.add_files('overlay.css', "client");
    api.add_files('overlay.js', "client");
});
