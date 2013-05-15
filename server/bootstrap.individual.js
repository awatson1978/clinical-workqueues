//--------------------------------------------------------------------------
// Server Side Helper Functions
//
// requires Meteor.call() from the client to initate
// used to validate data before inserting new tasks into the database

Meteor.methods({
    initializeDefaultTasks: function (options) {
        console.log('damn!  initializeDefaultTasks');

        var data = [
            {contents: [
                    ["Get annual flu shot.","annual checkup"],
                    ["Donate blood.","community"],
                    ["Make organ donation decision.","community"],
                    ["Get mammogram.", "cancer screening"],
                    ["Take hypertension medication once a day.","medication tracking"],
                    ["Take vitamin supplement once a day.","medication tracking"],
                    ["Keep below 1500 calories per day.","nutrition"],
                    ["Replace milk with almond milk.","nutrition"],
                    ["Increase heart rate by at least 30 minutes today.","exercise"],
                    ["Yoga stretches for 30 minutes a day.","exercise"],
                    ["Get eye sight checked.","annual checkup"],
                    ["Annual dental visit.","annual checkup"],
                    ["Get blood type checked.","baseline"],
                    ["Buy genetic testing kit from 23andme. ","baseline", "genetics"],
                    ["Fill out family history worksheet for diabetes risks.","risk factors"]
                ]
            }
        ];

        var timestamp = (new Date()).getTime();

        for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < data[i].contents.length; j++) {
                var info = data[i].contents[j];
                console.log(Todos.insert({
                    text: info[0],
                    timestamp: timestamp,
                    tags: info.slice(1),
                    owner: Meteor.userId(),
                    creator: Meteor.userId(),
                    done: false,
                    star: false
                }));
            }
        }
    }
});

