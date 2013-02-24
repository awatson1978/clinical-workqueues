
// Session IDs
Session.set('list_id', null);

Session.set('tag_filter', null);
Session.set('editing_addtag', null);
Session.set('editing_listname', null);
Session.set('editing_itemname', null);

Session.set('display_profile_json_panel', false);
Session.set('json_content', "panel for inspecting data objects");
Session.set('current_page', '#main-pane');

Session.set('show_task_detail_panel', false);
Session.set('selected_task_id', false);

Session.set('selected_message_recipient', '');
Session.set('is_supported_browser', false);

if(isWebKit){
    Session.set('is_supported_browser', true);
}


Meteor.startup(function () {
    Backbone.history.start({pushState: true});

    $(window).resize(function(evt) {
        Session.set("resize", new Date());
    });
});

// generally speaking, this isn't the correct place to add page specific rendering code
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
Template.footerBarTemplate.showJsonPanel = function(){
    return Session.get('display_profile_json_panel');
};
Template.footerBarTemplate.jsonData = function(){
    return Session.get('json_content');
};

//-----------------------------------------------------
// TODO: refactor toggle functions to helper.js

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

