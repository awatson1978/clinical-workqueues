Template.userCardTemplate.rendered = function(){
    // TODO:  think through whether it's better to default to portrait or landscape
    if(window.innerWidth > 800){
        resizeProfilePageForLandscape();
    }else{
        resizeProfilePageForPortrait();
    }
};
Template.userCardTemplate.resize = function(){
    if(window.innerWidth > 1024){
        resizeProfilePageForLandscape();
    }else{
        resizeProfilePageForPortrait();
    }
    return Session.get("resize");
};
Template.userCardTemplate.editing_email = function () {
    log_event('Template.profilePageTemplate.editing_email', LogLevel.Trace);
    return Session.equals('editing_profile_email', "true");
};
Template.userCardTemplate.editing_name = function () {
    log_event('Template.profilePageTemplate.editing_name', LogLevel.Trace);
    return Session.equals('editing_profile_name', "true");
};
Template.userCardTemplate.editing_birthdate = function () {
    log_event('Template.profilePageTemplate.editing_birthdate', LogLevel.Trace);
    return Session.equals('editing_profile_birthdate', "true");
};
Template.userCardTemplate.editing_avatar = function () {
    log_event('Template.profilePageTemplate.editing_avatar', LogLevel.Trace);
    return Session.equals('editing_profile_avatar', "true");
};
Template.userCardTemplate.editing_collaborators = function () {
    log_event('Template.profilePageTemplate.editing_collaborators', LogLevel.Trace);
    return Session.equals('editing_profile_collaborators', "true");
};
Template.userCardTemplate.editing_carewatch = function () {
    log_event('Template.profilePageTemplate.editing_carewatch', LogLevel.Trace);
    return Session.equals('editing_profile_carewatch_members', "true");
};
Template.userCardTemplate.events(
    okCancelEvents('#userCarewatchInput',
        {
            ok: function (value) {
                log_event('userCarewatchInput - ok', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.carewatch': [{address: value}] }});
                Session.set('editing_profile_carewatch_members', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userCarewatchInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_carewatch_members', "false");
            }
        })
);Template.userCardTemplate.events(
    okCancelEvents('#userCollaboratorsInput',
        {
            ok: function (value) {
                log_event('userCollaboratorsInput - ok', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.collaborators': [{address: value}] }});
                Session.set('editing_profile_collaborators', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userCollaboratorsInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_collaborators', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userAvatarInput',
        {
            ok: function (value) {
                log_event('userAvatarInput - ok', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.avatar': value }});
                Session.set('editing_profile_avatar', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userAvatarInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_avatar', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userDateOfBirthInput',
        {
            ok: function (value) {
                log_event('userDateOfBirthInput - ok', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.dateOfBirth': value }});
                Session.set('editing_profile_birthdate', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userDateOfBirthInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_birthdate', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userNameInput',
        {
            ok: function (value) {
                log_event('userNameInput - ok', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.name': value }});
                Session.set('editing_profile_name', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userNameInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_name', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userEmailInput',
        {
            ok: function (value) {
                log_event('userEmailInput - cancel', LogLevel.Trace);
                Meteor.users.update(Meteor.userId(), {$set: { emails: [{address: value }] }});
                Session.set('editing_profile_email', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userEmailInput - cancel', LogLevel.Trace);
                Session.set('editing_profile_email', "false");
            }
        })
);
Template.userCardTemplate.events({
    'dblclick .userEmailDisplay': function (evt, tmpl) {
        Session.set('editing_profile_email', "true");
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#profile-input-email"));
    },
    'click .userNameDisplay': function (evt, tmpl) {
        Session.set('editing_profile_name', "true");
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#profile-input-name"));
    },
    'click .userDateOfBirthDisplay': function (evt, tmpl) {
        Session.set('editing_profile_birthdate', "true");
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#profile-input-birth-date"));
    },
    'click .userAvatarDisplay': function (evt, tmpl) {
        Session.set('editing_profile_avatar', "true");
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#profile-input-avatar"));
    },
    'click .userCollaboratorsDisplay': function (evt, tmpl) {
        Session.set('editing_profile_collaborators', "true");
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#profile-input-collaborator"));
    },
    'click .carewatch-data .destroy': function (evt, tmpl) {
        if(confirm("Are you sure you want to remove " + this.name + " from your carewatch list?")){
            Meteor.users.update(this._id, {$pull: { 'profile.collaborators': {
                _id: Meteor.user()._id,
                name: Meteor.user().profile.name
            } }},function(){
                //console.log('write something to hipaa log here);
            });
            Meteor.users.update(Meteor.userId(), {$pull: { 'profile.carewatch': this }});
        }
    },
    'click .collaborators-data .destroy': function (evt, tmpl) {
        if(confirm("Are you sure you want to remove " + this.name + " from your list of collaborators?")){
            Meteor.users.update(this._id, {$pull: { 'profile.carewatch': {
                _id: Meteor.user()._id,
                name: Meteor.user().profile.name
            }}},function(){
                //console.log('write something to hipaa log here);
            });
            Meteor.users.update(Meteor.userId(), {$pull: { 'profile.collaborators': this }}, function(){});
        }
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
        log_event(err, LogLevel.Error);
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
        log_error(err,LogLevel.Error);
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
        log_event(err, LogLevel.Error);
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
        log_event(err, LogLevel.Error);
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
        log_event(err, LogLevel.Error);
    }
};
Template.userCardTemplate.user_collaborators = function () {
    try{
        // Meteor.user().profile breaks when user is logged out
        if(Meteor.user().profile){
            return Meteor.user().profile.collaborators;
        }else{
            return "List of carewatch members not available right now.";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
Template.userCardTemplate.user_carewatch = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.carewatch;
        }else{
            return "List of carewatch members not available right now.";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
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
        log_event(err, LogLevel.Error);
    }
};
Template.userCardTemplate.user_active_collaborator = function () {
    try{
        if(Meteor.user().profile.activeCollaborator){
            return Meteor.user().profile.activeCollaborator;
        }else{
            return "No active collaborator currently set.";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
Template.userCardTemplate.user_currentpage = function () {
    try{
        if(Meteor.user().profile.lastPage){
            return Meteor.user().profile.currentPage;
        }else{
            return "No active page set.";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
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

        // CONFLICT?
        // this wants to be Meteor.user().profile so the default image displays if there's no profile
        // but, I think it's also causing crashes elsewhere if the Meteor.
//        if(Meteor.user().profile){
//            src = $.trim(Meteor.user().profile.avatar);
//        }
//        log_event('profile avatar src: ' + src, LogLevel.Info);
        //return src;

    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
//Template.profilePageTemplate.user_json = function () {
//    var selectedUser = Meteor.user();
//    return JSON.stringify(selectedUser);
//};
//Template.profilePageTemplate.rendered = function(){
//    Session.set('json_content', JSON.stringify(Meteor.user()));
//};


// --------------------------------------------------------
// CAREWATCH

//Template.carewatchItem.carewatch_email = function () {
//    log_event('Template.carewatchItem.carewatch_email', LogLevel.Trace);
//    //return this.address;
//    return 'foo@hoo.com';
//};



// --------------------------------------------------------
// LOGGED IN, ETC

Template.profilePageTemplate.loggedIn = function () {
    if(Meteor.userId()){
        return true;
    }else{
        return false;
    }
};
// --------------------------------------------------------
// SELECT AVATAR - DRAG, DROP, & FILE SAVE FUNCTIONS



Template.userCardTemplate.rendered = function () {

    jQuery('#profilePage').css('min-height', window.innerHeight);

    // set up the filepicker.io drop_zone
    document.getElementById('drop_zone').addEventListener('mousedown', function(){
//        filepicker.pick(function(fpfile){
//            log_event('selected file: ' + fpfile.url);
//            //alert('You just uploaded '+fpfile.filename + '! '+ 'You can access the file at '+ fpfile.url);
//
//            // so, yeah, instead of saving the name of the local file to the mongo database
//            // we're just going to save the url from the filepicker.io service.
//            Meteor.users.update(Meteor.userId(), {$set: { 'profile.avatar': cleanName( fpfile.url ) }});
//        });
        //jQuery('#import_files_input').click();
    }, false);
};



