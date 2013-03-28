
//-----------------------------------------------------
// SESSION TOGGLE FUNCTIONS

function toggleJsonPanel(){
    if(Session.get('display_profile_json_panel')){
        Session.set('display_profile_json_panel',false);
    }else{
        Session.set('display_profile_json_panel',true);
    }
}
function toggleButtonVisibility(){
    if(Session.get('show_button_tiles')){
        Session.set('show_button_tiles',false);
    }else{
        Session.set('show_button_tiles',true);
    }
}

//--------------------------------------------------------------


function toggleSidebarVisibility(){
    // we don't want to display the sidebar on narrow pages
    // there just isn't enough room
    if(window.innerWidth > 768){
        if(Session.get('show_sidebar_panel')){
            Session.set('show_sidebar_panel',false);
            layoutAppWithoutSidebar();
        }else{
            Session.set('show_sidebar_panel',true);
            layoutAppWithSidebar();
        }
    }
}
function setSidebarVisibility(){
    if(Session.get('is_sidebar_available')){
        if(Session.get('show_sidebar_panel')){
            layoutAppWithSidebar();
        }else{
            layoutAppWithoutSidebar();
        }
    }else{
        layoutAppWithoutSidebar();
    }
}
function layoutAppWithSidebar() {
    console.log('layoutAppWithSidebar();');

    $('#mainLayoutPane').removeClass('sidebar-hidden-landscape-layout');

    $('#mainLayoutPane').addClass('sidebar-shown-landscape-layout');
    $('#mainLayoutPane').css('width', window.innerWidth - 195);
}
function layoutAppWithoutSidebar() {
    console.log('layoutAppWithoutSidebar();');
    $('#mainLayoutPane').removeClass('sidebar-shown-landscape-layout');

    $('#mainLayoutPane').addClass('sidebar-hidden-landscape-layout');
    $('#mainLayoutPane').css('width', window.innerWidth);
}

//--------------------------------------------------------------

function toggleTaskDetailPanel(){
    if(Session.get('show_task_detail_panel')){
        Session.set('show_task_detail_panel', false);
        layoutAppWithoutDetailedTask();
    }else{
        Session.set('show_task_detail_panel', true);
        layoutAppWithDetailedTask();
    }
}
function setTaskDetailVisibility(){
    if(Session.get('show_task_detail_panel')){
        layoutAppWithDetailedTask();
    }else{
        layoutAppWithoutDetailedTask();
    }
}
function layoutAppWithDetailedTask(){
    $('#new-todo-box').removeClass('hidden');
    $('#items-view').css('padding-bottom','260px');
}
function layoutAppWithoutDetailedTask(){
    $('#new-todo-box').addClass('hidden');
    $('#items-view').css('padding-bottom','0px');
}
