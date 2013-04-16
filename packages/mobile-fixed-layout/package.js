Package.describe({
  summary: "Adds logic for detecting browsers."
});

Package.on_use(function (api) {
    api.add_files('layout.html', 'client');
    api.add_files('layout.js', 'client');
});
