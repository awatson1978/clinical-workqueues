function preventDefault(e) { e.preventDefault(); };
//document.addEventListener('touchmove', preventDefault, false);

Template.app_container.rendered = function () {
    jQuery(window).bind('touchmove', function(e){
        e.preventDefault();
    });
    jQuery(window).bind('pinch', function(e){
        alert('pinch');
    });
};
Template.app_container.resize = function(){
    return Session.get("last_resize");
};
Meteor.startup = function() {
    $(window).resize(function(evt) {
        Session.set("last_resize", new Date());
        detectOrientation();
    });
};
$('#community-members-list').unbind('touchmove');
//$('#community-members-list').removeEventListener('touchmove', preventDefault, false);