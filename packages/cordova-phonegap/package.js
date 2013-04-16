Package.describe({
  summary: "Adds support for mobile hardware via Cordova Phonegap."
});

Package.on_use(function (api) {
    api.add_files('app.initialization.js', 'client');
    api.add_files('cordova-2.5.0rc1.js', 'client');
});
