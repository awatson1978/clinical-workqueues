detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    if(typeof window.onorientationchange != 'undefined'){
        if ( window.orientation == 0 ) {
            //Do Something In Portrait Mode
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
        }
        else if ( window.orientation == 90 ) {
            //Do Something In Landscape Mode
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
        }
        else if ( window.orientation == -90 ) {
            //Do Something In Landscape Mode
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
        }
        else if ( window.orientation == 180 ) {
            //Do Something In Portrait Mode
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
        }
    }
}




function resizeCommunityPageForLandscape(){
    //document.body.setAttribute("class","landscape");
    console.log('resizing communityPage for landscape');
    $('#communityInspectionBlock').addClass('forty-percent-width');
    $('#communityMembersList').addClass('forty-percent-width');
    $('#communityInspectionBlock').addClass('first-column-position');
    $('#communityMembersList').addClass('second-column-position');

    //$('#communityInspectionBlock').css('width', '40%');
    //$('#communityMembersList').css('width', '40%');
    //$('#communityMembersList').css('left', (window.innerWidth * 0.6) + 'px);
    //$('#communityMembersList').css('top', 60 + 'px');
    //$('#userQuickViewPanel').css('width', '40%');
};
function resizeCommunityPageForPortrait(){
    //document.body.setAttribute("class","portrait");
    console.log('resizing communityPage for portrait');

};