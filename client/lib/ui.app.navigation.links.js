hidePages = function(){
    console.log('hiding pages');
    $('.page').addClass('hidden');
}

showPage = function(page){
    hidePages();
    $(page).removeClass('hidden');
    Session.set('current_page', page);
    if(isMobile){
        detectOrientation();
    }
    //parseBreadCrumbs(page);
}
showHomePage = function(){
    showPage("#workqueuesPage");
}
showCurrentSessionPage = function(){
    showPage(Session.get('current_page'));
}
parseBreadCrumbs = function(page){
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
}


