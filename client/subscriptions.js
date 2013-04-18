
// subscribe to the collections nececssary to run the application
Meteor.subscribe('allTodos');
Meteor.subscribe('usersDirectory');
Meteor.subscribe('categoryIcons');
Meteor.subscribe('facebook_avatar_url');
Meteor.subscribe('userProfile', Meteor.userId());



// if the user has selected a specific list, subscribe to it
// otherwise, point the URL router to the first record in the Lists collection
Meteor.subscribe('lists', function () {
    if (Session.get('list_id')){
        Meteor.subscribe('todos', Session.get('list_id'));
    }else{
        var list = Lists.findOne({}, {sort: {name: 1}});
        if (list){
            Router.setList(list._id);
        }
    }
});


