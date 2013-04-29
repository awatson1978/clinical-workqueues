////////// Tracking selected list in URL //////////

var TodosRouter = Backbone.Router.extend({
    routes: {
        ":list_id": "main"
    },
    main: function (list_id) {
        // cordova wants to manually specify index.html
        // and sometimes it borks the route on safari browsers
        try{
            if(list_id === "index.html"){
                Session.set("list_id", null);
                Session.set("tag_filter", null);
            }else{
                Session.set("list_id", list_id);
                Session.set("tag_filter", null);
            }
        }catch(err){
            console.log(err);
        }
    },
    setList: function (list_id) {
        this.navigate(list_id, true);
    }
});
Router = new TodosRouter();