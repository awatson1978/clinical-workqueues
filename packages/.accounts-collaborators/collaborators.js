Template.userCardTemplate.events(
    okCancelEvents('#userCollaboratorsInput',
        {
            ok: function (value) {
                log_event('userCollaboratorsInput - ok', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.collaborators': [{address: value}] }});
                Session.set('editing_profile_collaborators', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userCollaboratorsInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_collaborators', "false");
            }
        })
);
Template.userCardTemplate.editing_collaborators = function () {
    log_event('Template.profilePageTemplate.editing_collaborators', LogLevel.Trace, this);
    return Session.equals('editing_profile_collaborators', "true");
};

Template.userCardTemplate.events({
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
        catch_error('Template.userCardTemplate.user_collaborators', err, LogLevel.Error, this);
    }
};