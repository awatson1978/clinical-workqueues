Template.formTemplate.editing_name = function () {
    return Session.equals('editing_form_item1', "true");
};
Template.formTemplate.events(
    okCancelEvents('#formItem1Input',
        {
            ok: function (value) {
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.name': value }});
                Session.set('editing_form_item1', "false");
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_form_item1', "false");
            }
        })
);
Template.formTemplate.events({
    'click .userNameDisplay': function (evt, tmpl) {
        Session.set('editing_form_item1', "true");
        Meteor.flush();
        activateInput(tmpl.find("#form-item1-input"));
    }
});
Template.formTemplate.data_field1 = function () {
    if(Meteor.user().profile){
        return Meteor.user().profile.name;
    }else{
        return "User profile not created yet.";
    }
};

okCancelEvents = function (selector, callbacks) {
    var ok = callbacks.ok || function () {};
    var cancel = callbacks.cancel || function () {};

    var events = {};
    events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
        function (evt) {
            if (evt.type === "keydown" && evt.which === 27) {
                // escape = cancel
                cancel.call(this, evt);

            } else if (evt.type === "keyup" && evt.which === 13 ||
                evt.type === "focusout") {
                // blur/return/enter = ok/submit if non-empty
                var value = String(evt.target.value || "");
                if (value){
                    ok.call(this, value, evt);
                }else{
                    cancel.call(this, evt);
                }
            }
        };
    return events;
};

activateInput = function (input) {
    input.focus();
    input.select();
};

