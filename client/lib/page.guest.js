Template.guestPageTemplate.rendered = function(){
    log_event("Template.guestPageTemplate.rendered",LogLevel.Signpost,this);


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
        load: true
    }, function(){
            alert('callback');
        }
    );


    if(!isMobile){

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
        Session.set('show_tutorial_overlay', true);

        //alert('click!');
        //createOverlay();

//        $("#moneyShot").overlay({
//                // custom top position
//                position: 'fixed',
//                top: (window.innerHeight / 2) - 275,
//                left: (window.innerWidth / 2) - 512,
//
//                // some mask tweaks suitable for facebox-looking dialogs
//                mask: {
//                    color: '#ebecff',
//                    loadSpeed: 200,
//                    opacity: 0.9
//                },
//
//                closeOnClick: true,
//                load: true
//        });


    }
});

