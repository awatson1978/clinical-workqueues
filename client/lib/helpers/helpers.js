////////// Helpers for in-place editing //////////

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".

var okCancelEvents = function (selector, callbacks) {
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
                if (value)
                    ok.call(this, value, evt);
                else
                    cancel.call(this, evt);
            }
        };
    return events;
};

var activateInput = function (input) {
    input.focus();
    input.select();
};


// Generic template interface for user objects.

var genericUserDisplayObject = {
    userName: function() {
        return Meteor.user().profile.name;
    },
    userAvatar: function() {
        try{
            var src = "images/placeholder-240x240.gif";

            // CONFLICT?
            // this wants to be Meteor.user().profile so the default image displays if there's no profile
            // but, I think it's also causing crashes elsewhere if the Meteor.
            if(Meteor.user().profile){
                src = $.trim(Meteor.user().profile.avatar);
            }
            log_event('profile avatar src: ' + src, LogLevel.Info);
            return src;
        }
        catch(err){
            log_event(err, LogLevel.Error);
        }
    },
    isAdmin: function() {
        if(Meteor.user().profile.role == "Administrator"){
            return true;
        }else{
            return false;
        }
    }
};
