Template.communityPageTemplate.helpers(genericUserDisplayObject);
Template.communityInspectionColumn.helpers(genericUserDisplayObject);

Template.communityInspectionColumn.rendered = function(){
    //$('#community-inspection-block').css('width',$('#community-members-list').width());
    if(isMobile){
        $('#communityPage').removeClass('no-touch');

//        $("#communityPage").bind("swipeleft", function(){
//            alert('swipeleft!');
//        });
//        $("#communityPage").bind("swiperight", function(){
//            alert('swipeleft!');
//        });

        //detectOrientation();
    }else{
//        if(window.innerWidth > 800){
//            resizeCommunityPageForLandscape();
//        }else{
//            resizeCommunityPageForPortrait();
//        }
    }
};



//Template.communityPageTemplate.resize = function(){
//  return Session.get('resize');
//};
Template.communityPageTemplate.events({
    'click .destroy': function (evt, tmpl) {
        Meteor.users.update(Meteor.userId(), {$pull: { 'profile.collaborators': this }});
    },
    'keyup #communitySearchInput': function (evt, tmpl) {
        Session.set('community_members_filter', $('#communitySearchInput').val());
        Meteor.flush();
    }
});
Template.communityPageTemplate.communityUsers = function () {
        return Meteor.users.find({'emails.address': { $regex: Session.get('community_members_filter'), $options: 'i' } });
};
Template.communityInspectionColumn.showQuickViewPanel = function () {
    log_event('Template.communityPageTemplate.showQuickViewPanel', LogLevel.Trace);
    return Session.get('show_quick_view_panel');
};

Template.communityPageTemplate.user_count = function () {
    log_event('Template.communityPageTemplate.user_count', LogLevel.Trace);
    return Meteor.users.find().count();
};


//--------------------------------------------------------------------
// quickViewPanelTemplate


Template.communityInspectionColumn.user_id = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    if(user){
        return user._id;
    }else{
        return false;
    }
}
Template.communityInspectionColumn.user_name = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    return user.profile.name;
}
Template.communityInspectionColumn.user_email = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    if(user.emails){
        return user.emails.address;
    }
}
Template.communityInspectionColumn.user_avatar = function () {
//    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
//    if(user.profile){
//        return user.profile.avatar;
//    }
    return Session.get('selected_community_member_avatar_path');
}

//--------------------------------------------------------------------
// taskDetailCardTemplate

Template.communityInspectionColumn.isBroadcastRecipient = function(){
    var isRecipient = false;
//    try{
//        Meteor.user().profile.pushRecipients.contains(Session.get('selected_community_member'));
//    }catch{
//
//    }
    if(isRecipient){
        return "";
    }else{
        return "hidden";
    }
};

Template.communityInspectionColumn.events({
    'click .transfer-icon': function (evt, tmpl) {
        toggleActiveCollaborator(Session.get('selected_community_member'));
    },
    'click .collaborator-icon': function (evt, tmpl) {




        alert("collaborator");
    },
    'click .carewatch-icon': function (evt, tmpl) {
        // TODO:  check if selected user's ID is currently in Meteor.user().profile.carewatch - if so, remove it

        // TODO:  add selected user's ID to Meteor.user().profile.carewatch
        alert("carewatch");
    }
});

//--------------------------------------------------------------------
// userItemTemplate


Template.userItemTemplate.events({
    'dblclick .user-card': function () {
        // first we update the logged in user's profile
        // that they have shared their data with another person
        Meteor.users.update(Meteor.userId(), {$addToSet: { 'profile.carewatch' : {
            _id: this._id,
            name: this.profile.name
        }}});
        log_hipaa_event("Added " + this.profile.name + " to carewatch list.", LogLevel.Hipaa, Meteor.user()._id);

        // then we update the other person's profile
        // and notify them that they now have access to this persons profile
        Meteor.users.update(this._id, {$addToSet: { 'profile.collaborators': {
            _id: Meteor.userId(),
            name: Meteor.user().profile.name
        }}}, function(){
            Meteor.flush();
            hidePages();
            showPage('#communityPage');
        });
        log_hipaa_event("Permission granted to view health history belonging to " + Meteor.user().profile.name + ".", LogLevel.Hipaa, this._id);

    },
    'click .user-card': function () {

        Session.set('json_content', JSON.stringify(this));
        Session.set('selected_community_member', this._id);
        Session.set('show_quick_view_panel', true);
        Session.set('selected_community_member_avatar_path', this.profile.avatar);
        //$('#userCardImage').attr('src', '/images/placeholder-240x240.gif');

        Meteor.flush();
    },
    'click .transfer-icon': function () {
        toggleActiveCollaborator(this._id);
        //alert("transfer: " + JSON.stringify(this));
    },
    'click .collaborator-icon': function () {
        //alert("collaborator: " + JSON.stringify(this));
    },
    'click .carewatch-icon': function () {
        //alert("carewatch: " + JSON.stringify(this));
    }
});
Template.userItemTemplate.userEmail = function () {
    log_event('Template.userItemTemplate.userEmail', LogLevel.Trace);
    if(this.emails){
        return this.emails.address;
    }else{
        return 'Emails not available.'
    }
    //return JSON.stringify(this);
};
Template.userItemTemplate.userName = function () {
    log_event('Template.userItemTemplate.userName', LogLevel.Trace);
    if(this.emails){
        return this.profile.name;
    }else{
        return 'User name not available.'
    }
};
var isCarewatched = false;
Template.userItemTemplate.isCarewatched = function () {
    try{
        isCarewatched = false;
        for(var i = 0; i < Meteor.user().profile.carewatch.length; i++) {
            if (Meteor.user().profile.carewatch[i]._id == this._id) {
                isCarewatched = true;
            }
        }
        if(isCarewatched){
            return "red";
        }else{
            return "gray";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
var isCollaborator = false;
Template.userItemTemplate.isCollaborator = function () {
    try{
        isCollaborator = false;
        for(var i = 0; i < Meteor.user().profile.collaborators.length; i++) {
            if (Meteor.user().profile.collaborators[i]._id == this._id) {
                isCollaborator = true;
            }
        }
        if(isCollaborator){
            return "red";
        }else{
            return "gray";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
Template.userItemTemplate.isActiveCollaborator = function () {
    try{
        //TODO:  check Meteor.user().profile.activeCollaboator and return "selected" or null
        if(Meteor.user().profile.activeCollaborator == this._id){
            return "red";
        }else{
            return "gray";
        }
    }
    catch(err){
        log_event(err, LogLevel.Error);
    }
};
Template.userItemTemplate.userImage = function () {
    log_event('Template.userItemTemplate.user_image', LogLevel.Trace);
    var src = "images/placeholder-240x240.gif";
    if(this.profile){
        src = $.trim(this.profile.avatar);
    }
    log_event('profile avatar src: ' + src, LogLevel.Info);
    return src;
};


//--------------------------------------------------------------------
//--------------------------------------------------------------------
// HELPER FUNCTIONS

function toInteger(number){
    return Math.round(
        Number(number)
    );
};



//--------------------------------------------------------------------
// Toggles

function toggleActiveCollaborator(selectedUserId) {
    // TODO:  check if selected user's ID is currently the active collaborator - if so, remove it
    if (selectedUserId == Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        // TODO:  remove any active collaborator in the user profile
        // TODO:  add selected user's ID to profile's active collaborator field
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
        Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator': selectedUserId }});
    }
}
function toggleCollaboratorsMembership(selectedUserId) {
    // TODO:  check if selected user's ID is currently the active collaborator - if so, remove it
    if (selectedUserId == Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        // TODO:  remove any active collaborator in the user profile
        // TODO:  add selected user's ID to profile's active collaborator field
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
        Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator': selectedUserId }});
    }
}
function toggleCarewatchMembership(userId) {
    // TODO:  check if selected user's ID is currently the active collaborator - if so, remove it
    if (selectedUserId == Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        // TODO:  remove any active collaborator in the user profile
        // TODO:  add selected user's ID to profile's active collaborator field
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
        Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator': selectedUserId }});
    }
}
