//--------------------------------------------------------------------
// set up commonly used helper functions

Template.communityPageTemplate.helpers(genericUserDisplayObject);
Template.communityInspectionColumn.helpers(genericUserDisplayObject);


//--------------------------------------------------------------------
// set up commonly used helpers


Template.communityPageTemplate.resize = function(){
    if(Session.get('show_sidebar_panel')){
        $('#communityInspectionBlock').css('width',window.innerWidth - 195);
        $('#communityInspectionBlock').css('left', (window.innerWidth - 195) * 0.05);
    }else{
        layoutAppWithoutSidebar();
    }
    return Session.get("appWidth");
};
Template.communityPageTemplate.events({
    'click .destroy': function (evt, tmpl) {
        Meteor.users.update(Meteor.userId(), {$pull: { 'profile.collaborators': this }});
    },
    'keyup #communitySearchInput': function (evt, tmpl) {
        Session.set('community_members_filter', $('#communitySearchInput').val());
        Meteor.flush();
    },
    'click #communitySearchInput': function(evt,tmpl){
        if($('#communitySearchInput').val() === 'search community members'){
            $('#communitySearchInput').val('');
        }
    }
});


//--------------------------------------------------------------------
// communite inspection column (left column)

Template.communityInspectionColumn.showQuickViewPanel = function () {
    log_event('Template.communityPageTemplate.showQuickViewPanel', LogLevel.Trace, this);
    return Session.get('show_quick_view_panel');
};
Template.communityInspectionColumn.rendered = function(){
    log_event("Template.communityInspectionColumn.rendered",LogLevel.Signpost,this);
};
Template.communityInspectionColumn.search_text_color = function(){
    if(Session.get('community_members_filter') === null){
        return "lightgray";
    }else{
        return "";
    }
};


//--------------------------------------------------------------------
// quickViewPanelTemplate


Template.userQuickViewCard.user_id = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    if(user){
        return user._id;
    }else{
        return false;
    }
};
Template.userQuickViewCard.user_name = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    return user.profile.name;
};
Template.userQuickViewCard.user_email = function () {
    var user = Meteor.users.findOne({ _id: Session.get('selected_community_member') });
    if(user.emails){
        return user.emails.address;
    }
};
Template.userQuickViewCard.user_avatar = function () {
    return Session.get('selected_community_member_avatar_path');
};

//--------------------------------------------------------------------
// taskDetailCardTemplate



Template.communityInspectionColumn.isBroadcastRecipient = function(){
    var isRecipient = false;
    if(isRecipient){
        return "";
    }else{
        return "hidden";
    }
};

Template.communityInspectionColumn.events({
    'touchmove #communityList' : function (e){
        e.preventDefault();
    },
    'click #userQuickViewPanel': function(evt){
        setActiveCollaborator(Session.get('selected_community_member'));
        showPage("#profilePage");
    }
});


//--------------------------------------------------------------------
// communite inspection column (right column)

Template.communityMembersList.communityUsers = function () {
    return Meteor.users.find();
    //return Meteor.users.find({'emails.address': { $regex: Session.get('community_members_filter'), $options: 'i' } }, {sort: {'profile.name': 1}});
};

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
    'click .user-card': function (e) {
        e.preventDefault();
        Session.set('json_content', JSON.stringify(this));
        Session.set('selected_community_member', this._id);
        Session.set('show_quick_view_panel', true);

        if(this.services && this.services.facebook){
            Session.set('selected_community_member_avatar_path', "http://graph.facebook.com/" + this.services.facebook.id + "/picture/?type=large");
        }else if(this.profile){
            Session.set('selected_community_member_avatar_path', $.trim(this.profile.avatar));
        }else{
            Session.set('selected_community_member_avatar_path', "/images/placeholder-240x240.gif");
        }
        Meteor.flush();
    },
    'click .transfer-icon': function (e) {
        setActiveCollaborator(this._id);
    }
});
Template.userItemTemplate.userEmail = function () {
    log_event('Template.userItemTemplate.userEmail', LogLevel.Trace, this);
    if(this.emails){
        return this.emails.address;
    }else{
        return 'Emails not available.';
    }
};
Template.userItemTemplate.userName = function () {
    log_event('Template.userItemTemplate.userName', LogLevel.Trace, this);
    if(this.emails){
        return this.profile.name;
    }else{
        return 'User name not available.';
    }
};
Template.userItemTemplate.userImage = function () {
    try{
        if(this.services && this.services.facebook){
            return "http://graph.facebook.com/" + this.services.facebook.id + "/picture/?type=large";
        }else if(this.profile){
            return $.trim(this.profile.avatar);
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }catch(error){
        catch_error('Template.userItemTemplate.userImage',error,LogLevel.Error,this);
    }
};


//--------------------------------------------------------------------
//--------------------------------------------------------------------
// HELPER FUNCTIONS

toInteger = function(number){
    return Math.round(
        Number(number)
    );
};



//--------------------------------------------------------------------
// Toggles

setActiveCollaborator = function(selectedUserId) {
    Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
    Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator':selectedUserId }});
};
toggleActiveCollaborator = function(selectedUserId) {
    if (selectedUserId === Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        setActiveCollaborator(selectedUserId);
    }
};
toggleCollaboratorsMembership = function(selectedUserId) {
    if (selectedUserId === Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
        Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator': selectedUserId }});
    }
};
toggleCarewatchMembership = function(userId) {
    if (selectedUserId === Meteor.user().profile.activeCollaborator) {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator': selectedUserId }});
    } else {
        Meteor.users.update(Meteor.userId(), {$unset:{ 'profile.activeCollaborator':'' }});
        Meteor.users.update(Meteor.userId(), {$set:{ 'profile.activeCollaborator': selectedUserId }});
    }
};
