// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Lists = new Meteor.Collection("lists");

// ID of currently selected list
Session.set('list_id', null);

// Name of currently selected tag for filtering
Session.set('tag_filter', null);

// When adding tag to a todo, ID of the todo
Session.set('editing_addtag', null);

// When editing a list name, ID of the list
Session.set('editing_listname', null);

// When editing todo text, ID of the todo
Session.set('editing_itemname', null);

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
Meteor.subscribe('lists', function () {
  if (!Session.get('list_id')) {
    var list = Lists.findOne({}, {sort: {name: 1}});
    if (list)
      Router.setList(list._id);
  }
});
// Always be subscribed to the todos for the selected list.
Meteor.autosubscribe(function () {
  var list_id = Session.get('list_id');
  if (list_id)
    Meteor.subscribe('todos', list_id);
});




Template.app_container.loggedIn = function () {
    console.log('loggedIn called');
    if(Meteor.userId() != null){
        console.log('Meteor.userId() is null');
        return true;
    }else{
        console.log('Meteor.userId(): ' + Meteor.userId());
        return false;
    }
};


Meteor.startup(function () {
    Backbone.history.start({pushState: true});
});