// if the database is empty on server start, create some sample data.
// we create a separate bootstrap.users.js file
// because we'll be wanting to set up a number of patient-scenario test users

Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        log_event('no users in database!  adding some default users', LogLevel.Info, this);


        // now lets create some test patients
        var data = [
            {   username: 'janedoe',
                password: 'janedoe',
                email: 'janedoe@test.mobi',
                profile: {
                    name: 'Jane Doe',
                    role: 'Patient',
                    avatar: '/userspace/rita.hayworth.jpg'
                }
            },
            {   username: 'johndoe',
                password: 'johndoe',
                email: 'johndoe@test.mobi',
                profile: {
                    name: 'John Doe',
                    role: 'Patient',
                    avatar: '/userspace/michael.j.fox.jpg'
                }
            }
        ];

        // and insert them into the database
        for (var i = 0; i < data.length; i++) {
            var userId = Accounts.createUser({
                username: data[i].username,
                password: data[i].password,
                email:    data[i].email,
                profile: {
                    name: data[i].profile.name,
                    role: data[i].profile.role,
                    avatar: data[i].profile.avatar
                }
            });
            log_event('new user created: ' + userId, LogLevel.Info, this);
        }
    }
});
