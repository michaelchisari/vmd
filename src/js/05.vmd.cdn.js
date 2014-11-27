$vmd.loadLibraries = function() {

    // JQuery UI
    $vmd.$.getScript($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function() {
        // Velocity JS
        $vmd.$.getScript($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.min.js', function() {
            // Velocity UI JS
            $vmd.$.getScript($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.ui.min.js', function() {
                // Semantic-UI JS
                $vmd.$.getScript($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/semantic.min.js', function() {
                    // Semantic-UI CSS
                    $vmd.$.get($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/semantic.css', function (css) {

                        // Necessary because Semantic-UI resets the body/page html.  Don't want to do that for a bookmarklet.
                        var splitted = css.split($vmd._linebreak); // \n
                        for (s in splitted) { 
                            if (((s >= 21210) && (s <= 21668)) ||
                                ((s >= 23712) && (s <= 23824))) {
                                splitted[s] = '';
                            }
                        }
                        var semantic_css = splitted.join($vmd._linebreak);
                        $vmd.$(document).ready(function() {
                            $vmd.$('<style />').html(semantic_css).appendTo('head');
                            $vmd.initialize();
                        });
                    });
                });
            });
        });

    });

};

// Anonymous "self-invoking" function
// http://facebook.com/anders.tornblad
// anders.tornblad@gmail.com
$vmd.loadJQuery = function() {

    // Check if a JQuery version is already loaded.
    if (window.$) {
        console.log ('JQuery already loaded: ' + $.fn.jquery);
        var jQueryExists = true;
    }

    if (jQueryExists) {
        // Use existing jQuery to load the jQuery we need.
        $.getScript ($vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', function() {
            $vmd.$ = $.noConflict();
            $vmd.loadLibraries();
        });
    } else {
        // Load the script
        var script = document.createElement("SCRIPT");
        script.src = $vmd._protocol + '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName("head")[0].appendChild(script);

        // Poll for jQuery to come into existance
        var checkReady = function(callback) {
            if (window.jQuery) {
                callback(jQuery);
                $vmd.$ = $.noConflict();
                $vmd.loadLibraries();
            }
            else {
                window.setTimeout(function() { checkReady(callback); }, 100);
            }
        };
    
        // Start polling...
        checkReady(function($) {
        });
    }
}

$vmd.prep = function () {
    $vmd.loadJQuery();
}
