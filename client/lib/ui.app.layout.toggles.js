Template.appContainerTemplate.rendered = function(){
    if(isMobile){
        $('.touch-trigger').removeClass('touch-disabled');
    }
}

//-----------------------------------------------------
// SESSION TOGGLE FUNCTIONS

toggleJsonPanel = function(){
    if(Session.get('show_profile_json_panel')){
        Session.set('show_profile_json_panel',false);
    }else{
        Session.set('show_profile_json_panel',true);
    }
}
toggleButtonVisibility = function(){
    if(Session.get('show_button_tiles')){
        Session.set('show_button_tiles',false);
    }else{
        Session.set('show_button_tiles',true);
    }
}

//--------------------------------------------------------------


toggleSidebarVisibility = function(){
    // we don't want to display the sidebar on narrow pages
    // there just isn't enough room
    if(window.innerWidth > 767){
        if(Session.get('show_sidebar_panel')){
            Session.set('show_sidebar_panel',false);
            layoutAppWithoutSidebar();
        }else{
            Session.set('show_sidebar_panel',true);
            layoutAppWithSidebar();
        }
    }
}
setSidebarVisibility = function(){
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
layoutAppWithSidebar = function() {
    console.log('layoutAppWithSidebar();');

    $('#mainLayoutPane').removeClass('sidebar-hidden-landscape-layout');

    $('#mainLayoutPane').addClass('sidebar-shown-landscape-layout');
    $('#mainLayoutPane').css('width', window.innerWidth - 195);
}
layoutAppWithoutSidebar = function() {
    console.log('layoutAppWithoutSidebar();');
    $('#mainLayoutPane').removeClass('sidebar-shown-landscape-layout');

    $('#mainLayoutPane').addClass('sidebar-hidden-landscape-layout');
    $('#mainLayoutPane').css('width', window.innerWidth);
}

//--------------------------------------------------------------

toggleTaskDetailPanel = function(){
    if(Session.get('show_task_detail_panel')){
        Session.set('show_task_detail_panel', false);
        layoutAppWithoutDetailedTask();
    }else{
        Session.set('show_task_detail_panel', true);
        layoutAppWithDetailedTask();
    }
}
setTaskDetailVisibility = function(){
    if(Session.get('show_task_detail_panel')){
        layoutAppWithDetailedTask();
    }else{
        layoutAppWithoutDetailedTask();
    }
}
layoutAppWithDetailedTask = function(){
    $('#new-todo-box').removeClass('hidden');
    $('#items-view').css('padding-bottom','260px');
}
layoutAppWithoutDetailedTask = function(){
    $('#new-todo-box').addClass('hidden');
    $('#items-view').css('padding-bottom','0px');
}
