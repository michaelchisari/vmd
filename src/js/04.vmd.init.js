/*
 * Initialize Velocity Motion Designer
 *
 * Initialize global variables, print instructions, create toolbar
 */
VMD.initialize = function () {

  VMD.buildFunctions();

  /*
   * System Variables
   */

  // Character in the alphabet for keydown and reference
  VMD._alphabetIndex = 64;

  // Map of Velocity properties attached to a target
  VMD._propertiesMapDefault = '{ }';

  // Shorthand for body element
  VMD.body = VMD.$('body');

  VMD._version = '1.1.0-rc1';
  VMD._indicatorColor = '#82E682';
 
  // Default settings
  VMD._durationDefault = 800;
  VMD._easingDefault = 'swing';
  VMD._delayDefault = 0;

  // Color list to cycle through, so forms are recognizable
  VMD._colorList = [ 'blue', 'orange', 'green', 'red', 'purple', 'teal' ];
  VMD._colorReference = [ '#3b83c0', '#e07b53', '#5bbd72', '#d95c5c', '#564f8a', '#00b5ad' ];
  VMD._colorIndex = 0;

  /*
   * Notifications
   */

  var instructions = [
    'Velocity Motion Designer ' + VMD._version + '. http://VelocityJS.org',
    ' * Note: All HREF links are disabled.',
    ' * Note: Refer to "CSS Support" on http://VelocityJS.org for supported properties.',
    ' * Note: You have access to all UI pack effects: http://VelocityJS.org/#uiPack.',
    ' - Shift-click on an element: Initialize.',
    ' - Click on a menus Repeat icon: Toggle looping.',
    ' - Enter key (when modifying animation parameters): Animate.',
    ' - a-z keys: Restart/reset the associated animation.',
    ' - 1 key: Restart all animations.',
    ' - 2 key: Reset all animations.',
    ' - Esc key: Close visible modal.'
  ];

  // Print instructions to the console
  VMD.$.each(instructions, function(i, instruction) {
    console.log(instruction);
  });

  // Add VMD indicator to browser title bar
  document.title = "VMD | " + document.title;

  // VMD Toolbar bare markup
  var toolBar  = '<div id="vmd"></div>';

  VMD.body.append(toolBar);

  // Toolbar class is also a jquery shorthand to the #vmd id.
  VMD.Toolbar = VMD.$('#vmd');
  VMD.Toolbar.append(VMD.buildToolbar());

  // On click, play all
  VMD.Toolbar.find(".vmd-play-all").click ( function() {
    VMD.animateAll();
  });

  // On click, stop all
  VMD.Toolbar.find(".vmd-stop-all").click ( function() {
    VMD.stopAll();
  });

  // Create the array of elements that are targetted
  VMD.Targets = [];

  // Allow the toolbar to be vertically draggable, to uncover elements
  VMD.Toolbar.draggable({"revert": false, "handle": ".vmd-toolbar-handle", "cursor": "move", "grid": [0, 1]});

  /*
   * Create a list of Velocity css transforms
   */
  // TODO: Add to searchable dropdown or some other reference
  VMD.$.Velocity.Transforms = {
    'opacity': 'opacity',
    'width': 'width',
    'height': 'height',
    'paddingTop': 'paddingTop',
    'paddingRight': 'paddingRight',
    'paddingBottom': 'paddingBottom',
    'paddingLeft': 'paddingLeft',
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'marginTop': 'marginTop',
    'marginRight': 'marginRight',
    'marginBottom': 'marginBottom',
    'marginLeft': 'marginLeft',
    'borderTopWidth': 'borderTopWidth (no %)',
    'borderRightWidth': 'borderRightWidth (no %)',
    'borderBottomWidth': 'borderBottomWidth (no %)',
    'borderLeftWidth': 'borderLeftWidth (no %)',
    'borderRadius': 'borderRadius (IE9+)',
    'outlineWidth': 'outlineWidth (no %)',
    'fontSize': 'fontSize',
    'lineHeight': 'lineHeight',
    'letterSpacing': 'letterSpacing (no %)',
    'wordSpacing': 'wordSpacing (no %)',
    'color': 'color (hex string)',
    'colorRed': 'colorRed (unitless or %)',
    'colorGreen': 'colorGreen (unitless or %)',
    'colorBlue': 'colorBlue (unitless or %)',
    'colorAlpha': 'colorAlpha (unitless)',
    'backgroundColor': 'backgroundColor (hex string)',
    'backgroundColorRed': 'backgroundColorRed (unitless or %)',
    'backgroundColorGreen': 'backgroundColorGreen (unitless or %)',
    'backgroundColorBlue': 'backgroundColorBlue (unitless or %)',
    'backgroundColorAlpha': 'backgroundColorAlpha (unitless or %)',
    'borderColor': 'borderColor (hex string)',
    'borderColorRed': 'borderColorRed (unitless or %)',
    'borderColorGreen': 'borderColorGreen (unitless or %)',
    'borderColorBlue': 'borderColorBlue (unitless or %)',
    'borderColorAlpha': 'borderColorAlpha (unitless)',
    'outlineColor': 'outlineColor (hex string)',
    'outlineColorRed': 'outlineColorRed (unitless or %)',
    'outlineColorGreen': 'outlineColorGreen (unitless or %)',
    'outlineColorBlue': 'outlineColorBlue (unitless or %)',
    'outlineColorAlpha': 'outlineColorAlpha (unitless)',
    'textShadowX': 'textShadowX (no %) (IE9+)',
    'textShadowY': 'textShadowY (no %) (IE9+)',
    'textShadowBlur': 'textShadowBlur (no %) (IE9+)',
    'boxShadowX': 'boxShadowX (no %)',
    'boxShadowY': 'boxShadowY (no %)',
    'boxShadowBlur': 'boxShadowBlur (no %)',
    'boxShadowSpread': 'boxShadowSpread (no %)',
    'translateX': 'selected>translateX',
    'translateY': 'translateY',
    'translateZ': 'translateZ (IE10+)',
    'scale': 'scale (unitless or %)',
    'scaleX': 'scaleX (unitless or %)',
    'scaleY': 'scaleY (unitless or %)',
    'rotateX': 'rotateX (unitless or deg) (IE10+)',
    'rotateY': 'rotateY (unitless or deg) (IE10+)',
    'rotateZ': 'rotateZ (unitless or deg)',
    'skewX': 'skewX (unitless or deg)',
    'skewY': 'skewY (unitless or deg)',
    'clipTop': 'clipTop (needs position:abs)',
    'clipRight': 'clipRight (needs position:abs)',
    'clipBottom': 'clipBottom (needs position:abs)',
    'clipLeft': 'clipLeft (needs position:abs)',
    'blur': 'blur (px/em/rem) (no IE, no FF, Android 4.4+)'
  }

  /*
   * Create the VMD toolbar 
   */
  VMD.Toolbar.show();

  /*
   * Enable various key controls
   */

  // Outlining
  VMD.enableOutlining();

  // Escape closes any open forms
  VMD.enableEscapeKey();

  // A-Z for specific elements
  VMD.enableAnimationKeys();

  // 1 to play all animations
  VMD.enablePlay();

  // 2 to stop all animations
  VMD.enableStop();

  // On/Off toggle for Toolbar 
  VMD.createToggle();
}

