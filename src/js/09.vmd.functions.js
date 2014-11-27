    /*********
        TEMP
    **********/

    /*
     * Toggle page inputs on and off
     */
    $vmd.togglePageInputs = function (on) {
        if (on) {
            /* Turn every non-vmd input on */
            $vmd.$('a').each (function () {
                if (!$vmd.$(this).closest("#vmd").length) {
                    $vmd.$(this).off('click');
                }
            });
            $vmd.$('button').each (function () {
                if (!$vmd.$(this).closest("#vmd").length) {
                    $vmd.$(this).off('click');
                }
            });
            $vmd.$('input').each (function () {
                if (!$vmd.$(this).closest("#vmd").length) {
                    $vmd.$(this).off('click');
                }
            });
        } else {
            /* Turn every non-vmd input off */
            $vmd.$('a').on('click', function(e) { 
                if (!$vmd.$(this).closest("#vmd").length) {
                    e.preventDefault(); 
                }
            });
            $vmd.$('button').on('click', function(e) { 
                if (!$vmd.$(this).closest("#vmd").length) {
                    e.preventDefault(); 
                }
            });
            $vmd.$('input').on('click', function(e) { 
                if (!$vmd.$(this).closest("#vmd").length) {
                    e.preventDefault(); 
                }
            });
        }
    }

    /*
     * Turn the VMD on and off 
     */
    $vmd.createToggle = function() {

        /* Make links, buttons and inputs unclickable */
        $vmd.togglePageInputs(false);

        var $toggle  = $vmd.$('#vmd-on-off.ui.toggle.button');
        $toggle
        .state({
            text: {
            inactive : 'Off',
            active   : 'On'
            }
        });

        $toggle.addClass('active');
        $toggle.text('On');

        $vmd.active = true;

        $toggle.click ( function(event) {
            var buttons = $vmd.$('.ui.vmd-element.button');
            var keys = $vmd.$('span[name="key"]');

            /* Set the global VMD active flag and toggle buttons */
            if ($toggle.hasClass('active')) {
                /* Add VMD to title */
                document.title = "VMD | " + document.title;

                if (buttons.length) {
                    buttons.prop('disabled', '');
                }
                if (keys.length) keys.show();
                
                $vmd.velocity ({ opacity: 1 }, 750);
                $vmd.active = true;
                /* Make inputs unclickable */
                $vmd.togglePageInputs (false);
            } else {
                /* Remove VMD from browser title */
                document.title = document.title.slice(5, document.title.length);
                $vmd.active = false;
                $vmd.velocity ({ opacity: 0.35 }, 750);
                if (buttons.length) {
                    buttons.prop('disabled', 'disabled');
                    $vmd.closeMenus();
                }
                if (keys.length) keys.hide();
                /* Make inputs clickable again */
                $vmd.togglePageInputs(true);
            }
        });
    };

    /* Close all open menus */
    $vmd.closeMenus = function() {
        // Un-select all element buttons
        $vmd.$(".ui.vmd-element.button").each (function() {
            $vmd.$(this).removeClass("active");
        });
        $vmd.find(".vmd-form").each (function() {
           $vmd.$(this).hide();
        });
    }

    /* Open the target select menu form */
    $vmd.openMenu = function (target) {
        $vmd.$(target).addClass('active');
        var id = '.' + $vmd.$(target).attr('id');
        $vmd.find(id).velocity({ opacity: 1 }, { display: "auto" });
    }

    /* Add functionality to elements. */
    $vmd.updateButton = function(targetId, targetElement) {

        /* Create the DOM id from the targetId */
        var id = '#' + targetId;

        /* Close any open menus. */
        $vmd.closeMenus();

        /* Create the velocity form */
        $vmd.createForm($vmd.$(id), targetElement);

        /* Attach click behavior to element */
        $vmd.$(id).click(function() {
            if ($vmd.$(this).hasClass("active")) {
                /* Close the currently open menu */
                $vmd.closeMenus();
            } else {
                /* Close any open menus */
                $vmd.closeMenus();

                /* Open the currently clicked menu */
                $vmd.$(this).addClass("active");
                $vmd.openMenu(this);
            }
        });
    }

    /* Create the element form underneath the button. */
    $vmd.createForm = function (target, targetElement) {
        var thisForm = $vmd.$($vmd.buildForm());
        // Get the jquery path to the element
        var offset = $vmd.$(target).offset();
        var identifier = $vmd.$(targetElement).getPath()
        var targetId = target.attr('id');
        thisForm.find(".vmd-identifier").text(identifier);
        $vmd.$(thisForm).css("position", "absolute");
        var left = offset.left - 100;
        if (left < 20) left = 20;
        $vmd.$(thisForm).offset({ top: -8, left: left });
        $vmd.$(thisForm).addClass(targetId);
        $vmd.$(thisForm).find('.item').css('width', '100%');
        $vmd.$(thisForm).css('width', 450);

        $vmd.$(thisForm).find('.vmd-transition').css('width', '50%');
        $vmd.$(thisForm).find('.vmd-transition').css('float', 'left');
        $vmd.$(thisForm).find('.vmd-transition-input').css('width', '50%');
        $vmd.$(thisForm).find('.vmd-transition-input').css('float', 'right');

        $vmd.$(thisForm).find('.vmd-duration').css('width', '50%');
        $vmd.$(thisForm).find('.vmd-duration').css('float', 'left');

        $vmd.$(thisForm).find('.vmd-delay').css('width', '50%');
        $vmd.$(thisForm).find('.vmd-delay').css('float', 'right');

        $vmd.$(thisForm).find('.vmd-edit').click ( function() {
            /* Open only the modal associated with the target id. */
            $vmd.$('.' + targetId).find('.vmd-edit-modal').modal('show');
        });

        /* Set everything with vmd class to use Helvetica Neue, Arial */
        $vmd.$(thisForm).find('.vmd').css('font-family', $vmd.systemFont, 'important');

        var transforms = $vmd.$vmd.$.Velocity.Transforms;
        for (t in transforms) {
            var html = '<div class="item">' + transforms[t] + '</div>';
            $vmd.$(thisForm).find('.ui.dropdown').find('.menu').append(html);
        }

        $vmd.append(thisForm);
        
        $vmd.find('.ui.dropdown').dropdown();

        // Allow the menubar to be vertically draggable, in case it covers elements 
        $vmd.$(".vmd").find(".drag.ui.grid").draggable( {
            "revert": true, 
            "handle": ".small.lightgray.rotated.content.icon",
            "grid": [0,1]
        });

        $vmd.$(".vmd").draggable( {
            "handle": ".small.blue.circular.ui.button"
        });

    }

    /*****************
        Animation
    *****************/

    function getElementLabel ($target) {
      return $target.attr("id") ? ("#" + $target.attr("id")) : ($target[0].tagName.toLowerCase() + ($target[0].className ? "." + $target[0].className : ""))
    }

    function updateParameters ($overlay) {
      var propertiesMap = $overlay.data("VMD").propertiesMap,
        options = $overlay.data("VMD").options;

      $vmd.$.each([ "duration", "delay", "easing" ], function(_, value) {
        options[value] = $overlay.find("[name='" + value + "']").val();
      });

      if ($overlay.find("select[name='easing'] :selected").attr("data-array")) {
          try {
              eval("options.easing = " + $overlay.find("code[name='easingArray']").text());
        } catch (error) {} 	
      }

      $overlay.data("VMD").options = options;

      try {
        eval("propertiesMap = " + $overlay.find("code[name='propertiesMap']").text());
      } catch (error) { }

      $overlay.data("VMD").propertiesMap = propertiesMap;
    }

    function animate ($overlay) {
      updateParameters($overlay);

      if ($overlay.data("VMD").propertiesMap) {
        $overlay.parent()
          .velocity("stop", true)
          .velocity($overlay.data("VMD").propertiesMap, $overlay.data("VMD").options);	
      }
    }

    function clearElementStyles (element) {
      if ($vmd.$.data(element, "velocity")) {
        $vmd.$.data(element, "velocity").transformCache = {};
      }

      /* Assumes the user isn't setting any inline styles. */
      element.setAttribute("style", "position:" + $vmd.$.css(element, "position") + ";");
    }
