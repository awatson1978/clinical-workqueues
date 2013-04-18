Package.describe({
  summary: "Adds famous dead people to the Meteor.users collection."
});
Package.register_extension(
    "png", function (bundle, source_path, serve_path, where) {
        bundle.add_resource({
            type: "static",
            path: '/fonts/' + serve_path.split('/').pop(),
            source_file: source_path,
            where: where
        });
    }
);
Package.on_use(function (api) {
    api.add_files('bootstrap.users.js', 'server');
    //api.add_files('fonts/ColaborateLight.otf', "client");
});
