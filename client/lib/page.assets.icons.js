Template.iconAssetsPageTemplate.rendered = function (){

};


Template.iconAssetsPageTemplate.icon_list = function () {
    //log_event('Template.iconAssetsPageTemplate.snomed_reference', LogLevel.Trace);
    return CategoryIcons.find();
};
Template.iconAssetsPageTemplate.snomed_count = function () {
    //log_event('Template.iconAssetsPageTemplate.snomed_count: ' + Anatomy.find().count(), LogLevel.Trace);
    return CategoryIcons.find().count();
};

Template.iconAssetsPageTemplate.events({
    'click .icon-item': function (evt, tmpl) {
        Session.set('is_modal_dialog', false);
        Session.set('pre_modal_sidebar_panel_state', null);
        Session.set('show_sidebar_panel',Session.get('pre_modal_sidebar_panel_state'));
        //alert(Session.get('selected_task_id'));

        Todos.update(Session.get('selected_task_id'), {$set: { image: this.image }});

        showPage(Session.get('pre_modal_page'));

        //        if(Session.get('selecting_anatomy')){
        //            Todos.update(Session.get('selecting_anatomy'), {$set: { 'anatomy' :  this._id }});
        //            showPage('#historyPage');
        //        }else{
        //            $('#contentDrop').html(this.name);
        //            $('#contentDrop').append(this.image);
        //        }
    }
});

Template.iconAssetTemplate.icon_image = function () {
    return this.image;
};

