VMD.loadLibraries = function vmdLoadLibraries() {
  
  // JQuery UI
  VMD.$.getScript(VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function() {
    // Velocity JS
    VMD.$.getScript(VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.min.js', function() {
      // Velocity UI JS
      VMD.$.getScript(VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/velocity/1.1.0/velocity.ui.min.js', function() {
        // Semantic-UI JS
        VMD.$.getScript(VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/semantic.min.js', function() {
          // Semantic-UI CSS
          VMD.$.get(VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.0.0/semantic.css', function (css) {
  
            // Necessary because Semantic-UI resets the body/page html.  Don't want to do that for a bookmarklet.
            var splitted = css.split(VMD._linebreak); // \n

            // Loop through each line of css
            for (s in splitted) { 
              // Remove only specific lines.
              if (((s >= 21210) && (s <= 21668)) ||
                  ((s >= 23712) && (s <= 23824))) {
                splitted[s] = '';
              }
            }

            // Rejoin the split css data.
            var semantic_css = splitted.join(VMD._linebreak);

            // Append the modified Semantic UI css to the document head.
            VMD.$(document).ready(function() {
              VMD.$('<style />').html(semantic_css).appendTo('head');
              VMD.initialize();
            });

          });
        });
      });
    });
  });
  
};
  
/* 
 * Anonymous "self-invoking" function
 * http://facebook.com/anders.tornblad
 * anders.tornblad@gmail.com
 */
VMD.loadJQuery = function vmdLoadJQuery() {
  
  // Check if a JQuery version is already loaded.
  if (window.jQuery) {
    console.log ('JQuery already loaded: ' + $.fn.jquery);
    var jQueryExists = true;
  }
  
  if (jQueryExists) {
    // Use existing jQuery to load the jQuery we need.
    $.getScript (VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', function() {
      VMD.$ = $.noConflict();
      VMD.loadLibraries();
    });
  } else {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = VMD._protocol + '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
  
    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
      if (window.jQuery) {
        callback(jQuery);
        VMD.$ = $.noConflict();
        VMD.loadLibraries();
      } else {
        window.setTimeout(function() { checkReady(callback); }, 100);
      }
    };
  
    // Start polling...
    checkReady(function($) {
    });
  }
}
  
/*
 * Prep VMD. This is the first VMD function called.
 */
VMD.prep = function vmdPrep() {
  VMD.loadJQuery();
}
