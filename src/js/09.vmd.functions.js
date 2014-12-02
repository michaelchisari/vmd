/*
 * Toggle page inputs on and off
 */
VMD.togglePageInputs = function vmdTogglePageInputs(on) {
   if (on) {
      /* Turn every non-vmd input on */
      VMD.$('a').each (function () {
         if (!VMD.$(this).closest("#vmd").length) {
            VMD.$(this).off('click');
         }
      });
      VMD.$('button').each (function () {
         if (!VMD.$(this).closest("#vmd").length) {
            VMD.$(this).off('click');
         }
      });
      VMD.$('input').each (function () {
         if (!VMD.$(this).closest("#vmd").length) {
            VMD.$(this).off('click');
         }
      });
   } else {
      /* Turn every non-vmd input off */
      VMD.$('a').on('click', function(e) { 
         if (!VMD.$(this).closest("#vmd").length) {
            e.preventDefault(); 
         }
      });
      VMD.$('button').on('click', function(e) { 
         if (!VMD.$(this).closest("#vmd").length) {
            e.preventDefault(); 
         }
      });
      VMD.$('input').on('click', function(e) { 
         if (!VMD.$(this).closest("#vmd").length) {
            e.preventDefault(); 
         }
      });
   }
}

/*
 * Turn the VMD on and off 
 */
VMD.createToggle = function vmdCreateToggle() {

   /* Make links, buttons and inputs unclickable */
   VMD.togglePageInputs(false);

   var $toggle  = VMD.$('#vmd-on-off');
   $toggle
   .state({
      text: {
      inactive : 'Off',
      active   : 'On'
      }
   });

   $toggle.addClass('active');
   $toggle.text('On');

   VMD.active = true;

   $toggle.click ( function(event) {
      var buttons = VMD.$('.ui.vmd-element.button');
      var keys = VMD.$('span[name="key"]');

      /* Set the global VMD active flag and toggle buttons */
      if ($toggle.hasClass('active')) {
         /* Add VMD to title */
         document.title = "VMD | " + document.title;

         if (buttons.length) {
            buttons.prop('disabled', '');
         }
         if (keys.length) keys.show();
         
         VMD.Toolbar.velocity ({ opacity: 1 }, 750);
         VMD.active = true;
         /* Make inputs unclickable */
         VMD.togglePageInputs (false);
      } else {
         /* Remove VMD from browser title */
         document.title = document.title.slice(5, document.title.length);
         VMD.active = false;
         VMD.Toolbar.velocity ({ opacity: 0.35 }, 750);
         if (buttons.length) {
            buttons.prop('disabled', 'disabled');
            VMD.closeForms();
         }
         if (keys.length) keys.hide();
         /* Make inputs clickable again */
         VMD.togglePageInputs(true);
      }
   });
};

/* Close all open menus */
VMD.closeForms = function vmdCloseForms() {
   // Un-select all element buttons
   VMD.$(".ui.vmd-element.button").each (function() {
      VMD.$(this).removeClass("active");
   });
   VMD.$(".vmd-form").each (function() {
      VMD.$(this).hide();
   });
}

/* Open the target select menu form */
VMD.openMenu = function vmdOpenMenu(target) {
   VMD.$(target).addClass('active');
   var id = '.' + VMD.$(target).attr('id');
   VMD.$(id).velocity({ opacity: 1 }, { display: "auto" });
}

/* Add functionality to elements. */
VMD.updateButton = function(targetId, targetElement) {

   /* Create the DOM id from the targetId */
   var id = '#' + targetId;

   /* Close any open menus. */
   VMD.closeForms();

   /* Create the velocity form */
   VMD.createForm(VMD.$(id), targetElement);

   /* Attach click behavior to element */
   VMD.$(id).click(function() {
      if (VMD.$(this).hasClass("active")) {
         /* Close the currently open menu */
         VMD.closeForms();
      } else {
         /* Close any open menus */
         VMD.closeForms();

         /* Open the currently clicked menu */
         VMD.$(this).addClass("active");
         VMD.openMenu(this);
      }
   });
}

/* Create the element form underneath the button. */
VMD.createForm = function createForm(target, targetElement) {
   
   var thisForm = VMD.$(VMD.buildForm());
   // Get the jquery path to the element
   var offset = VMD.$(target).offset();
   var identifier = VMD.$(targetElement).getPath()
   var targetId = target.attr('id');
   thisForm.find(".vmd-identifier").text(identifier);
   VMD.$(thisForm).css("position", "absolute");
   var left = offset.left - 100;
   if (left < 20) left = 20;
   VMD.$(thisForm).offset({ top: -8, left: left });
   VMD.$(thisForm).addClass(targetId);
   VMD.$(thisForm).find('.item').css('width', '100%');
   VMD.$(thisForm).css('width', 450);

   VMD.$(thisForm).find('.vmd-transition').css('width', '50%');
   VMD.$(thisForm).find('.vmd-transition').css('float', 'left');
   VMD.$(thisForm).find('.vmd-transition-input').css('width', '50%');
   VMD.$(thisForm).find('.vmd-transition-input').css('float', 'right');

   VMD.$(thisForm).find('.vmd-duration').css('width', '50%');
   VMD.$(thisForm).find('.vmd-duration').css('float', 'left');

   VMD.$(thisForm).find('.vmd-delay').css('width', '50%');
   VMD.$(thisForm).find('.vmd-delay').css('float', 'right');

   VMD.$(thisForm).find('.vmd-alphabet').text(String.fromCharCode(VMD._alphabetIndex))

   // Change the color of the form to differentiate between forms.
   VMD.$(thisForm).find('.vmd-form-handle').addClass (VMD._colorList[VMD._colorIndex]);
   VMD.$(thisForm).find('.vmd-alphabet').addClass (VMD._colorList[VMD._colorIndex]);
   VMD._colorIndex++;
   if (VMD._colorIndex > 5) VMD._colorIndex = 0;

   var extraEasings = {
      "spring physics...":'[500,20]',
      "cubic bezier...":'[0.25,1,0.25,1]',
      "step...":'[ 4 ]'
   }

   for (e in extraEasings) {
      var selected = '';
      if (e === VMD._easingDefault) {
         selected = 'selected';
      }
         var html = '<option ' + selected + ' value="' + extraEasings[e] + '">' + e + '</option>';
         VMD.$(thisForm).find('.vmd-easing-dropdown').append(html);
   }

   var easings = VMD.$.Velocity.Easings;
   for (e in easings) {
      var selected = '';
      if (e === VMD._easingDefault) {
         selected = 'selected';
      }
      var html = '<option ' + selected + ' value="' + easings[e] + '">' + e + '</option>';
      VMD.$(thisForm).find('.vmd-easing-dropdown').append(html);
   }

   // Update delay range slider
   VMD.$(thisForm).find("input[name='delay']").on ("input", function() {
      VMD.$(this).parent().find('.vmd-delay-amount').text(this.value);
   });

   // Update duration range slider
   VMD.$(thisForm).find("input[name='duration']").on ("input", function() {
      VMD.$(this).parent().find('.vmd-duration-amount').text(this.value);
   });

   // Set the current target.
   VMD.Targets[VMD._alphabetIndex] = targetElement;

   // Create the properties of the current target.
   VMD.$(targetElement).data("VMD", { });
   VMD.$(targetElement).data("VMD").propertiesMap = "Hello";
   VMD.$(targetElement).data("VMD").options = new Object;

   // When Enter key is pressed, animate
   VMD.$(thisForm).find("input[name='transition']").on ( "keydown", function(event) {
      if (event.which == 13) {
         event.preventDefault();
         var index = targetElement.data('vmd-index');
         VMD.animate(VMD.Targets[index]);
      }
   });

   // When the play button is pressed, animate.
   VMD.$(thisForm).find(".vmd-play").click ( function() {
      var index = targetElement.data('vmd-index');
      VMD.animate(VMD.Targets[index]);
   });

   // Initialize the target's default values.
   VMD.Targets[VMD._alphabetIndex].Alpha = VMD._alphabetIndex;
   VMD.Targets[VMD._alphabetIndex].Repeat = false;
   VMD.Targets[VMD._alphabetIndex].Properties = '{}';
   VMD.Targets[VMD._alphabetIndex].Easing = VMD._easingDefault;
   VMD.Targets[VMD._alphabetIndex].Delay = VMD._delayDefault;
   VMD.Targets[VMD._alphabetIndex].Duration = VMD._durationDefault;

   // Attach the target element index to the repeat icon
   VMD.$(thisForm).find(".vmd-repeat-icon").data('target-element', VMD._alphabetIndex);

   // Attach the index to the target element
   targetElement.data('vmd-index', VMD._alphabetIndex);

   // Initialize the repeat button's behavior
   VMD.$(thisForm).find(".vmd-repeat-icon").popup();
   VMD.$(thisForm).find(".vmd-repeat-icon").click ( function() {
      var target = VMD.$(this).data('target-element');
      VMD.$(this).toggleClass("lightgray");
      if (VMD.$(this).hasClass("lightgray")) {
         VMD.Targets[target].Repeat = false;
      } else {
         VMD.Targets[target].Repeat = true;
      }
   });

   // Append the form to the #vmd toolbar element.
   VMD.Toolbar.append(thisForm);

   VMD.$('.vmd-easing-dropdown').dropdown({
      "set selected":"swing",
      "onChange": function (value,text,$choice) {
         if (text.indexOf('...') > -1) {
            VMD.$('.vmd-easing-data input').val ('[' + value + ']');
            VMD.$('.vmd-easing-data').show();
         } else {
            VMD.$('.vmd-easing-data').hide();
         }
      }
   });

   VMD.$(".vmd-form").draggable( {
      "handle": ".vmd-form-handle",
      "cursor": "move"
   });

   VMD.$('.vmd-easing-data').hide();
}

/*
* Select a toolbar button
*/
VMD.selectButton = function vmdSelectButton($target) {
  var menuId = '#vmd-button-' + $target.data("vmd-button-letter");
  VMD.closeForms();

  VMD.openMenu (VMD.$(menuId));

  return (true);
}
