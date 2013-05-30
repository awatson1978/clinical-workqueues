
//--------------------------------------------------------------------------
// Collections Definitions

AllTodos =          new Meteor.Collection("allTodos");
Todos =             new Meteor.Collection("todos");
Lists =             new Meteor.Collection("lists");
UsersDirectory =    new Meteor.Collection("usersDirectory");
CategoryIcons =     new Meteor.Collection("categoryIcons");



//--------------------------------------------------------------------------
// Schemas

// task.text
// task.timestamp
// task.tags
// task.owner
// task.creator
// task.done
// task.star
// task.public



//--------------------------------------------------------------------------
// Collections Access/Deny Rules

UsersDirectory.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});


Meteor.users.allow({
    insert: function(userId, todo){
        // TODO:  restrict adding of users to admins
        return true;
    },
    update: function (userId, todos, fields, modifier) {
        // TODO:  restrict updating of user to admins and self by default
        // TODO:  restrict public updating to specific user profile items
        // TODO:  modify following code from updating todo record to update user profile record
        //
        //        return _.all(todos, function (todo) {
        //            var allowed = [
        //                "emails",
        //                "profile",
        //                "profile.dropbox",
        //                "username"
        //            ];
        //            if (_.difference(fields, allowed).length){
        //                return false; // tried to write to forbidden field
        //            }else{
        //              return true;
        //            }
        //        });
        return true;
    },
    remove: function(userId){
        // TODO:  restrict removing of users to admins and self
        return true;
    }
});





//--------------------------------------------------------------------------
// Default Items


Todos.allow({
    insert: function(userId, todo){
        // TODO:  restrict adding a task, unless it has a creator
        //return userId && todo.owner === userId;
        //return false;
        return true;
    },
    update: function (userId, todos, fields, modifier) {
        // TODO:  restrict updating a task to owner
        // TODO:  restrict updating tasks to specific fields
        //        return _.all(todos, function (todo) {
        //            //if (userId !== todo.owner)
        //            //    return false; // not the owner
        //
        //            var allowed = [
        //                "text",
        //                "tags",
        //                "timestamp",
        //                "public",
        //                "done",
        //                "tags"
        //            ];
        //            if (_.difference(fields, allowed).length)
        //                return false; // tried to write to forbidden field
        //
        //            return true;
        //        });
        return true;
    },
    remove: function(userId, todos){
        // TODO:  restrict removing task to owner
        return true;
    }
});





//--------------------------------------------------------------------------
// Client Side Helper Functions

displayName = function (user) {
    if (user.profile && user.profile.name)
    {
        return user.profile.name;
    }else{
        return "No Profile Name"
    }
};

displayEmail = function (user) {
    return user.emails[0].address;
};