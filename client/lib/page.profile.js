//-----------------------------------------------------------------
// profilePageTemplate

Template.profilePageTemplate.rendered = function(){
    log_event("Template.profilePageTemplate.rendered",LogLevel.Signpost,this);
};
Template.profilePageTemplate.loggedIn = function () {
    if(Meteor.userId()){
        return true;
    }else{
        return false;
    }
};

//-----------------------------------------------------------------
// userCardTemplate

Template.userCardTemplate.rendered = function () {
    jQuery('#profilePage').css('min-height', window.innerHeight);
};
Template.userCardTemplate.resize = function(){
    if(Session.get("appWidth") > 768){
        if(Session.get('show_sidebar_panel')){
            layoutAppWithSidebar();
        }else{
            layoutAppWithoutSidebar();
        }
    }else{
        layoutAppWithoutSidebar();
    }
    return Session.get("appWidth");
};






Template.userCardTemplate.editing_email = function () {
    log_event('Template.profilePageTemplate.editing_email', LogLevel.Trace, this);
    return Session.equals('editing_profile_email', "true");
};
Template.userCardTemplate.editing_name = function () {
    log_event('Template.profilePageTemplate.editing_name', LogLevel.Trace, this);
    return Session.equals('editing_profile_name', "true");
};
Template.userCardTemplate.editing_birthdate = function () {
    log_event('Template.profilePageTemplate.editing_birthdate', LogLevel.Trace, this);
    return Session.equals('editing_profile_birthdate', "true");
};
Template.userCardTemplate.editing_avatar = function () {
    log_event('Template.profilePageTemplate.editing_avatar', LogLevel.Trace, this);
    return Session.equals('editing_profile_avatar', "true");
};



Template.userCardTemplate.events(
    okCancelEvents('#userAvatarInput',
        {
            ok: function (value) {
                log_event('userAvatarInput - ok', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.avatar': value }});
                Session.set('editing_profile_avatar', "false");
                Meteor.flush();
            },
            cancel: function () {
                log_event('userAvatarInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_avatar', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userDateOfBirthInput',
        {
            ok: function (value) {
                log_event('userDateOfBirthInput - ok', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.dateOfBirth': value }});
                Session.set('editing_profile_birthdate', "false");
                Meteor.flush();
            },
            cancel: function () {
                log_event('userDateOfBirthInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_birthdate', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userNameInput',
        {
            ok: function (value) {
                log_event('userNameInput - ok', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.name': value }});
                Session.set('editing_profile_name', "false");
                Meteor.flush();
            },
            cancel: function () {
                log_event('userNameInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_name', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userEmailInput',
        {
            ok: function (value) {
                log_event('userEmailInput - cancel', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { emails: [{address: value }] }});
                Session.set('editing_profile_email', "false");
                Meteor.flush();
            },
            cancel: function () {
                log_event('userEmailInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_email', "false");
            }
        })
);
Template.userCardTemplate.events({
    'dblclick .userEmailDisplay': function (evt, tmpl) {
        Session.set('editing_profile_email', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-email"));
    },
    'click .userNameDisplay': function (evt, tmpl) {
        Session.set('editing_profile_name', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-name"));
    },
    'click .userDateOfBirthDisplay': function (evt, tmpl) {
        Session.set('editing_profile_birthdate', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-birth-date"));
    },
    'click .userAvatarDisplay': function (evt, tmpl) {
        Session.set('editing_profile_avatar', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-avatar"));
    },
    'click .userCollaboratorsDisplay': function (evt, tmpl) {
        Session.set('editing_profile_collaborators', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-collaborator"));
    }
});

Template.userCardTemplate.user_name = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.name;
        }else{
            return "User profile not created yet."
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_name', err, LogLevel.Error, this);
    }
};
Template.userCardTemplate.user_id = function () {
    try{
        if(Meteor.user()){
            return Meteor.user()._id;
        }else{
            return "UserId not found."
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_id', err, LogLevel.Error, this);
    }
};
Template.userCardTemplate.user_email = function () {
    try
    {
        if(Meteor.user().emails){
            return Meteor.user().emails[0].address;
        }else{
            return "User email address not available right now.";
        }
    }
    catch(err)
    {
        catch_error('Template.userCardTemplate.user_email', err, LogLevel.Error, this);
    }
};
Template.userCardTemplate.user_birthdate = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.dateOfBirth;
        }else{
            return "User profile not created yet."
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_birthdate', err, LogLevel.Error, this);
    }
};
Template.userCardTemplate.user_avatar = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.avatar;
        }else{
            return "User profile not created yet."
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_avatar', err, LogLevel.Error, this);
    }
};



Template.userCardTemplate.user_dropbox = function () {
    try{
        if(Meteor.user().profile.dropbox){
            return Meteor.user().profile.dropbox;
        }else{
            return "No dropbox item.";
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_dropbox', err, LogLevel.Error, this);
    }
};
Template.userCardTemplate.user_active_collaborator = function () {
    try{
        if(Meteor.user().profile.activeCollaborator){
            return Meteor.users.findOne(Meteor.user().profile.activeCollaborator).profile.name;
        }else{
            return "No active collaborator currently set.";
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_active_collaborator', err, LogLevel.Error, this);
    }
};

Template.userCardTemplate.user_image = function () {
    try{

        if(Meteor.user().services.facebook){
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
        }else if(Meteor.user().profile){
            return $.trim(Meteor.user().profile.avatar);
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }
    catch(err){
        catch_error('Template.userCardTemplate.user_image', err, LogLevel.Error, this);
    }
};
//Template.profilePageTemplate.user_json = function () {
//    var selectedUser = Meteor.user();
//    return JSON.stringify(selectedUser);
//};
//Template.profilePageTemplate.rendered = function(){
//    Session.set('json_content', JSON.stringify(Meteor.user()));
//};



Template.profilePageTemplate.receivedNewAlert = function(){
    return monitorDropbox();
};



//----------------------------------------------------------------

Template.activeCollaboratorCardTemplate.events({
    'click .collaborator-image': function(){
        showPage("#communityPage");
    }
});


// TODO:  this probably needs to go into page.profile.js
Template.profilePageSidebarTemplate.events({
    'click .object-inspector-tab': function(){
        toggleJsonPanel();
    },
    'click .hipaa-audit-tab': function(){
        // nothing yet
    },
    'click .collaborators-tab': function(){
        // nothing yet
    }

});
Template.profilePageSidebarTemplate.selected = function(){
    if(Session.get('show_profile_json_panel')){
        return 'selected';
    }else{
        return '';
    }
};


//---------------------------------------------------
monitorDropbox = function(){
    try{
        if(Meteor.user().profile.dropbox == null){
            return false;
        }else{
            return true;
        }
    }
    catch(err){
        catch_error('monitorDropbox()', err, LogLevel.Notice, this);
    }
};


Template.dropboxAlert.events({
    'click #dropboxAlert':function(){
        Meteor.users.update(Meteor.userId(), {$unset: { 'profile.dropbox': '' }}, function(){});
    }
});
Template.dropboxAlert.text = function(){
    try{
        //console.log('dropbox: ' + Meteor.user().profile.dropbox);
        //var task = Todos.findOne(Meteor.user().profile.dropbox);
        var task = Todos.findOne(Meteor.user().profile.dropbox);
        //console.log('dropbox task: ' + task.text);
        return task.text;
    }catch(error){
        catch_error('Template.dropboxAlert.text', error, LogLevel.Error, this);
    }
};

// -------------------------------------------Meteor.user().profile.dropbo-------------
// LOGGED IN, ETC
