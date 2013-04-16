(function($) {
    createOverlay = function() {
        var overlay = document.createElement("div");
        overlay.setAttribute("id","overlay");
        overlay.setAttribute("class", "tutorial-overlay");
        document.body.appendChild(overlay);
    };
    testAlert = function(){
      alert('it worked!');
    };
})(jQuery);
