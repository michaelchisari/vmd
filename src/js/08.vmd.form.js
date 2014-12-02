/*  Build Form */
VMD.buildForm = function () {

    /* Input form for animations */
    var _form = '';
        _form += '<div class="vmd-form">';
        _form += '    <div class="vmd-form-handle ui top attached black block header segment">';
        _form += '        <div class="ui three column grid">';
        _form += '            <div class="vmd-identifier ui column">.vmd-identifier</div>';
        _form += '            <div class="ui center aligned column">';
        _form += '                <div class="vmd-alphabet ui mini circular button">A</div>';
        _form += '            </div>';
        _form += '            <div class="ui right aligned column">';
        _form += '                <i class="vmd-repeat-icon lightgray small repeat icon" data-content="Repeat" data-variation="basic small" data-position="right center"></i>';
        _form += '            </div>';
        _form += '        </div>';
        _form += '    </div>';
        _form += '    <div class="ui fluid attached form segment">';
        _form += '      <div class="field">';
        _form += '          <label>Transition</label>';
        _form += '          <div class="ui fluid action input">';
        _form += '            <input type="text" name="transition" placeholder="example: { translateX: [0, -1000] }">';
        _form += '            <div class="vmd-play ui button"><i class="play icon"></i></div>';
        _form += '          </div>';
        _form += '      </div>';
        _form += '      <div class="four fields">';
        _form += '        <div class="field">';
        _form += '            <label>Duration: <b><span class="vmd-duration-amount">' + VMD._durationDefault + '</span>ms</b></label>';
        _form += '            <input type="range" name="duration" min="100" max="4000" value="' + VMD._durationDefault + '" />';
        _form += '        </div>';
        _form += '        <div class="field">';
        _form += '            <label>Delay: <b><span class="vmd-delay-amount">' + VMD._delayDefault + '</span>ms</b></label>';
        _form += '            <input type="range" name="delay" min="0" max="2000" value="' + VMD._delayDefault + '" />';
        _form += '        </div>';
        _form += '        <div class="field">';
        _form += '            <select name="easing" class="vmd-easing-dropdown ui selection dropdown" id="easing">';
        _form += '            </select>';
        _form += '        </div>';
        _form += '        <div class="field">';
        _form += '          <div class="vmd-easing-data ui fluid input">';
        _form += '            <input type="text" name="easing-data" placeholder="eg, [50,20]" value="[ ]">';
        _form += '          </div>';
        _form += '        </div>';
        _form += '      </div>';
        _form += '    </div>';
        _form += '    <div class="ui bottom attached black block header segment">';
        _form += '        <div class="ui two column grid">';
        _form += '            <div class="ui vmd-identifier gray right aligned right floated column">.vmd-identifier</div>';
        _form += '        </div>';
        _form += '    </div>';
        _form += '</div>';

    return (_form);
}
