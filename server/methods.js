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

        if (options.text.length > 255){
            throw new Meteor.Error(413, "New task is too long");
        }

        if (! this.userId){
            throw new Meteor.Error(403, "You must be logged in to create a task.");
        }

        console.log('####################################################### ');
        console.log('######### Inserting New Task');
        console.log('this.userId:   ' + this.userId);
        console.log('options: ' + JSON.stringify(options));
        console.log('');

        return Todos.insert({
            text: options.text,
            done: options.done,
            star: options.star,
            owner: options.owner,
            timestamp: options.timestamp,
            tags: options.tags
        });
    }
});

