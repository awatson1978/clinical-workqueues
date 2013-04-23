
// Publish complete set of lists to all clients.
Meteor.publish('lists', function () {
    return Lists.find();
});


// Todos -- {text: String,
//           done: Boolean,
//           tags: [String, ...],
//           list_id: String,
//           timestamp: Number}
//Todos = new Meteor.Collection("todos");


// TODO:  create personalTasks publish/subscribe functions
//Meteor.publish('personalTasks', function (ownerId) {
//    return Todos.find({owner_id: ownerId});
//});


// Publish all items for requested list_id.
// TODO:  Meteor.publish('todos', function (ownerId, completed, starred) {
Meteor.publish('todos', function (list_id) {

    // TODO:  add if/then to detect admin account (1st)
    // TODO:  generalize if/then detection to detect admin role (2nd)

    // TODO:  only return tasks owned by currently logged in user
    // TODO;  unless admin, in which case, return all tasks

    //TODO:  if starred = true, only return tasks marked star
    //TODO:  if completed = true, only return completed tasks
    //TODO:  if completed = false, only return uncompleted tasks
    //TODO:  if completed = null, return all tasks

    return Todos.find({list_id: list_id});
//    return Todos.find(
//        {$or: [{"public": true}, {list_id: list_id}, {invited: this.userId}, {owner: this.userId}]}
//    );
});
Meteor.publish('allTodos', function (list_id) {
    return Todos.find();
});
Meteor.publish('categoryIcons', function () {
    return CategoryIcons.find();
});



//--------------------------------------------------
// USERS




// Publish users directory and user profile
Meteor.publish("usersDirectory", function () {
    return Meteor.users.find({}, {fields: {
        '_id': true,
        'username': true,
        'profile': true,
        'profile.name': true,
        'profile.avatar': true,
        'profile.dropbox': true,
        'profile.activeCollaborator': true,
        'emails': true,
        'emails[0].address': true,
        'emails.address': true

//        'services': true,
//        'services.facebook': true,
//        'services.facebook.id': true,
//        'services.facebook.name': true,
//        'services.facebook.gender': true,
//        'services.facebook.picture': true,
//        'services.facebook.picture.data': true,
//        'services.facebook.picture.data.url': true

    }});
});
Meteor.publish('userProfile', function (userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {
        '_id': true,
        'username': true,
        'profile': true,
        'profile.name': true,
        'profile.avatar': true,
        'profile.collaborators': true,
        'profile.carewatch': true,
        'profile.currentPage': true,
        'profile.pushRecipients': true,
        'profile.activeCollaborator': true,
        'profile.dropbox': true,
        'emails': true,
        'emails[0].address': true
    }});
});

Meteor.publish("facebook_avatar_url", function() {
    return Meteor.users.find({_id: this.userId}, {fields: {
        'services.facebook.id': 1,
        'services.facebook.name': 1,
        'services.facebook.gender': 1,
        'services.facebook.picture': 1,
        'services.facebook.picture.data': 1,
        'services.facebook.picture.data.url': 1
    }});
});