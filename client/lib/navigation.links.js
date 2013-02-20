function hidePages(){
    console.log('hiding pages');
    $('.page').addClass('hidden');
}

function showPage(page){
    hidePages();
    $(page).removeClass('hidden');
    Session.set('current_page', page);
    Session.set('json_content', page);
    //console.log('current page: ' + page);
    //parseBreadCrumbs(page);
}
function showHomePage(){
   //if(Meteor.userId()){
        showPage("#main-pane");
    //}else{
    //    showPage("#guest_page");
    //}
}
function showCurrentSessionPage(){
    showPage(Session.get('current_page'));
}
function parseBreadCrumbs(page){
    switch(page){
    case '#hipaaPage':
            $('#breadCrumbLink').html('HIPAA Audit');
            break;
    case '#newsPage':
        $('#breadCrumbLink').html('Carewatch');
        break;
    case '#historyPage':
        $('#breadCrumbLink').html('History');
        break;
    case '#communityPage':
        $('#breadCrumbLink').html('Community');
        break;
    case '#profilePage':
        $('#breadCrumbLink').html('Profile');
        break;
    case '#snomedPage':
        if(Session.get('selecting_anatomy')){
            $('#breadCrumbLink').html('Select the Anatomy of Interest');
        }else{
            $('#breadCrumbLink').html('Snomed Anatomy (Alpha)');
        }
        break;
    case '#icd10Page':
        $('#breadCrumbLink').html('International Classificaiton of Diseases');
        break;
    default:
        $('#breadCrumbLink').html('');
        //alert(page);
    }
}

