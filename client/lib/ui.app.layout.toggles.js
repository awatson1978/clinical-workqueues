
//-----------------------------------------------------
// SESSION TOGGLE FUNCTIONS

function toggleJsonPanel(){
    if(Session.get('display_profile_json_panel')){
        Session.set('display_profile_json_panel',false);
    }else{
        Session.set('display_profile_json_panel',true);
    }
}
function toggleTaskDetailPanel(){
    if(Session.get('show_task_detail_panel')){
        Session.set('show_task_detail_panel',false);
        $('#new-todo-box').removeClass('hidden');
    }else{
        Session.set('show_task_detail_panel',true);
        $('#new-todo-box').addClass('hidden');
    }
}
function toggleSidebarVisibility(){
    if(Session.get('show_sidebar_panel')){
        Session.set('show_sidebar_panel',false);
        layoutWorkqueuesPageWithoutPanel();
    }else{
        Session.set('show_sidebar_panel',true);
        layoutWorkqueuesPageWithPanel();
    }
}
function setSidebarVisibility(){
    if(Session.get('show_sidebar_panel')){
        layoutWorkqueuesPageWithPanel();
    }else{
        layoutWorkqueuesPageWithoutPanel();
    }
}
function toggleButtonVisibility(){
    if(Session.get('show_button_tiles')){
        Session.set('show_button_tiles',false);
    }else{
        Session.set('show_button_tiles',true);
    }
}

