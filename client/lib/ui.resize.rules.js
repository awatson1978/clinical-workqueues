detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    console.log('detecting orientation: ' + window.orientation);
    resizeCommunityPageForLandscape();

    if(typeof window.onorientationchange != 'undefined'){
        if ( window.orientation == 0 ) {
            //Do Something In Portrait Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
        }
        else if ( window.orientation == 90 ) {
            //Do Something In Landscape Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
        }
        else if ( window.orientation == -90 ) {
            //Do Something In Landscape Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
        }
        else if ( window.orientation == 180 ) {
            //Do Something In Portrait Mode
            //alert('orientation change!');
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
        }
    }
}


function resizeCommunityPageForLandscape(){
    //if(window.innerWidth > 768){
    $('#communityInspectionBlock').removeClass('fullwidth padded');
    $('#communityMembersList').removeClass('fullwidth padded fullscreen-single-column-position');
    $('#communityInspectionBlock').removeClass('bottom-anchored');
    $('#communityInspectionColumn').removeClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('forty-percent-width');
    $('#communityMembersList').addClass('forty-percent-width');
    $('#communityInspectionBlock').addClass('first-column-position');
    $('#communityMembersList').addClass('second-column-position');
//    }else{
//        resizeCommunityPageForPortrait();
//    }
};
function resizeCommunityPageForPortrait(){
    $('#communityInspectionBlock').removeClass('forty-percent-width');
    $('#communityMembersList').removeClass('forty-percent-width');
    $('#communityInspectionBlock').removeClass('first-column-position');
    $('#communityMembersList').removeClass('second-column-position');

    $('#communityInspectionBlock').addClass('fullwidth padded');
    $('#communityMembersList').addClass('fullwidth padded fullscreen-single-column-position');

    $('#communityInspectionBlock').addClass('bottom-anchored');
    $('#communityInspectionColumn').addClass('fullwidth padded');
};