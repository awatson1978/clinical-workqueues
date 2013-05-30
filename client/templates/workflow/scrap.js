//Template.taskDetailCardTemplate.rendered = function(){
//    $("#taskDetailCard").bind("swiperight", function(){
//        sendToActiveCollaborator();
//    });
//};
//sendToActiveCollaborator = function() {
//    if (Meteor.user().profile && Meteor.user().profile.activeCollaborator) {
//        Meteor.users.update(Meteor.user().profile.activeCollaborator, {$set:{ 'profile.dropbox':Session.get('selected_task_id')}});
//    } else {
//        console.log('Meteor profile not available.');
//    }
//};
//
//
//Template.workqueuesPageTemplate.receivedNewAlert = function(){
//    return monitorDropBox();
//};
//monitorDropbox = function(){
//    if(Meteor.user().profile.dropbox == undefined){
//        return false;
//    }else if(Meteor.user().profile.dropbox == ""){
//        return false;
//    }else {
//        return true;
//    }
//};
//
//
//<template name="workqueuesPageTemplate">
//    <div id="workqueuesPage" class="page">
//        {{#if receivedNewAlert }}
//            {{> dropboxAlertTemplate}}
//        {{/if }}
//        {{> workqueueTemplate}}
//    </div>
//</template>
