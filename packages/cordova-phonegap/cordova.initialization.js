//-------------------------------------------------------
// Cordova App Object Literal


app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // http://docs.phonegap.com/en/2.6.0/cordova_events_events.md.html#Events
    bindEvents: function() {
        document.addEventListener('deviceready', function(){
            Session.set('deviceready', true);
        }, false);

        // and the rest should just go here, I believe
        //
        //        document.addEventListener('pause', function(){
        //            Session.set('pause', true);
        //        }, false);
        //        document.addEventListener('resume', function(){
        //            Session.set('resume', true);
        //        }, false);
        //        document.addEventListener('online', function(){
        //            Session.set('online', true);
        //        }, false);
        //        document.addEventListener('offline', function(){
        //            Session.set('offline', true);
        //        }, false);
        //        document.addEventListener('backbutton', function(){
        //            Session.set('backbutton', true);
        //        }, false);
        //        document.addEventListener('batterycritical', function(){
        //            Session.set('batterycritical', true);
        //        }, false);
        //        document.addEventListener('batterylow', function(){
        //            Session.set('batterylow', true);
        //        }, false);
        //        document.addEventListener('batterystatus', function(){
        //            Session.set('batterystatus', true);
        //        }, false);
        //        document.addEventListener('menubutton', function(){
        //            Session.set('menubutton', true);
        //        }, false);
        //        document.addEventListener('searchbutton', function(){
        //            Session.set('searchbutton', true);
        //        }, false);
        //        document.addEventListener('startcallbutton', function(){
        //            Session.set('startcallbutton', true);
        //        }, false);
        //        document.addEventListener('endcallbutton', function(){
        //            Session.set('endcallbutton', true);
        //        }, false);
        //        document.addEventListener('volumedownbutton', function(){
        //            Session.set('volumedownbutton', true);
        //        }, false);
        //        document.addEventListener('volueupbutton', function(){
        //            Session.set('volueupbutton', true);
        //        }, false);
    }
};


//------------------------------------------------------------
Session.set('deviceready', false);
//Session.set('pause', false);
//Session.set('resume', false);
//Session.set('online', false);
//Session.set('offline', false);
//Session.set('backbutton', false);
//Session.set('batterycritical', false);
//Session.set('batterylow', false);
//Session.set('batterystatus', false);
//Session.set('menubutton', false);
//Session.set('searchbutton', false);
//Session.set('startcallbutton', false);
//Session.set('endcallbutton', false);
//Session.set('volumedownbutton', false);
//Session.set('volueupbutton', false);

Template.mobileDeviceStatus.isDeviceReady = function(){
    return Session.get('deviceready');
}
Template.mobileDeviceStatus.deviceStatusText = function(){
    if(Session.get('deviceready')){
        return 'Device is Ready';
    }else{
        return 'Connecting to Device';
    }
}
Template.mobileDeviceStatus.deviceStatus = function(){
    if(Session.get('deviceready')){
        return 'receiving';
    }else{
        return 'blink listening';
    }
}