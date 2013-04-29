hidePages = function(){
    try{
        $('.page').addClass('hidden');
    }catch(err){
        console.log(err);
    }
};

showPage = function(page){
    console.log('showPage(' + page + ');');
    try{
        if(Meteor.userId()){
            hidePages();
            $(page).removeClass('hidden');
            Session.set('current_page', page);
            if(isMobile){
                detectOrientation();
            }
            //parseBreadCrumbs(page);
        }else{
            showPage("#guestPage");
        }
    }catch(err){
        console.log(err);
    }
};
showHomePage = function(){
    console.log('showHomePage();');
    try{
        if(Meteor.userId()){
            showCurrentSessionPage();
            //showPage("#workqueuesPage");
        }else{
            showPage("#guestPage");
        }
    }catch(err){
        console.log(err);
    }
};
showCurrentSessionPage = function(){
    console.log('showCurrentSessionPage();');
    try{
        if(Meteor.userId()){
            if(Session.get('current_page') !== null){
                showPage(Session.get('current_page'));
            }else{
                showPage("#workqueuesPage");
            }
        }else{
            showPage("#guestPage");
        }
    }catch(err){
        console.log(err);
    }
};
parseBreadCrumbs = function(page){
    try{
        switch(page){
            case '#hipaaPage':
                $('#appTitle').html('HIPAA Audit');
                break;
            case '#profilePage':
                $('#appTitle').html('Profile');
                break;
            default:
                $('#breadCrumbLink').html('clinical-workqueues.herokuapp.com');
        }
    }catch(err){
        console.log(err);
    }
};

