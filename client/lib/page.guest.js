Template.guestPageTemplate.rendered = function(){
    log_event("Template.guestPageTemplate.rendered",LogLevel.Signpost,this);
};
Template.guestPageTemplate.events({
    'click .synopsis-tab': function(){
        $('.card-container').addClass('hidden');
        $('.vision').addClass('hidden');
        $('.synopsis').removeClass('hidden');
        $('#moneyShotContainer').removeClass('hidden');
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
    'click .all-tab': function(){
        $('.card-container').removeClass('hidden');
        $('.vision').removeClass('hidden');
    },
    'click .moneyShot': function(){
        showImageOverlay('#day-of-glass-money-shot-34ratio');
    }
});

