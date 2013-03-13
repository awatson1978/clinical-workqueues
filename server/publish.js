
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

// Publish all items for requested list_id.
Meteor.publish('todos', function (list_id) {
    return Todos.find({list_id: list_id});
//    return Todos.find(
//        {$or: [{"public": true}, {list_id: list_id}, {invited: this.userId}, {owner: this.userId}]}
//    );
});



//--------------------------------------------------
// USERS


Meteor.publish('hipaa', function () {
    return Hipaa.find();
});

// Publish users directory and user profile
Meteor.publish("usersDirectory", function () {
    return Meteor.users.find({}, {fields: {
        '_id': true,
        'username': true,
        'profile': true,
        'profile.name': true,
        'profile.avatar': true,
        'profile.dropbox': true,
        'emails': true,
        'emails[0].address': true,
        'emails.address': true
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