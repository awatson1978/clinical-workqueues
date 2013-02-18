// if the database is empty on server start, create some sample data.
// we create a separate bootstrap.users.js file
// because we'll be wanting to set up a number of patient-scenario test users

Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        log_event('no users in database!  adding some default users', LogLevel.Info);

        // crate our administrator
        var userId = Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'admin@test.mobi',
            profile: {
                name: 'Administrator',
                role: 'Administrator',
                avatar: '/userspace/house/lisa.cuddy.jpg'
            }
        });
        log_event('Administrator account created: ' + userId, LogLevel.Info);

        // and a default physician
        var userId = Accounts.createUser({
            username: 'house',
            password: 'house',
            email: 'house@test.mobi',
            profile: {
                name: 'Gregory House, MD',
                role: 'Physician',
                avatar: '/userspace/house/gregory.house.jpg'
            }
        });
        log_event('Default physician account created: ' + userId, LogLevel.Info);


        // now lets create some test patients
        var data = [
            {   username: 'janedoe',
                password: 'janedoe',
                email: 'janedoe@test.mobi',
                profile: {
                    name: 'Jane Doe',
                    role: 'Patient',
                    avatar: '/userspace/spokepersons/rita.hayworth.jpg'
                }
            },
            {   username: 'chase',
                password: 'chase',
                email: 'chase@test.mobi',
                profile: {
                    name: 'Robert Chase, MD',
                    role: 'Surgeon',
                    avatar: '/userspace/house/robert.chase.jpg'
                }
            },
            {   username: 'camron',
                password: 'camron',
                email: 'camron@test.mobi',
                profile: {
                    name: 'Allison Camron',
                    role: 'Physician',
                    avatar: '/userspace/house/allison.camron.jpg'
                }
            },
            {   username: 'ada',
                password: 'ada',
                email: 'ada@test.mobi',
                profile: {
                    name: 'Ada Lovelace',
                    role: 'Patient',
                    avatar: '/userspace/others/ada.lovelace.jpg'
                }
            },
            {   username: 'florence',
                password: 'florence',
                email: 'florence@test.mobi',
                profile: {
                    name: 'Florence Nightingale',
                    role: 'Nurse',
                    avatar: '/userspace/others/florence.nightingale.jpg'
                }
            },
            {   username: 'kurt',
                password: 'kurt',
                email: 'kurt@test.mobi',
                profile: {
                    name: 'Kurt Vonnegut',
                    role: 'Patient',
                    avatar: '/userspace/others/kurt.vonnegut.jpg'
                }
            },
            {   username: 'curie',
                password: 'curie',
                email: 'curie@test.mobi',
                profile: {
                    name: 'Madam Curie',
                    role: 'Radiologist',
                    avatar: '/userspace/others/madam.curie.jpg'
                }
            },
            {   username: 'teresa',
                password: 'teresa',
                email: 'teresa@test.mobi',
                profile: {
                    name: 'Mother Teresa',
                    role: 'Nurse',
                    avatar: '/userspace/others/mother.teresa.jpg'
                }
            },
            {   username: 'samuel',
                password: 'samuel',
                email: 'samuel@test.mobi',
                profile: {
                    name: 'Samuel Clemens',
                    role: 'Patient',
                    avatar: '/userspace/others/samuel.clemens.jpg'
                }
            },
            {   username: 'octavia',
                password: 'octavia',
                email: 'octavia@test.mobi',
                profile: {
                    name: 'Octavia Butler',
                    role: 'Patient',
                    avatar: '/userspace/others/george.washington.carver.jpg'
                }
            },
            {   username: 'carver',
                password: 'carver',
                email: 'carver@test.mobi',
                profile: {
                    name: 'George Washington Carver',
                    role: 'Chemist',
                    avatar: '/userspace/others/samuel.clemens.jpg'
                }
            },
            {   username: 'shelley',
                password: 'shelley',
                email: 'shelley@test.mobi',
                profile: {
                    name: 'Mary Shelley',
                    role: 'Author',
                    avatar: '/userspace/others/mary.shelley.jpg'
                }
            },
            {   username: 'johndoe',
                password: 'johndoe',
                email: 'johndoe@test.mobi',
                profile: {
                    name: 'John Doe',
                    role: 'Patient',
                    avatar: '/userspace/spokepersons/michael.j.fox.jpg'
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
            log_event('new user created: ' + userId, LogLevel.Info);
        }



    }
});
