    browser = navigator.appName;
    version = navigator.appVersion;

    check = function(navigatorString) {
        return navigatorString.test(navigator.userAgent.toLowerCase());
    };

    isStrict = document.compatMode === "CSS1Compat";
    isOpera = check(/opera/);
    isChrome = check(/chrome/);
    isWebKit = check(/webkit/);
    isSafari = !isChrome && check(/safari/);
    isSafari2 = isSafari && check(/applewebkit\/4/);
    isSafari3 = isSafari && check(/version\/3/);
    isSafari4 = isSafari && check(/version\/4/);
    isIE = !isOpera && check(/msie/);
    isIE7 = isIE && check(/msie 7/);
    isIE8 = isIE && check(/msie 8/);
    isIE6 = isIE && !isIE7 && !isIE8;
    isGecko = !isWebKit && check(/gecko/);
    isGecko2 = isGecko && check(/rv:1\.8/);
    isGecko3 = isGecko && check(/rv:1\.9/);
    isBorderBox = isIE && !isStrict;
    isWindows = check(/windows|win32/);
    isMac = check(/macintosh|mac os x/);
    isIOS = check(/ios/);
    isAir = check(/adobeair/);
    isLinux = check(/linux/);
    isSecure = /^https/i.test(window.location.protocol);
    isIE7InIE8 = isIE7 && document.documentMode === 7;

    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);




