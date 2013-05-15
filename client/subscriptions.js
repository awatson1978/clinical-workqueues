
// subscribe to the collections nececssary to run the application
Meteor.subscribe('allTodos');
Meteor.subscribe('usersDirectory');
Meteor.subscribe('categoryIcons');
Meteor.subscribe('facebook_avatar_url');
Meteor.subscribe('userProfile', Meteor.userId());



Meteor.subscribe('todos',
    Meteor.userId(),
    Session.get('subscribe_completed_tasks'),
    Session.get('subscribe_starred_tasks')
);

//Meteor.subscribe('todos', Meteor.userId, Session.get('subscribe_completed_tasks'),Session.get('subscribe_starred_tasks'), function(){


// if the user has selected a specific list, subscribe to it
// otherwise, point the URL router to the first record in the Lists collection
//Meteor.subscribe('lists', function () {
//    try{
//        if (Session.get('list_id')){
//            //TODO:  Meteor.publish('todos', function (ownerId, completed, starred) {
//
//            //TODO:  Session.set('subscribe_completed_tasks',true)
//            //TODO:  Session.set('subscribe_completed_tasks',false)
//            //TODO:  Session.set('subscribe_completed_tasks',null)
//
//            //TODO:  Session.set('subscribe_starred_tasks',true)
//            //TODO:  Session.set('subscribe_starred_tasks',false)
//
//        }else{
//            var list = Lists.findOne({}, {sort: {name: 1}});
//            if (list){
//                Router.setList(list._id);
//            }
//        }
//    }catch(error){
//        console.log(error);
//    }
//});
//

