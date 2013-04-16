var _gaq = _gaq || [];

// *.pentasyllabic.com tracking number
//_gaq.push(['_setAccount', 'UA-38196206-1']);
//_gaq.push(['_setDomainName', 'clinical-workqueues.pentasyllabic.com']);
//_gaq.push(['_trackPageview']);


// ClinicalWorkqueues tacking number (mobile app?)
//_gaq.push(['_setAccount', 'UA-40161509-1']);

// clinical-workqueues.pentasyllabic.com tacking number (website)

ga('create', 'UA-40159116-1', 'pentasyllabic.com');
ga('send', 'pageview');


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');


// OLD TRACKING CODE
//(function() {
//    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//})();



// Meteor Analytics Test
//ga('create', 'UA-40154348-1', 'herokuapp.com');
//ga('send', 'pageview');

