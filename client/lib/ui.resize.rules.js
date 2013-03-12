detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    console.log('detecting orientation: ' + window.orientation);
    //resizeCommunityPageForLandscape();

    if(typeof window.onorientationchange != 'undefined'){
        if ( window.orientation == 0 ) {
            //Do Something In Portrait Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
        }
        else if ( window.orientation == 90 ) {
            //Do Something In Landscape Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForLandscape();
            }
        }
        else if ( window.orientation == -90 ) {
            //Do Something In Landscape Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForLandscape();
            }
        }
        else if ( window.orientation == 180 ) {
            //Do Something In Portrait Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
        }
    }
}


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
    $('#userProfileCard').addClass('userProfileCard-landscape-layout');
    $('#userProfileCard').removeClass('userProfileCard-portrait-layout');
};
function resizeProfilePageForPortrait(){
    //TODO: set userProfileCardExtended width the same as userProfileCard
    $('#userProfileCard').addClass('userProfileCard-portrait-layout');
    $('#userProfileCard').removeClass('userProfileCard-landscape-layout');
};