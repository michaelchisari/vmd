VMD.enableEscapeKey = function vmdEnableEscapeKey() {
  VMD.body.keydown( function(event) {
    if (event.which == 27) {
      VMD.closeForms();
    }
  });
}

VMD.enablePlay = function vmdEnablePlay() {
  VMD.body.keydown( function(event) {
    if (event.which === 49) {
      if (!VMD.active) return (true);

      // If we're on an input field, return
      if(VMD.$("input,textarea").is(":focus")) return (true);

      VMD.animateAll();
    }
  });
}

VMD.enableAnimationKeys = function vmdEnableAnimationKeys() {
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

VMD.enableStop = function vmdEnableStop() {
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

VMD.animateAll = function vmdAnimateAll() {
  // Find all VMD targets
  for (t in VMD.Targets) {
    VMD.animate (VMD.Targets[t]);
  }

}

VMD.stopAll = function vmdStopAll() {
  for (t in VMD.Targets) {
      VMD.Targets[t] 
      .velocity("stop", true)
      .velocity({ color: VMD._indicatorColor }, 75)
      .velocity("reverse");
  }
}

VMD.animate = function vmdAnimate(target) {
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

VMD.updateParameters = function vmdUpdateParameters(target) {
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

VMD.enableOutlining = function vmdEnableOutlining() {

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
    var color = VMD._colorReference[VMD._colorIndex];

    $target.addClass("vmd-initialized");
    $target.data("vmd-button-letter", alphabetLetter);

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
        background: color,
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

      /*
       *  Add button
       */
      var vmdButtonId = 'vmd-button-' + alphabetLetter;
      var vmdButton = '<button id="' + vmdButtonId + '" class="ui vmd-element button">A</button>';
      vmdButton = VMD.$(vmdButton).html(alphabetLetter);
      VMD.$("#vmd-ui-buttons").append (vmdButton);

      VMD.updateButton(vmdButtonId, $target);

      VMD.selectButton ($target);
    }

    return (true);
  });

}

/*
 * Prepare the VMD subsystem.
 */
VMD.prep();
