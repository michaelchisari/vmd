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

        var $toggle  = $vmd.$('#vmd-on-off');
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
                
                $vmd.Toolbar.velocity ({ opacity: 1 }, 750);
                $vmd.active = true;
                /* Make inputs unclickable */
                $vmd.togglePageInputs (false);
            } else {
                /* Remove VMD from browser title */
                document.title = document.title.slice(5, document.title.length);
                $vmd.active = false;
                $vmd.Toolbar.velocity ({ opacity: 0.35 }, 750);
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
        $vmd.$(".vmd-form").each (function() {
           $vmd.$(this).hide();
        });
    }

    /* Open the target select menu form */
    $vmd.openMenu = function (target) {
        $vmd.$(target).addClass('active');
        var id = '.' + $vmd.$(target).attr('id');
        $vmd.$(id).velocity({ opacity: 1 }, { display: "auto" });
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

        $vmd.$(thisForm).find('.vmd-alphabet').text(String.fromCharCode($vmd.alphabetIndex))

        // Change the color of the form to differentiate between forms.
        $vmd.$(thisForm).find('.vmd-form-handle').addClass ($vmd.colorList[$vmd.colorIndex]);
        $vmd.$(thisForm).find('.vmd-alphabet').addClass ($vmd.colorList[$vmd.colorIndex]);
        $vmd.colorIndex++;
        if ($vmd.colorIndex > 5) $vmd.colorIndex = 0;

        var extraEasings = {
            "spring physics...":'[500,20]',
            "cubic bezier...":'[0.25,1,0.25,1]',
            "step...":'[ 4 ]'
        }

        for (e in extraEasings) {
            var selected = '';
            if (e === $vmd.EASING_DEFAULT) {
                selected = 'selected';
            }
                var html = '<option ' + selected + ' value="' + extraEasings[e] + '">' + e + '</option>';
                $vmd.$(thisForm).find('.vmd-easing-dropdown').append(html);
        }

        var easings = $vmd.$.Velocity.Easings;
        for (e in easings) {
            var selected = '';
            if (e === $vmd.EASING_DEFAULT) {
                selected = 'selected';
            }
            var html = '<option ' + selected + ' value="' + easings[e] + '">' + e + '</option>';
            $vmd.$(thisForm).find('.vmd-easing-dropdown').append(html);
        }

        // Update delay range slider
        $vmd.$(thisForm).find("input[name='delay']").on ("input", function() {
            $vmd.$(this).parent().find('.vmd-delay-amount').text(this.value);
        });

        // Update duration range slider
        $vmd.$(thisForm).find("input[name='duration']").on ("input", function() {
            $vmd.$(this).parent().find('.vmd-duration-amount').text(this.value);
        });

        // Set the current target.
        $vmd.Targets[$vmd.alphabetIndex] = targetElement;

        // Create the properties of the current target.
        $vmd.$(targetElement).data("VMD", { });
        $vmd.$(targetElement).data("VMD").propertiesMap = "Hello";
        $vmd.$(targetElement).data("VMD").options = new Object;

        $vmd.$(thisForm).find("input[name='transition']").change ( function() {
            var index = targetElement.data('vmd-index');
            $vmd.Targets[index].data("vmd-propertiesMap", $(this).val());
        });

        // Initialize the target's default values.
        $vmd.Targets[$vmd.alphabetIndex].Alpha = $vmd.alphabetIndex;
        $vmd.Targets[$vmd.alphabetIndex].Repeat = false;
        $vmd.Targets[$vmd.alphabetIndex].Properties = '{}';
        $vmd.Targets[$vmd.alphabetIndex].Easing = $vmd.DEFAULT_EASING;
        $vmd.Targets[$vmd.alphabetIndex].Delay = $vmd.DEFAULT_DELAY;
        $vmd.Targets[$vmd.alphabetIndex].Duration = $vmd.DEFAULT_DURATION;

        // Attach the target element index to the repeat icon
        $vmd.$(thisForm).find(".vmd-repeat-icon").data('target-element', $vmd.alphabetIndex);

        // Attach the index to the target element
        targetElement.data('vmd-index', $vmd.alphabetIndex);

        // Initialize the repeat button's behavior
        $vmd.$(thisForm).find(".vmd-repeat-icon").popup();
        $vmd.$(thisForm).find(".vmd-repeat-icon").click ( function() {
            var target = $vmd.$(this).data('target-element');
            $vmd.$(this).toggleClass("lightgray");
            if ($vmd.$(this).hasClass("lightgray")) {
                $vmd.Targets[target].Repeat = false;
            } else {
                $vmd.Targets[target].Repeat = true;
            }
        });

        // Append the form to the #vmd toolbar element.
        $vmd.Toolbar.append(thisForm);

        $vmd.$('.vmd-easing-dropdown').dropdown({
            "set selected":"swing",
            "onChange": function (value,text,$choice) {
                if (text.indexOf('...') > -1) {
                    $vmd.$('.vmd-easing-data input').val ('[' + value + ']');
                    $vmd.$('.vmd-easing-data').show();
                } else {
                    $vmd.$('.vmd-easing-data').hide();
                }
            }
        });

        $vmd.$(".vmd-form").draggable( {
            "handle": ".vmd-form-handle",
            "cursor": "move"
        });

        $vmd.$('.vmd-easing-data').hide();
    }

    /*****************
        Animation
    *****************/

    function getElementLabel ($target) {
      return $target.attr("id") ? ("#" + $target.attr("id")) : ($target[0].tagName.toLowerCase() + ($target[0].className ? "." + $target[0].className : ""))
    }

    function updateParameters ($target) {
      var propertiesMap = $target.data("VMD").propertiesMap,
        options = $target.data("VMD").options;

      $vmd.$.each([ "duration", "delay", "easing" ], function(_, value) {
        options[value] = $target.find("[name='" + value + "']").val();
      });

      if ($target.find("select[name='easing'] :selected").attr("data-array")) {
          try {
              eval("options.easing = " + $target.find("code[name='easingArray']").text());
        } catch (error) {} 	
      }

      $target.data("VMD").options = options;

      try {
        eval("propertiesMap = " + $target.find("code[name='propertiesMap']").text());
      } catch (error) { }

      $target.data("VMD").propertiesMap = propertiesMap;
    }

    function animate ($target) {
      updateParameters($target);

      if ($target.data("VMD").propertiesMap) {
        $target.parent()
          .velocity("stop", true)
          .velocity($target.data("VMD").propertiesMap, $target.data("VMD").options);
      }
    }

    function clearElementStyles (element) {
      if ($vmd.$.data(element, "velocity")) {
        $vmd.$.data(element, "velocity").transformCache = {};
      }

      /* Assumes the user isn't setting any inline styles. */
      element.setAttribute("style", "position:" + $vmd.$.css(element, "position") + ";");
    }
