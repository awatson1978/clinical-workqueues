Template.dashboardPageTemplate.rendered = function(){
    log_event("Template.dashboardPageTemplate.rendered",LogLevel.Signpost,this);

    Session.set('show_sidebar_panel',true);
    layoutAppWithSidebar();

    $('.d3chart').css('height', '300px');


    //var resize = Session.get("resize");
    self.node = self.find("svg");

    if (! self.handle) {
        self.handle = Meteor.autorun(function(){
            //renderBarChart();
            renderSunburst();
        });
    };
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
};



