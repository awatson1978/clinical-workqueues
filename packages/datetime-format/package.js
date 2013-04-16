
Package.describe({
  summary: "Adds logic for formating dates."
});

Package.on_use(function (api) {
    api.add_files('date.format.js', 'client');
});
