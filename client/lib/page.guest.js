
// TODO: refactor 'guest_page' to guestPage

Template.guest_page.rendered = function(){
    log_event("Template.guest_page.rendered",LogLevel.Signpost,this);

    if(!isMobile){
        $(".moneyShot").overlay({
            // custom top position
            position: 'fixed',
            top: (window.innerHeight / 2) - 275,
            left: (window.innerWidth / 2) - 512,

            // some mask tweaks suitable for facebox-looking dialogs
            mask: {
                color: '#ebecff',
                loadSpeed: 200,
                opacity: 0.9
            },

            closeOnClick: true,
            load: false
        });
    }else{
        $(".moneyShot").overlay({
            // custom top position
            position: 'fixed',
            top: 0,
            left: 0,

            // some mask tweaks suitable for facebox-looking dialogs
            mask: {
                color: '#ebecff',
                loadSpeed: 200,
                opacity: 0.9
            },

            closeOnClick: true,
            load: false
        });
    }
};
Template.guest_page.events({
    'mousedown .simple_overlay':function(){
        $('.simple_overlay .close').click();
    }
});