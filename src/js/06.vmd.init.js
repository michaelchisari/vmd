$vmd.initialize = function () {

    /*************
        Setup
    *************/

    var alphabetIndex = 64,
        propertiesMapDefault = '{ }';

    $vmd.body = $vmd.$("body");

    var VERSION = "1.1.0-rc1",
        INDICATOR_COLOR = "#82E682",
        DURATION_DEFAULT = 800,
        EASING_DEFAULT = "swing",
        DELAY_DEFAULT = 0;

    /*********************
        Notifications
    *********************/

    var instructions = [
            "Velocity Motion Designer " + VERSION + ". http://VelocityJS.org",
            " * Note: All HREF links are disabled.",
            " * Note: Refer to \"CSS Support\" on http://VelocityJS.org for supported properties.",
            " * Note: You have access to all UI pack effects: http://VelocityJS.org/#uiPack.",
            " - Shift-click on an element: Initialize.",
            " - Click on a key identifier: Toggle looping.",
            " - Enter key (when modifying animation parameters): Animate.",
            " - a-z keys: Restart/reset the associated animation.",
            " - 1 key: Restart all animations.",
            " - 2 key: Reset all animations.",
            " - Esc key: Close visible modal."
        ];

    $vmd.$.each(instructions, function(i, instruction) {
        console.log(instruction);
    });

    document.title = "VMD | " + document.title;

    var vmdToolbar  = '<div id="vmd" class="ui menu">';
    vmdToolbar += '</div>';

    $vmd.body.prepend(vmdToolbar);

    console.log ($vmd.$("#vmd"));
    $vmd.$("#vmd").append($vmd.buildToolbar());

    // Allow the menubar to be vertically draggable, in case it covers elements 
    $("#vmd").draggable({"revert": false, "handle": "div.ui-widget-handle", "grid": [0, 1]});

    /*
     * Create a list of Velocity css transforms.
     */

    $vmd.$.Velocity.Transforms = {

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
    var vmdToolbar  = '<div id="vmd" class="ui menu">';
        vmdToolbar += '</div>';

    $("body").prepend(vmdToolbar);

    $vmd.systemFont = 'Helvetica Neue, Arial';

    $vmd.css('font-family', $vmd.systemFont, 'important');

    /***************
       VMD Functions
    ***************/

    /*
     * Select a toolbar button
     */
    $vmd.selectButton = function ($target) {
        var menuId = '#vmd-button-' + $target.data("vmd-button-letter");
        $vmd.closeMenus();

        $vmd.openMenu ($(menuId));
        
        return (true);
    }

    console.log ("Load #2");

}

$vmd.loadJQuery();

$(document).ready(function() {

    $vmd.loadLibraries();

    $vmd.buildFunctions();

    $vmd.initialize();

    $vmd.enableOutlining();

});
