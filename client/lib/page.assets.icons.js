

Template.iconAssetsPageTemplate.icon_list = function () {
    return CategoryIcons.find();
};
Template.iconAssetsPageTemplate.snomed_count = function () {
    return CategoryIcons.find().count();
};

Template.iconAssetsPageTemplate.events({
    'click .icon-item': function (evt, tmpl) {
        Session.set('is_modal_dialog', false);
        Session.set('pre_modal_sidebar_panel_state', null);
        Session.set('show_sidebar_panel',Session.get('pre_modal_sidebar_panel_state'));

        Todos.update(Session.get('selected_task_id'), {$set: { image: this.image }});

        showPage(Session.get('pre_modal_page'));
    }
});

Template.iconAssetTemplate.icon_image = function () {
    return this.image;
};

