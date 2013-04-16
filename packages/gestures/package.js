Package.describe({
  summary: "Adds logic for detecting gestures, swipes, and other touch events."
});

Package.on_use(function (api) {
    api.add_files('jquery.jgestures.js', 'client');
});
