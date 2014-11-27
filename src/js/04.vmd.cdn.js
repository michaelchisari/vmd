$cdn = new Object;

$cdn.load = function() {

    // JQuery UI
    $.getScript(__vmd_protocol + '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js');

    // Velocity JS
    $.getScript(__vmd_protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.min.js', function() {
        // Velocity UI JS
        $.getScript(__vmd_protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.ui.min.js');
    });

    // Semantic-UI JS
    $.getScript(__vmd_protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/components/accordion.min.js');

    // Semantic-UI CSS
    $.get(__vmd_protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/semantic.css', function (css) {

        // Necessary because Semantic-UI resets the body/page html.  Don't want to do that for a bookmarklet.
        var splitted = css.split(__vmd_linebreak); // \n
        for (s in splitted) { 
            if (((s >= 21210) && (s <= 21668)) ||
                ((s >= 23712) && (s <= 23824))) {
                splitted[s] = '';
            }
        }
        var semantic_css = splitted.join(__vmd_linebreak);
        $(document).ready(function() {
            $('<style />').html(semantic_css).appendTo('head');
        });

    });
};

// Anonymous "self-invoking" function
// http://facebook.com/anders.tornblad
// anders.tornblad@gmail.com

// Anonymous "self-invoking" function
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 20);
        }
    };

    // Start polling...
    checkReady(function($) {
        $(function() {
            $cdn.load();
        });
    });
})();
