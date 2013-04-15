detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    console.log('detecting orientation: ' + window.orientation);
    //resizeCommunityPageForLandscape();

    if(typeof window.onorientationchange != 'undefined'){
        if ( window.orientation == 0 ) {
            if(Session.equals('current_page', "#workqueuesPage")){
                //$('.new-task-container').css('margin-left','0');
                //$('.new-task-container').css('margin-top','0');
            }
            else if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation == 90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation == -90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation == 180 ) {
            if(Session.equals('current_page', "#workqueuesPage")){
                //$('.new-task-container').css('margin-left','0');
                //$('.new-task-container').css('margin-top','0');
            }
            else if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
    }
}




//-----------------------------------------------------
// LANDSCAPE/PORTRAIT FUNCTIONS


function resizeCommunityPageForLandscape(){
    $('#communityInspectionBlock').removeClass('fullwidth padded');
    $('#communityInspectionBlock').removeClass('bottom-anchored');
    $('#communityInspectionColumn').removeClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('forty-percent-width');
    $('#communityInspectionBlock').addClass('first-column-position');
};
function resizeCommunityPageForPortrait(){
    $('#communityInspectionBlock').removeClass('forty-percent-width');
    $('#communityInspectionBlock').removeClass('first-column-position');

    $('#communityInspectionBlock').addClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('bottom-anchored');
    $('#communityInspectionColumn').addClass('fullwidth padded');
};

function resizeProfilePageForLandscape(){
    //TODO: set userProfileCardExtended width the same as userProfileCard
    //$('#userProfileCard').addClass('userProfileCard-landscape-layout');
    //$('#userProfileCard').removeClass('userProfileCard-portrait-layout');
};
function resizeProfilePageForPortrait(){
    //TODO: set userProfileCardExtended width the same as userProfileCard
    //$('#userProfileCard').addClass('userProfileCard-portrait-layout');
    //$('#userProfileCard').removeClass('userProfileCard-landscape-layout');
};





//-----------------------------------------------------
// Controls for the JSON inspection and debugging panel

Template.jsonContentPanelTemplate.showJsonPanel = function(){
    return Session.get('show_profile_json_panel');
};
Template.jsonContentPanelTemplate.jsonData = function(){
    return Session.get('json_content');
};
