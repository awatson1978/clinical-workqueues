Package.describe({
    summary: "detect-browser provides helper functions and basic syntax for checking for specific browsers."
});

Package.on_use(function (api) {
    api.add_files('unsupported.browser.html', "client");
    //api.add_files('browser.detection.js', "client");
});
