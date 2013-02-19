
// ID of currently selected list
Session.set('list_id', null);

// Name of currently selected tag for filtering
Session.set('tag_filter', null);

// When adding tag to a todo, ID of the todo
Session.set('editing_addtag', null);

// When editing a list name, ID of the list
Session.set('editing_listname', null);

// When editing todo text, ID of the todo
Session.set('editing_itemname', null);

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.




Meteor.startup(function () {
    Backbone.history.start({pushState: true});

    $(window).resize(function(evt) {
        Session.set("resize", new Date());
    });
});
Template.app_container.rendered = function(){
    //$('#profilePage').addClass('hidden');
    //$('#communityPage').addClass('hidden');
    showPage('#main-pane');
};


Template.app_container.loggedIn = function () {
    console.log('loggedIn called');
    if(Meteor.userId() != null){
        console.log('Meteor.userId() is null');
        return true;
    }else{
        console.log('Meteor.userId(): ' + Meteor.userId());
        return false;
    }
};


