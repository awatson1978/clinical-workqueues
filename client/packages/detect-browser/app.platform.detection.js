var browser = navigator.appName;
var version = navigator.appVersion;


    function check(navigatorString) {
        return navigatorString.test(navigator.userAgent.toLowerCase());
    };

    var DOC = document;
    var isStrict = DOC.compatMode == "CSS1Compat";
    var isOpera = check(/opera/);
    var isChrome = check(/chrome/);
    var isWebKit = check(/webkit/);
    var isSafari = !isChrome && check(/safari/);
    var isSafari2 = isSafari && check(/applewebkit\/4/); // unique to
    // Safari 2
    var isSafari3 = isSafari && check(/version\/3/);
    var isSafari4 = isSafari && check(/version\/4/);
    var isIE = !isOpera && check(/msie/);
    var isIE7 = isIE && check(/msie 7/);
    var isIE8 = isIE && check(/msie 8/);
    var isIE6 = isIE && !isIE7 && !isIE8;
    var isGecko = !isWebKit && check(/gecko/);
    var isGecko2 = isGecko && check(/rv:1\.8/);
    var isGecko3 = isGecko && check(/rv:1\.9/);
    var isBorderBox = isIE && !isStrict;
    var isWindows = check(/windows|win32/);
    var isMac = check(/macintosh|mac os x/);
    var isIOS = check(/ios/);
    var isAir = check(/adobeair/);
    var isLinux = check(/linux/);
    var isSecure = /^https/i.test(window.location.protocol);
    var isIE7InIE8 = isIE7 && DOC.documentMode == 7;

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);


navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
    return M;
})();

