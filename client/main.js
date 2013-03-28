




// navigation variables
//Session.set('list_id', null);
Session.set('current_page', '#workqueuesPage');
Session.set('tag_filter', null);


// page layout variables
// these should be written to the user's profile, so it can persist through sessions
// TODO:  sync terminology between 'show' and 'display'
// TODO: convert session variables into Meteor.user().profile items
Session.set('is_supported_browser', false);
Session.set('show_sidebar_panel',false);
Session.set('show_header_breadcrumbs',false);
Session.set('show_new_task_input', true);
Session.set('show_community_search_input', true);
Session.set('show_task_detail_panel', false);
Session.set('display_profile_json_panel', false);
Session.set('showDropboxAlert', false);
Session.set('is_sidebar_available',true);




// editing flags
// these should always default to null, and don't need to persist between refreshes
Session.set('editing_addtag', null);
Session.set('editing_listname', null);
Session.set('editing_itemname', null);


// data drops
// these should be written to the user's profile, so they can persist through sessions
Session.set('selected_task_id', false);
Session.set('json_content', "panel for inspecting data objects");
Session.set('breadcrumb_text', '');



// rendering variables
// these should always default to null, and don't need to persist between refreshes
Session.set("appWidth", window.innerWidth);
Session.set('is_modal_dialog', false);



// first we check that the browser is supported and whether it's worth even trying to render
if(isWebKit){
    Session.set('is_supported_browser', true);
}

// layout is dependent upon viewport, which can change if the browser window is resized
// or if the user rotates the screen

$(window).resize(function(evt) {
    Session.set("resized", new Date());
    Session.set("appWidth", window.innerWidth);

    setSidebarAvailability();
});

//var seed = Lists.findOne();
//console.log('seed: ' + JSON.stringify(seed));
//Session.setDefault('list_id', seed._id);


// we make sure that navigation history is enabled
// this only runs when the server is started up
Meteor.startup(function () {
    Backbone.history.start({pushState: true});
});

// warning:  generally speaking, app_container.rendered isn't the correct place to add page specific rendering code
// it will fire for each sub-template, and often fires two dozen times or more
Template.app_container.rendered = function(){
    showCurrentSessionPage();
    setSidebarAvailability();
};


function setSidebarAvailability() {
    if (window.innerWidth < 768) {
        Session.set('is_sidebar_available', false);
    }
}



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



//-------------------------------------------------------
// CORDOVOA PHONE GAP

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



