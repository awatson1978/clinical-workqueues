// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
Meteor.subscribe('lists', function () {
    if (!Session.get('list_id')) {
        var list = Lists.findOne({}, {sort: {name: 1}});
        if (list)
            Router.setList(list._id);
    }
});

Meteor.subscribe('usersDirectory');
Meteor.subscribe('hipaa');


// Always be subscribed to the todos for the selected list.
Meteor.autosubscribe(function () {
    Meteor.subscribe('usersDirectory');
    Meteor.subscribe('hipaa');

    Meteor.subscribe('userProfile', Meteor.userId());

    var list_id = Session.get('list_id');
    if (list_id)
        Meteor.subscribe('todos', list_id);
});
