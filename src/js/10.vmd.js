$(document).ready(function (){

    /*****************
        Outlining
    *****************/

    $body
        .keydown( function(event) {
            if (!$vmd.active) return (false);

            if (event.shiftKey) {
                $(".vmd-outline").css("cursor", "pointer");
            }
        })
        .keyup( function(event) {
            if (!$vmd.active) return (false);

            if (event.which === 16) {
                $(".vmd-outline").css("cursor", "");
            }
        })
      .on("mouseover", function(event) {
            if (!$vmd.active) return (false);

        var $target = $(event.target);

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
            $(event.target).css("outline", "");
            $(event.target).css("cursor", "");
      });

    /***************
        Overlay
    ***************/

    $body.click(function(event) {

        /* If VMD isn't active, return true and follow links and buttons */
        if (!$vmd.active) 
            return (true);

      /*******************
         Overlay Setup
      *******************/

        if (!event.shiftKey) {
            return (false);
        }

        clearPageSelection();

      var $target = $(event.target),
        $overlay = $target.closest("overlay.VMD");

        /* Exclude any elements in the vmd toolbar */
        if ($target.closest("#vmd").length)
            return (false);

      /* Don't initialize pre-initialized elements or their children. */
      if ($target.hasClass("vmd-initialized")) {

            /* Bring menu to forefront */
            $vmd.selectButton ($target);

        } else {
        /*******************
           Initialization
        *******************/

        alphabetIndex++;

            var alphabetLetter = String.fromCharCode(alphabetIndex);

            $target.addClass("vmd-initialized");
            $target.data("vmd-button-letter", alphabetLetter);

        /* Properties Map */
        $("<code></code>")
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
          .html(propertiesMapDefault)
          .appendTo($target);

        /* Key */
        var $key = $("<span></span>");
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
          .html(String.fromCharCode(alphabetIndex))
                .appendTo($target);

            //$target.append($key);
            /******************
               Add button
            *******************/

            var vmdButtonId = 'vmd-button-' + alphabetLetter;
            var vmdButton = '<button id="' + vmdButtonId + '" class="ui vmd-element button">A</button>';
            vmdButton = $(vmdButton).html(alphabetLetter);
            $("#vmd-ui-buttons").append (vmdButton);

            $vmd.updateButton(vmdButtonId, $target);

            $vmd.selectButton ($target);
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
        var $modal = $("<modal></modal>");
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
        var $key = $("<span></span>");
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
          .html(String.fromCharCode(alphabetIndex));


        /* Label */
        var $label = $("<div></div>");
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
        $("<code></code>")
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
          .html(propertiesMapDefault)
          .appendTo($modal);

        /* Controls */
        var $controls = $("<table></table>");
        $controls
          .attr("name", "options")
          .appendTo($modal);

        /* Duration and delay */
        var $duration = 
            $("<input type='range' />")
              .attr({ 
                name: "duration",
                min: "100",
                max: "4000",
                value: DURATION_DEFAULT,
                step: "50"
              })
              .css({
                width: "6.5rem"
              })
              .wrap("<td />")
              .parent()
              .add("<td style='cursor: default; text-align: right; width: 100%;'>" + DURATION_DEFAULT + "ms</td>")
              .wrapAll("<tr></tr>")
              .parent()
              .appendTo($controls);

        var $delay = 
            $("<input type='range' />")
              .attr({ 
                name: "delay",
                min: "0",
                max: "2000",
                value: DELAY_DEFAULT,
                step: "25"
              })
              .css({
                width: "6.5rem"
              })
              .wrap("<td />")
              .parent()
              .add("<td style='cursor: default; text-align: right; width: 100%;'>" + DELAY_DEFAULT + "ms</td>")
              .wrapAll("<tr></tr>")
              .parent()
              .appendTo($controls);

        /* Easing */
        var $easing = 
            $("<select></select>")
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
            $("<code></code>")
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

        $("<option></option>")
          .attr({
            "data-array": "true",
            value: "[500,20]"
          })
          .html("spring physics...")
          .appendTo($easing.children());

        $("<option></option>")
          .attr({
            "data-array": "true",
            value: "[.25,1,.25,1]"
          })
          .html("cubic bezier...")
          .appendTo($easing.children());

        $("<option></option>")
          .attr({
            "data-array": "true",
            value: "[ 4 ]"
          })
          .html("step...")
          .appendTo($easing.children());

        $.each($.Velocity.Easings, function(name) {
          $("<option></option>")
            .attr({
              name: name,
              value: name
            })
            .prop({
              selected: (name === EASING_DEFAULT)
            })
            .html(name)
            .appendTo($easing.children());
        });

        /* Overlay insertion. */
        var $overlay = $("<overlay></overlay>")
            .attr("id", "overlay-" + alphabetIndex)
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
                duration: DURATION_DEFAULT,
                delay: DELAY_DEFAULT,
                easing: EASING_DEFAULT,
                loop: false,
                begin: function(elements) {
                  $.each(elements, function(i, element) {
                    clearElementStyles(element);
                  });

                  $(this).find("overlay.VMD code[name='propertiesMap']")
                    .velocity("stop", true)
                    .velocity({ color: INDICATOR_COLOR }, 75)
                    .velocity("reverse");
                },
                complete: function(elements) {
                  var $this = $(this),
                    propertiesMap = $this.find("overlay.VMD").data("VMD").propertiesMap,
                    options = $this.find("overlay.VMD").data("VMD").options;

                  if (options.loop === true && typeof propertiesMap === "string") {
                    $.each(elements, function(i, element) {
                      $(this).velocity(propertiesMap, options);
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

});