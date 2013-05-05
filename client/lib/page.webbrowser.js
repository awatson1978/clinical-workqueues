Session.set('browser_window_location', 'http://www.wikipedia.org');

Template.webBrowserPageTemplate.browser_window_location = function(){
    return Session.get('browser_window_location');
};
Template.webBrowserPageTemplate.rendered = function(){
    $('#mainLayoutPane').css('height', window.innerHeight - 120);
};