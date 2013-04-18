Package.describe({
  summary: "Adds support for mobile hardware via Cordova Phonegap."
});

Package.on_use(function (api) {
    api.use('templating','client');

    api.add_files('cordova.html', 'client');
    api.add_files('cordova.css', 'client');

    api.add_files('cordova-ios-2.4.0.js', 'client');
    api.add_files('cordova.initialization.js', 'client');
});
