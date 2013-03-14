////////// Todos //////////


//----------------------------------------------------------------------
Template.dashboardPageTemplate.rendered = function(){
    Session.set('show_sidebar_panel',true);
    layoutWorkqueuesPageWithPanel();

    $('.d3chart').css('height', '200px');


    renderSunburst();
    renderBarChart();

//    self.node = self.find("#barGraphChart svg");
//    if (! self.handle) {
//        self.handle = Meteor.autorun(function(){
//
//
//
//        });
//    };
};

Template.todos.any_list_selected = function () {
    if(Session.equals('list_id', undefined)){
        return false;
    }else{
        return !Session.equals('list_id', null);
    };
};

Template.todos.events(okCancelEvents(
    '#new-todo',
    {
        ok: function (text, evt) {
            console.log('ok called on new todo item');
            var tag = Session.get('tag_filter');
            console.log('tags: ' + tag);

//            Todos.insert({
//                text: text,
//                list_id: Session.get('list_id'),
//                done: false,
//                timestamp: (new Date()).getTime(),
//                tags: tag ? [tag] : []
//            });
            console.log('text.length: ' + text.length);
            if (text.length) {
                console.log('text: ' + text);
                console.log('list_id: ' + Session.get('list_id'));
                console.log('owner: ' + Meteor.userId());

                Meteor.call('createQuestion', {
                    text: text,
                    list_id: Session.get('list_id'),
                    done: false,
                    timestamp: (new Date()).getTime(),
                    tags: tag ? [tag] : [],
                    owner: Meteor.userId,
                    tags: tag ? [tag] : [],
                    public: 'public'
                }, function (error, todo) {
                    console.log('error: ' + error);
                    console.log('todo: ' + todo);
//                    if (! error) {
//                        Session.set("selected", todo);
//                        if (! public && Meteor.users.find().count() > 1)
//                            openInviteDialog();
//                    }
                });
                //Session.set("showCreateDialog", false);
            } else {
                Session.set("createError",
                    "It needs a title and a description, or why bother?");
            }

            evt.target.value = '';
        }
    })
);


Template.todos.todos = function () {
    // Determine which todos to display in main pane,
    // selected based on list_id and tag_filter.

    var list_id = Session.get('list_id');
    console.log('list_id:' + Session.get('list_id'));

    if (!list_id)
        return {};

    var sel = {list_id: list_id};
    var tag_filter = Session.get('tag_filter');
    if (tag_filter)
        sel.tags = tag_filter;

    return Todos.find(sel, {sort: {timestamp: 1}});
};

Template.todo_item.tag_objs = function () {
    var todo_id = this._id;
    return _.map(this.tags || [], function (tag) {
        return {todo_id: todo_id, tag: tag};
    });
};

Template.todo_item.done_class = function () {
    return this.done ? 'done' : '';
};

Template.todo_item.done_checkbox = function () {
    return this.done ? 'checked="checked"' : '';
};

Template.todo_item.editing = function () {
    return Session.equals('editing_itemname', this._id);
};

Template.todo_item.adding_tag = function () {
    return Session.equals('editing_addtag', this._id);
};

Template.todo_item.events({
    'click .todo': function(){
        //toggleTaskDetailPanel();
        Session.set('selected_task_id', this._id);
        Session.set('selected_task_done_status', this.done);
        Session.set('selected_task_text', this.text);
    },
    'dblclick .todo': function(){
        //toggleTaskDetailPanel();
        Session.set('show_task_detail_panel', true);
    },
    'click .check': function () {
        Todos.update(this._id, {$set: {done: !this.done}});
    },

    'click .destroy': function () {
        Todos.remove(this._id);
    },

    'click .addtag': function (evt, tmpl) {
        Session.set('editing_addtag', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#edittag-input"));
    },

    'dblclick .display .todo-text': function (evt, tmpl) {
        Session.set('editing_itemname', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#todo-input"));
    },
    'click .remove': function (evt) {
        var tag = this.tag;
        var id = this.todo_id;

        evt.target.parentNode.style.opacity = 0;
        // wait for CSS animation to finish
        Meteor.setTimeout(function () {
            Todos.update({_id: id}, {$pull: {tags: tag}});
        }, 300);
    }
});

Template.todo_item.events(okCancelEvents(
    '#todo-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$set: {text: value}});
            Session.set('editing_itemname', null);
        },
        cancel: function () {
            Session.set('editing_itemname', null);
        }
    }));

Template.todo_item.events(okCancelEvents(
    '#edittag-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$addToSet: {tags: value}});
            Session.set('editing_addtag', null);
        },
        cancel: function () {
            Session.set('editing_addtag', null);
        }
    }));


//----------------------------------------------------------------------------------

Template.taskDetailCardTemplate.events({
    'click .send-to-collaborator':function(evt,tmpl){
        try{
            // Meteor.user().profile breaks when user is logged out
            if(Meteor.user().profile){
                Meteor.users.update(Meteor.user().profile.activeCollaborator, {$set: { 'profile.dropbox': Session.get('selected_task_id')}});
            }else{
                log_event('Meteor profile not available.');
            }
        }
        catch(err){
            log_event(err, LogLevel.Error);
        }
    }
});
Template.taskDetailCardTemplate.rendered = function(){
    // TODO: Refactor these into CSS files
    $('#taskDetailCard').css('width', window.innerWidth - 240);
    $('#taskDetailCard').css('left', 220);
//    $("#taskDetailCard").bind("swipeleft", function(){
//        alert('swipeleft!');
//    });
//    $("#taskDetailCard").bind("swiperight", function(){
//        alert('swipeleft!');
//    });
//    $("#taskDetailCard").bind("swipedown", function(){
//        //alert('swipedown!');
//        Session.set('show_task_detail_panel',false);
//    });
    $("#taskDetailCard").bind("swipeleft", function(){
        alert('swipeleft!');
    });
    $("#taskDetailCard").bind("swiperight", function(){
        alert('swiperight!');
    });
    $("#taskDetailCard").bind("swipeleftdown swipedown swiperightdown", function(){
        //alert('swipedown!');
        Session.set('show_task_detail_panel',false);
        Meteor.flush();
    });
};
Template.taskDetailCardTemplate.showTaskDetail = function(){
    return Session.get('show_task_detail_panel');
};
Template.taskDetailCardTemplate.todo_id = function(){
    return Session.get('selected_task_id');
};
Template.taskDetailCardTemplate.todo_text = function(){
    return Session.get('selected_task_text');
};
Template.taskDetailCardTemplate.todo_done = function(){
    return Session.get('selected_task_done_status') ? 'checked="checked"' : '';
};
Template.taskDetailCardTemplate.todo_image = function(){
    return '/images/placeholder-240x240.gif';
};
Template.taskDetailCardTemplate.tag_objs = function(){
    return _.map(this.tags || [], function (tag) {
        return {todo_id: ession.get('selected_task_id'), tag: tag};
    });
};
//Template.taskDetailCardTemplate.tag = function(){
//    return Session.get('selected_task_tags');
//};
Template.taskDetailCardTemplate.adding_tag = function(){
    return false;
};


//Template.taskDetailCardTemplate.tag_objs = function () {
//    return _.map(Todos.findOne(Session.set('selected_task_id')).tags || [], function (tag) {
//        return {todo_id: Session.set('selected_task_id'), tag: tag};
//    });
//};
//
//Template.taskDetailCardTemplate.done_class = function () {
//    var todo = Todos.findOne(Session.set('selected_task_id'));
//    return todo.done ? 'done' : '';
//};
//
//Template.taskDetailCardTemplate.done_checkbox = function () {
//    var todo = Todos.findOne(Session.set('selected_task_id'));
//    return todo.done ? 'checked="checked"' : '';
//};
//
//Template.taskDetailCardTemplate.editing = function () {
//    return Session.equals('editing_itemname', Session.set('selected_task_id'));
//};
//
//Template.taskDetailCardTemplate.adding_tag = function () {
//    return Session.equals('editing_addtag', Session.set('selected_task_id'));
//};
