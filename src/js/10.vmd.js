VMD.enableEscapeKey = function() {
    VMD.body.keydown( function(event) {
        if (event.which == 27) {
            VMD.closeMenus();
        }
    });
}

VMD.enablePlay = function() {
    VMD.body.keydown( function(event) {
        if (event.which === 49) {
            if (!VMD.active) return (true);

            // If we're on an input field, return
            if(VMD.$("input,textarea").is(":focus")) return (true);

            VMD.animateAll();
        }
    });
}

VMD.enableAnimationKeys = function() {
    VMD.body.keydown( function(event) {
        for (t in VMD.Targets) {
            if (event.which == t) {
                if (!VMD.active) return (true);

                // If we're on an input field, return
                if(VMD.$("input,textarea").is(":focus")) return (true);

                VMD.animate(VMD.Targets[t]);

                return (false);
            }
        }
    });
}

VMD.enableStop = function() {
    VMD.body.keydown( function(event) {
        if (event.which === 50) {
            if (!VMD.active) return (true);

            // If we're on an input field, return
            if(VMD.$("input,textarea").is(":focus")) return (true);

            event.preventDefault();
            VMD.stopAll();
        }
    });
}

VMD.animateAll = function() {
    // Find all VMD targets
    for (t in VMD.Targets) {
        VMD.animate (VMD.Targets[t]);
    }

}

VMD.stopAll = function() {
    for (t in VMD.Targets) {
          VMD.Targets[t] 
            .velocity("stop", true)
            .velocity({ color: VMD._indicatorColor }, 75)
            .velocity("reverse");
    }
}

VMD.animate = function (target) {
   VMD.updateParameters(target);

   var index = target.data('vmd-index');
   var properties = target.data('vmd-propertiesMap');
   var options = target.data('options');

	try {
		eval("propertiesMap = " + properties);
	} catch (error) { }

   if (propertiesMap) {
      target
        .velocity("stop", true)
        .velocity(propertiesMap, target.data("vmd-options"));
    }
}

VMD.updateParameters = function (target) {
    var index = target.data('vmd-index');
    var character = String.fromCharCode(index).toUpperCase();

    var form = VMD.$('.vmd-button-' + character);
    var transition = form.find("input[name=transition]").val();
    var easing = form.find("select[name=easing] option:selected").text();
    var duration = form.find("input[name=duration]").val();
    var delay = form.find("input[name=delay]").val();

    VMD.Targets[index].data("vmd-propertiesMap", transition);

    var options = new Object;

    options.duration = duration;
    options.delay = delay;
    options.easing = easing;
    options.loop = VMD.Targets[index].Repeat;

    options.begin = function() {
    }

    options.complete = function() {
    }

    VMD.Targets[index].data("vmd-options", options);

    return (true);
}

VMD.enableOutlining = function() {

    /*****************
        Outlining
    *****************/

    VMD.body
        .keydown( function(event) {
            if (!VMD.active) return (false);

            if (event.shiftKey) {
                VMD.$(".vmd-outline").css("cursor", "pointer");
            }
        })
        .keyup( function(event) {
            if (!VMD.active) return (false);

            if (event.which === 16) {
                VMD.$(".vmd-outline").css("cursor", "");
            }
        })
      .on("mouseover", function(event) {
            if (!VMD.active) return (false);

        var $target = VMD.$(event.target);

            // Ignore menu elements for element selection
            if (!$target.closest("#vmd").length) {
                if (event.shiftKey) {
                    $target.css("cursor", "pointer");
                    //$target.addClass("vmd-outline");
                $target.css("outline", "1px solid rgba(0, 0, 50, 0.5)");
                } else {
                    $target.css("cursor", "");
                    //$target.removeClass("vmd-outline");
                $target.css("outline", "");
                }
            }
      })
      .on("mouseout", function(event) {
        //$(event.target).css("outline", "");
            //$(event.target).removeClass("vmd-outline");
            VMD.$(event.target).css("outline", "");
            VMD.$(event.target).css("cursor", "");
      });


    /***************
        Overlay
    ***************/

    VMD.body.click(function(event) {

        /* If VMD isn't active, return true and follow links and buttons */
        if (!VMD.active) 
            return (true);

      /*******************
         Overlay Setup
      *******************/

        if (!event.shiftKey) {
            return (false);
        }

        VMD.clearPageSelection();

      var $target = VMD.$(event.target),
        $overlay = $target.closest("overlay.VMD");

        /* Exclude any elements in the vmd toolbar */
        if ($target.closest("#vmd").length)
            return (false);

      /* Don't initialize pre-initialized elements or their children. */
      if ($target.hasClass("vmd-initialized")) {

            /* Bring menu to forefront */
            VMD.selectButton ($target);

        } else {
        /*******************
           Initialization
        *******************/

        VMD._alphabetIndex++;

            var alphabetLetter = String.fromCharCode(VMD._alphabetIndex);

            $target.addClass("vmd-initialized");
            $target.data("vmd-button-letter", alphabetLetter);

        /* Properties Map */
        VMD.$("<code></code>")
          .attr("name", "propertiesMap")
          .css({
            display: "none",
            fontSize: "0.8rem",
            fontFamily: "monospace",
            background: "rgb(50, 65, 65)",
            padding: "0.35rem",
            textAlign: "center",
            color: "#fff",
            textShadow: "0px 0px 1px rgb(50, 50, 50)",
            marginBottom: "0.4rem"
          })
          .prop("contenteditable", true)
          .prop("spellcheck", false)
          .html(VMD.propertiesMapDefault)
          .appendTo($target);

        /* Key */
        var $key = VMD.$("<span></span>");
        $key
          .attr("name", "key")
          .css({ 
            position: "absolute",
            top: 0,
            right: 0,
            padding: "0.15rem 0.4rem 0.10rem 0.4rem",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            background: "rgba(50, 65, 65, 0.20)",
            border: "1px solid rgba(255, 255, 255, 0.20)",
                    borderRadius:"16px",
            color: "#fff",
            textShadow: "0px 0px 3px rgb(25, 25, 50), 0px 0px 5px rgb(25, 25, 50), 0px 0px 8px rgb(25, 25, 50)",
            zIndex: 1,
            cursor: "default",
            userSelect: "none"
          })
          .html(String.fromCharCode(VMD._alphabetIndex))
                .appendTo($target);

            //$target.append($key);
            /******************
               Add button
            *******************/

            var vmdButtonId = 'vmd-button-' + alphabetLetter;
            var vmdButton = '<button id="' + vmdButtonId + '" class="ui vmd-element button">A</button>';
            vmdButton = VMD.$(vmdButton).html(alphabetLetter);
            VMD.$("#vmd-ui-buttons").append (vmdButton);

            VMD.updateButton(vmdButtonId, $target);

            VMD.selectButton ($target);
        }

        return (true);

      if ($target.has("code[name='propertiesMap']")) {
        updateParameters($overlay);

        var id = getElementLabel($overlay.parent()),
          propertiesMap = $target.text(),
          options = $.extend({}, $overlay.data("VMD").options);

        if (options.easing === "swing") delete options.easing;
        if (options.delay == 0) delete options.delay;
        delete options.loop;
        delete options.begin;
        delete options.complete;
        options = objectToString(options);

        console.log("$(\"" + id + "\").velocity(" + propertiesMap + ", " + options + ");");
        } else {

        /***********************
           Overlay Generation
        ***********************/

        /* Container */
        var $modal = VMD.$("<modal></modal>");
        $modal.css({ 
          position: "absolute",
          left: "50%",
          marginLeft: "-6rem",
          width: "12rem",
          minHeight: "5rem",
          backgroundColor: "white",
          borderRadius: "3px",
          boxShadow: "0px 0px 3px 0px rgba(50, 50, 65, 0.5)",
          padding: "0.6rem 0.5rem 0.5rem 0.5rem",
          opacity: "0.975"
        });

        /* Key */
        var $key = VMD.$("<span></span>");
        $key
          .attr("name", "key")
          .css({ 
            position: "absolute",
            top: 0,
            right: 0,
            padding: "0.15rem 0.4rem 0.10rem 0.4rem",
            fontSize: "0.5rem",
            textTransform: "uppercase",
            //background: "rgb(50, 65, 65)",
            //border: "1px solid white",
            color: "#fff",
            textShadow: "0px 0px 3px rgb(25, 25, 50), 0px 0px 5px rgb(25, 25, 50), 0px 0px 8px rgb(25, 25, 50)",
            zIndex: 1,
            cursor: "default",
            userSelect: "none"
          })
          .html(String.fromCharCode(VMD._alphabetIndex));


        /* Label */
        var $label = VMD.$("<div></div>");
        $label
          .html(getElementLabel($target))
          .css({
            cursor: "default",
            color: "#5a96df",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.9rem",
            marginBottom: "0.5rem"
          })
          .appendTo($modal);

        /* Properties Map */
        VMD.$("<code></code>")
          .attr("name", "propertiesMap")
          .css({
            display: "block",
            fontSize: "0.8rem",
            fontFamily: "monospace",
            background: "rgb(50, 65, 65)",
            padding: "0.35rem",
            textAlign: "center",
            color: "#fff",
            textShadow: "0px 0px 1px rgb(50, 50, 50)",
            marginBottom: "0.4rem"
          })
          .prop("contenteditable", true)
          .prop("spellcheck", false)
          .html(VMD.propertiesMapDefault)
          .appendTo($modal);

        /* Controls */
        var $controls = VMD.$("<table></table>");
        $controls
          .attr("name", "options")
          .appendTo($modal);

        /* Duration and delay */
        var $duration = 
            VMD.$("<input type='range' />")
              .attr({ 
                name: "duration",
                min: "100",
                max: "4000",
                value: _durationDefault,
                step: "50"
              })
              .css({
                width: "6.5rem"
              })
              .wrap("<td />")
              .parent()
              .add("<td style='cursor: default; text-align: right; width: 100%;'>" + _durationDefault + "ms</td>")
              .wrapAll("<tr></tr>")
              .parent()
              .appendTo($controls);

        var $delay = 
            VMD.$("<input type='range' />")
              .attr({ 
                name: "delay",
                min: "0",
                max: "2000",
                value: _delayDefault,
                step: "25"
              })
              .css({
                width: "6.5rem"
              })
              .wrap("<td />")
              .parent()
              .add("<td style='cursor: default; text-align: right; width: 100%;'>" + _delayDefault + "ms</td>")
              .wrapAll("<tr></tr>")
              .parent()
              .appendTo($controls);

        /* Easing */
        var $easing = 
            VMD.$("<select></select>")
              .attr("name", "easing")
              .css({
                backgroundColor: "transparent",
                border: "none",
                width: "6.5rem",
                fontSize: "0.85rem"
              })
              .wrap("<td />")
              .parent();

        var $easingArray = 
            VMD.$("<code></code>")
              .attr("name", "easingArray")
              .css({
                display: "none",
                fontSize: "0.5rem",
                fontFamily: "monospace",
                background: "rgb(50, 65, 65)",
                padding: "0.35rem",
                textAlign: "center",
                color: "#fff",
                textShadow: "0px 0px 1px rgb(50, 50, 50)"
              })
              .prop({
                contenteditable: "true",
                spellcheck: "false"
              })
              .wrap("<td />")
              .parent();

        $easing.add($easingArray)
          .wrapAll("<tr></tr>")
          .parent()
          .appendTo($controls);

        VMD.$("<option></option>")
          .attr({
            "data-array": "true",
            value: "[500,20]"
          })
          .html("spring physics...")
          .appendTo($easing.children());

        VMD.$("<option></option>")
          .attr({
            "data-array": "true",
            value: "[.25,1,.25,1]"
          })
          .html("cubic bezier...")
          .appendTo($easing.children());

        VMD.$("<option></option>")
          .attr({
            "data-array": "true",
            value: "[ 4 ]"
          })
          .html("step...")
          .appendTo($easing.children());

        $.each($.Velocity.Easings, function(name) {
          VMD.$("<option></option>")
            .attr({
              name: name,
              value: name
            })
            .prop({
              selected: (name === VMD._easingDefault)
            })
            .html(name)
            .appendTo($easing.children());
        });

        /* Overlay insertion. */
        var $overlay = VMD.$("<overlay></overlay>")
            .attr("id", "overlay-" + VMD._alphabetIndex)
            .css({
              width: "100%",
              left: "100%",
              top: 0,
              left: 0,
              position: "absolute",
              zIndex: 10001
            })
            .addClass("VMD")
            .data("VMD", { 
              mouse: "enter",
              propertiesMap: {},
              options: {
                duration: VMD._durationDefault,
                delay: VMD._delayDefault,
                easing: VMD._easingDefault,
                loop: false,
                begin: function(elements) {
                  $.each(elements, function(i, element) {
                    clearElementStyles(element);
                  });

                  VMD.$(this).find("overlay.VMD code[name='propertiesMap']")
                    .velocity("stop", true)
                    .velocity({ color: VMD._indicatorColor }, 75)
                    .velocity("reverse");
                },
                complete: function(elements) {
                  var $this = VMD.$(this),
                    propertiesMap = $this.find("overlay.VMD").data("VMD").propertiesMap,
                    options = $this.find("overlay.VMD").data("VMD").options;

                  if (options.loop === true && typeof propertiesMap === "string") {
                    $.each(elements, function(i, element) {
                      VMD.$(this).velocity(propertiesMap, options);
                    });
                  }
                }
              }
            })
            .append($key)
            //.append($modal)
            .appendTo($target)
            .velocity("fadeIn", "fast");

        if ($overlay.parent().css("position") === "static") {
          $overlay.parent().css("position", "relative");
        }
      }
    });

}

/*
 * Prepare the VMD subsystem.
 */
VMD.prep();
