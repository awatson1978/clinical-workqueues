
// --------------------------------------------------------
// CAREWATCH


Template.userCardTemplate.events(
    okCancelEvents('#userCarewatchInput',
        {
            ok: function (value) {
                console.log('userCarewatchInput - ok');
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.carewatch': [{address: value}] }});
                Session.set('editing_profile_carewatch_members', "false");
                //Meteor.flush(); // update DOM before focus
            },
            cancel: function () {
                console.log('userCarewatchInput - cancel');
                Session.set('editing_profile_carewatch_members', "false");
            }
        })
);
Template.userCardTemplate.editing_carewatch = function () {
    console.log('Template.profilePageTemplate.editing_carewatch');
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
        console.log(err);
    }
};
