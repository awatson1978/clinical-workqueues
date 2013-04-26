hidePages = function(){
    try{
        $('.page').addClass('hidden');
    }catch(err){
        console.log(err);
    }
}

showPage = function(page){
    try{
        hidePages();
        $(page).removeClass('hidden');
        Session.set('current_page', page);
        if(isMobile){
            detectOrientation();
        }
        //parseBreadCrumbs(page);
    }catch(err){
        console.log(err);
    }
}
showHomePage = function(){
    try{
        showPage("#workqueuesPage");
    }catch(err){
        console.log(err);
    }
}
showCurrentSessionPage = function(){
    try{
        if(Session.get('current_page') != null){
            showPage(Session.get('current_page'));
        }else{
            showHomePage();
        }
    }catch(err){
        console.log(err);
    }
}
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
}


