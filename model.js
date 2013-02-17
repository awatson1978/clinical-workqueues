Todos = new Meteor.Collection("todos");

Todos.allow({
    insert: function(userId, todo){
        //return userId && todo.owner === userId;
        //return false;
        return true;
    },
    update: function (userId, todos, fields, modifier) {
        return _.all(todos, function (todo) {
            //if (userId !== todo.owner)
            //    return false; // not the owner

            var allowed = [
                "text",
                "tags",
                "timestamp",
                "public",
                "done",
                "tags"
            ];
            if (_.difference(fields, allowed).length)
                return false; // tried to write to forbidden field

            return true;
        });
    },
    remove: function(userId, todos){
        return true;
    }
});

Meteor.methods({
    createQuestion: function (options) {
        options = options || {};
        if (! (typeof options.text === "string" && options.text.length
//            && typeof options.description === "string" && options.description.length
//            && typeof options.x === "number" && options.x >= 0 && options.x <= 1
//            && typeof options.y === "number" && options.y >= 0 && options.y <= 1
            ))
            throw new Meteor.Error(400, "Required parameter missing");

        if (options.text.length > 100)
            throw new Meteor.Error(413, "Title too long");

        if (! options.list_id )
            throw new Meteor.Error(413, "No list id!");

//        if (! this.userId)
//            throw new Meteor.Error(403, "You must be logged in");

//        if (this.userId == null){
//            console.log('this.userId is null:   ' + this.userId);
//            options.userId = "a487bf12-88cc-439d-9e8f-77456c9f545d";
//        }else{
//            console.log('this.userId is:   ' + this.userId);
//            options.userId = this.userId;
//        }

        console.log('####################################################### ');
        console.log('######### Inserting Todo Item');
        console.log('todo_item.owner:   ' + this.userId);
        console.log('todo_item.list_id: ' + options.list_id);
        console.log('todo_item.timestamp: ' + options.timestamp);
        console.log('todo_item.public: ' + options.public);
        console.log('todo_item.done: ' + options.done);
        console.log('todo_item.text: ' + options.text);
        console.log('');

        return Todos.insert({
            owner: options.userId,
            text: options.text,
            timestamp: options.timestamp,
            done: options.done,
            list_id: options.list_id,
            public: !! options.public
//            , invited: []
//            , rsvps: []
        });
    }
});