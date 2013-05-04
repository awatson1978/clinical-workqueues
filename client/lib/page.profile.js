//-----------------------------------------------------------------
// profilePageTemplate

Template.profilePageTemplate.rendered = function(){
    console.log("Template.profilePageTemplate.rendered");
};


Template.profilePageTemplate.receivedNewAlert = function(){
    try{
        return monitorDropbox();
    }catch(error){
        console.log(error);
    }
};


//-----------------------------------------------------------------
// userCardTemplate

Template.userCardTemplate.rendered = function () {
    try{
        $('#profilePage').css('min-height', window.innerHeight);
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.resize = function(){
    try{
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
    }catch(error){
        console.log(error);
    }
};


Template.userCardTemplate.editing_email = function () {
    try{
        console.log('Template.profilePageTemplate.editing_email');
        return Session.equals('editing_profile_email', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_name = function () {
    try{
        console.log('Template.profilePageTemplate.editing_name');
        return Session.equals('editing_profile_name', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_birthdate = function () {
    try{
        console.log('Template.profilePageTemplate.editing_birthdate');
        return Session.equals('editing_profile_birthdate', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_avatar = function () {
    try{
        console.log('Template.profilePageTemplate.editing_avatar');
        return Session.equals('editing_profile_avatar', "true");
    }catch(error){
        console.log(error);
    }
};



Template.userCardTemplate.events(
    okCancelEvents('#userAvatarInput',
        {
            ok: function (value) {
                console.log('userAvatarInput - ok');
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.avatar': value }});
                Session.set('editing_profile_avatar', "false");
                Meteor.flush();
            },
            cancel: function () {
                console.log('userAvatarInput - cancel');
                Session.set('editing_profile_avatar', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userDateOfBirthInput',
        {
            ok: function (value) {
                console.log('userDateOfBirthInput - ok');
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.dateOfBirth': value }});
                Session.set('editing_profile_birthdate', "false");
                Meteor.flush();
            },
            cancel: function () {
                console.log('userDateOfBirthInput - cancel');
                Session.set('editing_profile_birthdate', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userNameInput',
        {
            ok: function (value) {
                console.log('userNameInput - ok');
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.name': value }});
                Session.set('editing_profile_name', "false");
                Meteor.flush();
            },
            cancel: function () {
                console.log('userNameInput - cancel');
                Session.set('editing_profile_name', "false");
            }
        })
);
Template.userCardTemplate.events(
    okCancelEvents('#userEmailInput',
        {
            ok: function (value) {
                console.log('userEmailInput - cancel');
                Meteor.users.update(Meteor.userId(), {$set: { emails: [{address: value }] }});
                Session.set('editing_profile_email', "false");
                Meteor.flush();
            },
            cancel: function () {
                console.log('userEmailInput - cancel');
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
            return "User profile not created yet.";
        }
    }
    catch(err){
        console.log(err);
    }
};
Template.userCardTemplate.user_id = function () {
    try{
        if(Meteor.user()){
            return Meteor.user()._id;
        }else{
            return "UserId not found.";
        }
    }
    catch(err){
        console.log(err);
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
        console.log(err);
    }
};
Template.userCardTemplate.user_birthdate = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.dateOfBirth;
        }else{
            return "User profile not created yet.";
        }
    }
    catch(err){
        console.log(err);
    }
};
Template.userCardTemplate.user_avatar = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.avatar;
        }else{
            return "User profile not created yet.";
        }
    }
    catch(err){
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    }
};






//----------------------------------------------------------------
// active collaborator card

Template.activeCollaboratorCardTemplate.events({
    'click #activeCollaboratorProfileCard': function(){
        showPage("#communityPage");
    }
});

Template.activeCollaboratorCardTemplate.collaborator_avatar = function () {
    try{
        if(Meteor.user().profile.activeCollaborator){
            return Meteor.users.findOne(Meteor.user().profile.activeCollaborator).profile.avatar;
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }
    catch(err){
        console.log(err);
    }
};
Template.activeCollaboratorCardTemplate.collaborator_birthdate = function () {
    try{
        if(Meteor.user().profile.birthdate){
            return Meteor.users.findOne(Meteor.user().profile.activeCollaborator).profile.birthdate;
        }else{
            return "----/--/--";
        }
    }
    catch(err){
        console.log(err);
    }
};
Template.activeCollaboratorCardTemplate.collaborator_name = function () {
    try{
        if(Meteor.user().profile.name){
            return Meteor.users.findOne(Meteor.user().profile.activeCollaborator).profile.name;
        }else{
            return "System Ghost";
        }
    }
    catch(err){
        console.log(err);
    }
};


//----------------------------------------------------------------
// sidebar



Template.profilePageSidebarTemplate.events({
    'click .object-inspector-tab': function(){
        toggleJsonPanel();
    },
    'click .collaborators-tab': function(){
        if(Session.get('show_active_collaborator_card')){
            Session.set('show_active_collaborator_card', false);
        }else{
            Session.set('show_active_collaborator_card', true);
        }
    },
    'click .hipaa-audit-tab': function(){
        if(Session.get('show_hipaa_audit_log_card')){
            Session.set('show_hipaa_audit_log_card', false);
        }else{
            Session.set('show_hipaa_audit_log_card', true);
        }
    }

});
Template.profilePageSidebarTemplate.json_inspector_selected = function(){
    try{
        return (Session.get('show_profile_json_panel') ? "selected" : "");
    }catch(error){
        console.log(error);
    }
};
Template.profilePageSidebarTemplate.colaborators_selected = function(){
    try{
        return (Session.get('show_active_collaborator_card') ? "selected" : "");
    }catch(error){
        console.log(error);
    }
};
Template.profilePageSidebarTemplate.hipaa_log_selected = function(){
    try{
        return (Session.get('show_hipaa_audit_log_card') ? "selected" : "");
    }catch(error){
        console.log(error);
    }
};

Template.profilePageTemplate.isActiveCollaboratorVisible = function(){
    try{
        return Session.get('show_active_collaborator_card');
    }catch(error){
        console.log(error);
    }
};
Template.profilePageTemplate.isHipaaAuditLogVisible = function(){
    try{
        return Session.get('show_active_collaborator_card');
    }catch(error){
        console.log(error);
    }
};

