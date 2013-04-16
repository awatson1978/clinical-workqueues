Session.set('show_tutorial_overlay', false);
Session.set('show_image_overlay', false);

Template.tutorialOverlayTemplate.isVisible = function(){
    if(Session.get('show_tutorial_overlay')){
        return true;
    }else if (Session.get('show_image_overlay')){
        return true
    }else{
        return false;
    }
};

Template.tutorialOverlayTemplate.events({
    'click .overlay-mask': function(evt){
        Session.set('show_tutorial_overlay', false);
    }
});

