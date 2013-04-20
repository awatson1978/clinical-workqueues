// if the database is empty on server start, create some sample data.
// we create a separate bootstrap.users.js file
// because we'll be wanting to set up a number of patient-scenario test users

Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        log_event('no users in database!  adding some default users', LogLevel.Info, this);

        // crate our administrator
        var userId = Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'admin@test.mobi',
            profile: {
                name: 'Administrator',
                role: 'Administrator',
                avatar: '/userspace/lisa.cuddy.jpg',
                collaborators: '',
                carewatch: ''
            }
        });
        log_event('Administrator account created: ' + userId, LogLevel.Info, this);

        // and a default physician
        var userId = Accounts.createUser({
            username: 'house',
            password: 'house',
            email: 'house@test.mobi',
            profile: {
                name: 'Gregory House, MD',
                role: 'Physician',
                avatar: '/userspace/gregory.house.jpg'
            }
        });
        log_event('Default physician account created: ' + userId, LogLevel.Info, this);


        // now lets create some test patients
        var data = [
            {   username: 'chase',
                password: 'chase',
                email: 'chase@test.mobi',
                profile: {
                    name: 'Robert Chase, MD',
                    role: 'Surgeon',
                    avatar: '/userspace/robert.chase.jpg'
                }
            },
            {   username: 'camron',
                password: 'camron',
                email: 'camron@test.mobi',
                profile: {
                    name: 'Allison Camron',
                    role: 'Physician',
                    avatar: '/userspace/allison.camron.jpg'
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
