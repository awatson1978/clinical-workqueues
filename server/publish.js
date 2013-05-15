

// Publish complete set of lists to all clients.
Meteor.publish('lists', function () {
    try{
        return Lists.find();
    }catch(error){
        console.log(error);
    }
});





// TODO:  create personalTasks publish/subscribe functions
//Meteor.publish('personalTasks', function (ownerId) {
//    return Todos.find({owner_id: ownerId});
//});


// Publish all items for requested list_id.
// TODO:  Meteor.publish('todos', function (ownerId, completed, starred) {

Meteor.publish('todos', function (ownerId, completedStatus, starred) {
//Meteor.publish('todos', function (list_id) {

    // TODO:  add if/then to detect admin account (1st)
    // TODO:  generalize if/then detection to detect admin role (2nd)

    // TODO:  only return tasks owned by currently logged in user
    // TODO;  unless admin, in which case, return all tasks

    //TODO:  if starred = true, only return tasks marked star
    //TODO:  if completed = true, only return completed tasks
    //TODO:  if completed = false, only return uncompleted tasks
    //TODO:  if completed = null, return all tasks

    try{
        return Todos.find({owner: ownerId});
        //return Todos.find({list_id: list_id});
    }catch(error){
        console.log(error);
    }

//    return Todos.find(
//        {$or: [{"public": true}, {list_id: list_id}, {invited: this.userId}, {owner: this.userId}]}
//    );
});
Meteor.publish('allTodos', function (list_id) {
    try{
        return Todos.find();
    }catch(error){
        console.log(error);
    }
});
Meteor.publish('categoryIcons', function () {
    try{
        return CategoryIcons.find();
    }catch(error){
        console.log(error);
    }
});



//--------------------------------------------------
// USERS




// Publish users directory and user profile
Meteor.publish("usersDirectory", function () {
    try{
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
        }});
    }catch(error){
        console.log(error);
    }

//        'services': true,
//        'services.facebook': true,
//        'services.facebook.id': true,
//        'services.facebook.name': true,
//        'services.facebook.gender': true,
//        'services.facebook.picture': true,
//        'services.facebook.picture.data': true,
//        'services.facebook.picture.data.url': true


});
Meteor.publish('userProfile', function (userId) {
    try{
        return Meteor.users.find({_id: this.userId}, {fields: {
            '_id': true,
            'username': true,
            'profile': true,
            'profile.name': true,
            'profile.avatar': true,
            'profile.collaborators': true,
            'profile.currentPage': true,
            'profile.pushRecipients': true,
            'profile.activeCollaborator': true,
            'profile.dropbox': true,
            'emails': true,
            'emails[0].address': true
        }});

    }catch(error){
        console.log(error);
    }
});

Meteor.publish("facebook_avatar_url", function() {
    try{
        return Meteor.users.find({_id: this.userId}, {fields: {
            'services.facebook.id': 1,
            'services.facebook.name': 1,
            'services.facebook.gender': 1,
            'services.facebook.picture': 1,
            'services.facebook.picture.data': 1,
            'services.facebook.picture.data.url': 1
        }});

    }catch(error){
        console.log(error);
    }
});