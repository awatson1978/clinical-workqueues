// hipaa.logging.js
// version: 12.16.2012

var logToConsole = true;
var logToDatabase = true;

var logFilter = "8"

LogLevel = {
    Emergency : 0,
    Alert : 1,
    Critical : 2,
    Error: 3,
    Warning: 4,
    Notice: 5,
    Info: 6,
    Debug: 7,
    Trace: 8,
    Hipaa: 9,
    Drawing: 10,
    Signpost: 11
}
function parseLogLevel(int){
    switch(int){
        case 0:
            return "Emergency-> ";
        case 1:
            return "Alert-----> ";
        case 2:
            return "Critical--> ";
        case 3:
            return "Error-----> ";
        case 4:
            return "Warning---> ";
        case 5:
            return "Notice----> ";
        case 6:
            return "Info------> ";
        case 7:
            return "Debug-----> ";
        case 8:
            return "Stacktrace> ";
        case 9:
            return "Hipaa-----> ";
        case 10:
            return "Drawing---> ";
        case 11:
            return "Signpost--> ";
    }
}
function log_event(message, loglevel, context){
    if(logToConsole){
        if(loglevel != logFilter){
            console.log(parseLogLevel(loglevel) + message);
        }
    }
    if(logToDatabase){
//  TODO:  create Splunk collection to collect detailed logging data
//        if(loglevel == LogLevel.Hipaa){
//            Hipaa.insert({
//                owner: this.userId,
//                loglevel: loglevel,
//                text: message,
//                timestamp: new Date().getTime()
//            });
//        }
    }
}
function catch_error(function_name, error, loglevel, context){
    if(logToConsole){
        console.log(parseLogLevel(loglevel) + function_name + " - " + error);
    }
}

function log_hipaa_event(message, loglevel, owner){
    if(logToConsole){
        console.log(owner + ', LogLevel: ' + loglevel + " - "+ message);
    }
    if(logToDatabase){
        if(loglevel == LogLevel.Hipaa){
            Hipaa.insert({
                owner: owner,
                loglevel: loglevel,
                text: message,
                timestamp: new Date().getTime()
            });
        }
    }
}


