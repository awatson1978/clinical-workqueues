
//--------------------------------------------------------------------------
// Collections Definitions

// TODO:  refactor usersDirector to UsersDirectory
AllTodos =          new Meteor.Collection("allTodos");
Todos =             new Meteor.Collection("todos");
Lists =             new Meteor.Collection("lists");
usersDirectory =    new Meteor.Collection("usersDirectory");
Hipaa =             new Meteor.Collection("hipaa");
CategoryIcons =     new Meteor.Collection("categoryIcons");



//--------------------------------------------------------------------------
// Collections Access/Deny Rules

usersDirectory.allow({
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
Hipaa.allow({
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
// Server Side Helper Functions
//
// requires Meteor.call() from the client to initate
// used to validate data before inserting new tasks into the database

Meteor.methods({
    createNewTask: function (options) {
        options = options || {};
        if (!(typeof options.text === "string" && options.text.length)){
            throw new Meteor.Error(400, "Required parameter missing");
        }

        if (options.text.length > 100){
            throw new Meteor.Error(413, "Title too long");
        }

        if (! options.list_id ){
            throw new Meteor.Error(413, "No list id!");
        }

        if (! this.userId){
            throw new Meteor.Error(403, "You must be logged in");
        }

        console.log('####################################################### ');
        console.log('######### Inserting New Task');
        console.log('this.userId:   ' + this.userId);
        console.log('options: ' + JSON.stringify(options));
        console.log('');

        return Todos.insert({
            owner: options.userId,
            // TODO:  add 'creator' field to task
            //creator: options.userId,
            text: options.text,
            timestamp: options.timestamp,
            done: options.done,
            list_id: options.list_id,
            public: !! options.public
        });
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