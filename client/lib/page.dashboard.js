Template.dashboardPageTemplate.rendered = function(){
    Session.set('show_sidebar_panel',true);
    layoutWorkqueuesPageWithPanel();

    $('.d3chart').css('height', '300px');


    //var resize = Session.get("resize");
    self.node = self.find("svg");

    if (! self.handle) {
        self.handle = Meteor.autorun(function(){
            //renderBarChart();
            renderSunburst();
        });
    };

};