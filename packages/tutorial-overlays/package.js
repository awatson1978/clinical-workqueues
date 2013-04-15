Package.describe({
  summary: "Meteorite package that adds logic for tutorial overlays."
});

Package.on_use(function (api) {
    api.add_files('jquery.mobile.overlay.less', 'client');
    api.add_files('jquery.tools.overlay.less', 'client');
    api.add_files('syntax.tutorials.less', 'client');
    api.add_files('jquery.tools.overlay.js', 'client');
});
