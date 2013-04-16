
// --------------------------------------------------------
// CAREWATCH

//Template.carewatchItem.carewatch_email = function () {
//    log_event('Template.carewatchItem.carewatch_email', LogLevel.Trace, this);
//    //return this.address;
//    return 'foo@hoo.com';
//};
Template.userCardTemplate.events(
    okCancelEvents('#userCarewatchInput',
        {
            ok: function (value) {
                log_event('userCarewatchInput - ok', LogLevel.Trace, this);
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.carewatch': [{address: value}] }});
                Session.set('editing_profile_carewatch_members', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                log_event('userCarewatchInput - cancel', LogLevel.Trace, this);
                Session.set('editing_profile_carewatch_members', "false");
            }
        })
);
Template.userCardTemplate.editing_carewatch = function () {
    log_event('Template.profilePageTemplate.editing_carewatch', LogLevel.Trace, this);
    return Session.equals('editing_profile_carewatch_members', "true");
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
        catch_error('Template.userCardTemplate.user_carewatch', err, LogLevel.Error, this);
    }
};
