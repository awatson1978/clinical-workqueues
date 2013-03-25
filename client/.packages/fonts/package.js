//TODO:  Create package; publish to Atmosphere

Package.describe({
    summary: "Basic font package."
});

Package.on_use(function (api) {
    api.add_files(['3OF9_NEW.TTF'], 'public/font');
    api.add_files(['ChalkDust.ttf'], 'public/font');
    api.add_files(['FontAwesome.ttf'], 'public/font');
    api.add_files(['Freehand.ttf'], 'public/font');
    api.add_files(['HarabaraHand.ttf'], 'public/font');
    api.add_files(['ItAintRocketScience.ttf'], 'public/font');
    api.add_files(['ModernPictographs.otf'], 'public/font');
    api.add_files(['Pictonic.ttf'], 'public/font');
    api.add_files(['ShelterMe.ttf'], 'public/font');
    api.add_files(['WildScript.ttf'], 'public/font');
    api.add_files(['Windsong.ttf'], 'public/font');

    api.add_files(['syntax.font.less'], 'client/stylesheets');
});












