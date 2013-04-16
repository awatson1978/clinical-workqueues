Template.guestPageTemplate.rendered = function(){
    log_event("Template.guestPageTemplate.rendered",LogLevel.Signpost,this);
};
Template.guestPageTemplate.events({
    // TODO:  hide elements on page load by default
    // TODO:  moneyShot should display on synopsis and roadmap
    // TODO:  fix overlay so it works repeatdely
    // TODO:  factor out overlay into package
    // TODO:  move if/then isMobile code into event handler

    'click .synopsis-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.synopsis').removeClass('hidden');
    },
    'click .features-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.features').removeClass('hidden');
    },
    'click .vision-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').removeClass('hidden');
    },
    'click .roadmap-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.roadmap').removeClass('hidden');
    },
    'click .accounts-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.accounts').removeClass('hidden');
    },
    'click .betatest-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.betatest').removeClass('hidden');
    },
    'click .moneyShot': function(){
        showImageOverlay($('#day-of-glass-money-shot-34ratio').attr('src'));
    }
});

