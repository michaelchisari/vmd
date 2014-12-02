/*  Build Form */
VMD.buildForm = function vmdBuildForm() {

    /* Input form for animations */
    var _form = '' +
                '<div class="vmd-form">' +
                '    <div class="vmd-form-handle ui top attached black block header segment">' +
                '        <div class="ui three column grid">' +
                '            <div class="vmd-identifier ui column">.vmd-identifier</div>' +
                '            <div class="ui center aligned column">' +
                '                <div class="vmd-alphabet ui mini circular button">A</div>' +
                '            </div>' +
                '            <div class="ui right aligned column">' +
                '                <i class="vmd-repeat-icon lightgray small repeat icon" data-content="Repeat" data-variation="basic small" data-position="right center"></i>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '    <div class="ui fluid attached form segment">' +
                '      <div class="field">' +
                '          <label>Transition</label>' +
                '          <div class="ui fluid action input">' +
                '            <input type="text" name="transition" placeholder="example: { translateX: [0, -1000] }">' +
                '            <div class="vmd-play ui button"><i class="play icon"></i></div>' +
                '          </div>' +
                '      </div>' +
                '      <div class="four fields">' +
                '        <div class="field">' +
                '            <label>Duration: <b><span class="vmd-duration-amount">' + VMD._durationDefault + '</span>ms</b></label>' +
                '            <input type="range" name="duration" min="100" max="4000" value="' + VMD._durationDefault + '" />' +
                '        </div>' +
                '        <div class="field">' +
                '            <label>Delay: <b><span class="vmd-delay-amount">' + VMD._delayDefault + '</span>ms</b></label>' +
                '            <input type="range" name="delay" min="0" max="2000" value="' + VMD._delayDefault + '" />' +
                '        </div>' +
                '        <div class="field">' +
                '            <select name="easing" class="vmd-easing-dropdown ui selection dropdown" id="easing">' +
                '            </select>' +
                '        </div>' +
                '        <div class="field">' +
                '          <div class="vmd-easing-data ui fluid input">' +
                '            <input type="text" name="easing-data" placeholder="eg, [50,20]" value="[ ]">' +
                '          </div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="ui bottom attached black block header segment">' +
                '        <div class="ui two column grid">' +
                '            <div class="ui vmd-identifier gray right aligned right floated column">.vmd-identifier</div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

    return (_form);
}
