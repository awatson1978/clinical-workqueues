

// TODO: convert session variables into Meteor.user().profile items
//Session.set('list_id', null);
Session.set('tag_filter', null);
Session.set('current_page', '#main-pane');
Session.set('selected_task_id', false);
Session.set('show_sidebar_panel',true);

//var seed = ;
//Router.setList(seed);

// session variables
Session.set('editing_addtag', null);
Session.set('editing_listname', null);
Session.set('editing_itemname', null);

// TODO:  sync terminology between 'show' and 'display'
Session.set('show_task_detail_panel', false);
Session.set('display_profile_json_panel', false);
Session.set('json_content', "panel for inspecting data objects");

Session.set('showDropboxAlert', false);


Session.set('is_supported_browser', false);

// first we check that the browser is supported and whether it's worth even trying to render
if(isWebKit){
    Session.set('is_supported_browser', true);
}

// layout is dependent upon viewport, which can change if the browser window is resized
// or if the user rotates the screen
$(window).resize(function(evt) {
    Session.set("resize", new Date());
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



//-----------------------------------------------------
// Controls for the JSON inspection and debugging panel

Template.jsonContentPanelTemplate.showJsonPanel = function(){
    return Session.get('display_profile_json_panel');
};
Template.jsonContentPanelTemplate.jsonData = function(){
    return Session.get('json_content');
};

//-----------------------------------------------------
// TODO: refactor toggle functions to helper.js ????

function toggleJsonPanel(){
    if(Session.get('display_profile_json_panel')){
        Session.set('display_profile_json_panel',false);
    }else{
        Session.set('display_profile_json_panel',true);
    }
}
function toggleTaskDetailPanel(){
    if(Session.get('show_task_detail_panel')){
        Session.set('show_task_detail_panel',false);
        $('#new-todo-box').removeClass('hidden');
    }else{
        Session.set('show_task_detail_panel',true);
        $('#new-todo-box').addClass('hidden');
    }
}
function toggleSidebarVisibility(){
    if(Session.get('show_sidebar_panel')){
        Session.set('show_sidebar_panel',false);
        layoutWorkqueuesPageWithoutPanel();
    }else{
        Session.set('show_sidebar_panel',true);
        layoutWorkqueuesPageWithPanel();
    }
}
function setSidebarVisibility(){
    if(Session.get('show_sidebar_panel')){
        layoutWorkqueuesPageWithPanel();
    }else{
        layoutWorkqueuesPageWithoutPanel();
    }

}

function layoutWorkqueuesPageWithPanel() {
    $('#main-pane').removeClass('sidebar-hidden-landscape-layout');

    $('#main-pane').addClass('sidebar-shown-landscape-layout');
    $('#main-pane').css('width', window.innerWidth - 195);
}
function layoutWorkqueuesPageWithoutPanel() {
    $('#main-pane').removeClass('sidebar-shown-landscape-layout');

    $('#main-pane').addClass('sidebar-hidden-landscape-layout');
    $('#main-pane').css('width', window.innerWidth);

}
