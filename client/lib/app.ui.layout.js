detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    console.log('detecting orientation: ' + window.orientation);

    if(typeof window.onorientationchange !== 'undefined'){
        if ( window.orientation === 0 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === 90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === -90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === 180 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
    }
}


//-----------------------------------------------------
// appContainerTemplate

Template.appContainerTemplate.rendered = function(){
    if(Meteor.Device.isTablet()){
        $('.touch-trigger').removeClass('touch-disabled');
    }
    $(body).css('height', window.innerHeight);
    $('#mainLayoutPaneContainer').css('height', window.innerHeight);
    $('#mainLayoutPane').css('height', window.innerHeight);
    $('#panelRight').css('height', window.innerHeight);
};
Template.appContainerTemplate.resized = function(){
    try{
        //$(body).css('height', window.innerHeight);
        $('#mainLayoutPaneContainer').css('height', window.innerHeight);
        $('#mainLayoutPane').css('height', window.innerHeight);
        $('#panelRight').css('height', window.innerHeight);
        return Session.get("resized");
    }catch(err){
        console.log(err);
    }
};
Template.appContainerTemplate.isDualPanelLayout = function(){
    return Session.get('is_dual_panel_layout');
};

Template.appContainerTemplate.isFirstVisit = function(){
    if(Session.get('selected_list') == "none"){
        return true;
    }else{
        return false;
    }
}
//-----------------------------------------------------
// LANDSCAPE/PORTRAIT FUNCTIONS


function resizeCommunityPageForLandscape(){
    $('#communityInspectionBlock').removeClass('fullwidth padded');
    $('#communityInspectionBlock').removeClass('bottom-anchored');
    $('#communityInspectionColumn').removeClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('forty-percent-width');
    $('#communityInspectionBlock').addClass('first-column-position');
}
function resizeCommunityPageForPortrait(){
    $('#communityInspectionBlock').removeClass('forty-percent-width');
    $('#communityInspectionBlock').removeClass('first-column-position');

    $('#communityInspectionBlock').addClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('bottom-anchored');
    $('#communityInspectionColumn').addClass('fullwidth padded');
}




//-----------------------------------------------------
// JSON Inspection Panel
// Controls for the JSON inspection and debugging panel

Template.jsonContentPanelTemplate.showJsonPanel = function(){
    return Session.get('show_profile_json_panel');
};
Template.jsonContentPanelTemplate.jsonData = function(){
    return Session.get('json_content');
};



//---------------------------------------------------
// DropBox Alert

monitorDropbox = function(){
    try{
        if(Meteor.user().profile.dropbox){
            return false;
        }else{
//            Session.set('selected_task_id', Todos.findOne(Meteor.user().profile.dropbox)._id);
//            Session.set('selected_task_done_status', Todos.findOne(Meteor.user().profile.dropbox).done);
//            Session.set('selected_task_star_status', Todos.findOne(Meteor.user().profile.dropbox).star);
//            Session.set('selected_task_text', Todos.findOne(Meteor.user().profile.dropbox).text);
            return true;
        }
    }
    catch(err){
        console.log(err);
    }
};


Template.dropboxAlertTemplate.events({
    'click #dropboxAlertCard':function(){
        console.log('click #dropboxAlertCard');
        Meteor.users.update(Meteor.userId(), {$unset: { 'profile.dropbox': '' }}, function(){});
        //Session.set('selected_task_id', Todos.findOne(Meteor.user().profile.dropbox)._id);
    },
    'tap #dropboxAlertCard':function(){
        console.log('tap #dropboxAlertCard');
        Meteor.users.update(Meteor.userId(), {$unset: { 'profile.dropbox': '' }}, function(){});
        //Session.set('selected_task_id', Todos.findOne(Meteor.user().profile.dropbox)._id);
    }

});
Template.dropboxAlertTemplate.alert_text = function(){
    try{
        if(Meteor.user().profile.dropbox){
            return Todos.findOne(Meteor.user().profile.dropbox).text;
        }else{
            return 'this should be some text';
        }
    }catch(error){
        console.log(error);
    }
};
Template.dropboxAlertTemplate.alert_image = function(){
    try{
        console.log('getting dropbox alert image...');
        //console.log('selected_task_id: ' + Session.get('selected_task_id'));
        if(Meteor.user().profile.dropbox){
            console.log(JSON.stringify(Todos.findOne(Meteor.user().profile.dropbox).image));
            return Todos.findOne(Meteor.user().profile.dropbox).image;
        }else{
            return '/images/placeholder-240x240.jpg';
        }
    }catch(error){
        console.log(error);
    }
};
Template.dropboxAlertTemplate.alert_id = function(){
    try{
        if(Meteor.user().profile.dropbox){
            return Todos.findOne(Meteor.user().profile.dropbox)._id;
        }else{
            return 'alert id';
        }
    }catch(error){
        console.log(error);
    }
};
//Template.dropboxAlertTemplate.alert_tag_list = function(){
//    try{
//        if(Meteor.user().profile.dropbox){
//            return Todos.findOne(Meteor.user().profile.dropbox).tags;
//        }else{
//            return '/im';
//        }
//    }catch(error){
//        console.log(error);
//    }
//};
Template.dropboxAlertTemplate.alert_link = function(){
    try{
        if(Meteor.user().profile.dropbox){
            return Todos.findOne(Meteor.user().profile.dropbox).weblink;
        }else{
            return 'http://www.notavailable.com';
        }
    }catch(error){
        console.log(error);
    }
};
