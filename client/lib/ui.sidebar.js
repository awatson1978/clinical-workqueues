
Template.sidebarTemplate.sidebarIsVisible = function(){
    //if(Session.get('is_sidebar_available')){
        if(Session.get('appWidth') > 767){
            return Session.get('show_sidebar_panel');
        }else{
            //layoutWorkqueuesPageWithPanel();
            return false;
        }
    //}else{
    //    return false;
    //}
};
Template.sidebarTemplate.showButtonTiles = function(){
    if(Session.get('show_button_tiles')){
        return true;
    }else{
        return false;
    }
};

Template.sidebarTemplate.events({
    'click .sidebar-tile': function(){
        alert('this button could be configured to send data to and launch an existing applicatoin in *your* workflow.  Contact pentasyllabic.com to learn more.');
        //toggleTaskDetailPanel();
    },
    'touchmove #sidebarPane' : function (e){
        e.preventDefault();
    }
});

Template.sidebarTemplate.rendered = function(){
    try{
        if(Session.get('list_id') == undefined){
            Session.set('list_id', Lists.findOne()._id)
        }
    }catch(error){
        console.log(error);
    }
};
////////// Lists //////////

Template.listsTemplate.lists = function () {
    return Lists.find({}, {sort: {name: 1}});
};
//Template.lists.count = function () {
//    //TODO:  add tally of number of todos in a list
//    return Todos.find({list_id: this._id}).count();
//};

Template.listsTemplate.events({
    'mousedown .list': function (evt) { // select list
        Router.setList(this._id);
        Session.set('list_id', this._id);
        //alert(this._id);
    },
    'click .list': function (evt) {
        // prevent clicks on <a> from refreshing the page.
        evt.preventDefault();
    },
    'dblclick .list': function (evt, tmpl) { // start editing list name
        Session.set('editing_listname', this._id);
        Meteor.flush(); // force DOM redraw, so we can focus the edit field
        activateInput(tmpl.find("#list-name-input"));
    }
});
// Attach events to keydown, keyup, and blur on "New list" input box.
Template.listsTemplate.events(okCancelEvents(
    '#new-list',
    {
        ok: function (text, evt) {
            var id = Lists.insert({name: text});
            Router.setList(id);
            evt.target.value = "";
        }
    }));

Template.listsTemplate.events(okCancelEvents(
    '#list-name-input',
    {
        ok: function (value) {
            Lists.update(this._id, {$set: {name: value}});
            Session.set('editing_listname', null);
        },
        cancel: function () {
            Session.set('editing_listname', null);
        }
    }));

Template.listsTemplate.selected = function () {
    return Session.equals('list_id', this._id) ? 'selected' : '';
};

Template.listsTemplate.name_class = function () {
    return this.name ? '' : 'empty';
};

Template.listsTemplate.editing = function () {
    return Session.equals('editing_listname', this._id);
};



////////// Tag Filter //////////

// Pick out the unique tags from all todos in current list.
Template.tagFilterTemplate.tags = function () {
    var tag_infos = [];
    var total_count = 0;

    Todos.find({list_id: Session.get('list_id')}).forEach(function (todo) {
        _.each(todo.tags, function (tag) {
            var tag_info = _.find(tag_infos, function (x) { return x.tag === tag; });
            if (! tag_info)
                tag_infos.push({tag: tag, count: 1});
            else
                tag_info.count++;
        });
        total_count++;
    });

    tag_infos = _.sortBy(tag_infos, function (x) { return x.tag; });
    tag_infos.unshift({tag: null, count: total_count});

    return tag_infos;
};

Template.tagFilterTemplate.tag_text = function () {
    return this.tag || "All items";
};

Template.tagFilterTemplate.selected = function () {
    return Session.equals('tag_filter', this.tag) ? 'selected' : '';
};

Template.tagFilterTemplate.events({
    'mousedown .sidebar-tab': function () {
        if (Session.equals('tag_filter', this.tag))
            Session.set('tag_filter', null);
        else
            Session.set('tag_filter', this.tag);
    }
});
