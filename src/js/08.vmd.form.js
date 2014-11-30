/*  Build Form */
$vmd.buildForm = function () {

    /* Input form for animations */
    var vmdForm = '';
        vmdForm += '<div class="vmd-form">';
        vmdForm += '    <div class="vmd-form-handle ui top attached black block blue header segment">';
        vmdForm += '        <div class="ui two column grid">';
        vmdForm += '            <div class="vmd-identifier ui column">.vmd-identifier</div>';
        vmdForm += '            <div class="ui right aligned column">';
        vmdForm += '                <div class="vmd-alphabet ui mini circular blue button">A</div>';
        vmdForm += '            </div>';
        vmdForm += '        </div>';
        vmdForm += '    </div>';
        vmdForm += '    <div class="ui fluid attached form segment">';
        vmdForm += '      <div class="field">';
        vmdForm += '          <label>Transition</label>';
        vmdForm += '          <div class="ui fluid action input">';
        vmdForm += '            <input type="text" name="transition" placeholder="Transition">';
        vmdForm += '            <div class="ui button"><i class="play icon"></i></div>';
        vmdForm += '          </div>';
        vmdForm += '      </div>';
        vmdForm += '      <div class="four fields">';
        vmdForm += '        <div class="field">';
        vmdForm += '            <label>Duration: <b><span class="vmd-duration-amount">' + $vmd.DURATION_DEFAULT + '</span>ms</b></label>';
        vmdForm += '            <input type="range" name="duration" min="100" max="4000" value="' + $vmd.DURATION_DEFAULT + '" />';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '            <label>Delay: <b><span class="vmd-delay-amount">' + $vmd.DELAY_DEFAULT + '</span>ms</b></label>';
        vmdForm += '            <input type="range" name="delay" min="0" max="2000" value="' + $vmd.DELAY_DEFAULT + '" />';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '            <select name="easing" class="vmd-easing-dropdown ui compact selection dropdown" id="easing">';
        vmdForm += '            </select>';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '          <div class="vmd-easing-data ui fluid input">';
        vmdForm += '            <input type="text" name="easing-data" placeholder="Easing data">';
        vmdForm += '          </div>';
        vmdForm += '        </div>';
        vmdForm += '      </div>';
        vmdForm += '    </div>';
        vmdForm += '    <div class="ui bottom attached black block header segment">';
        vmdForm += '        <div class="ui two column grid">';
        vmdForm += '            <div class="ui vmd-identifier gray right aligned right floated column">.vmd-identifier</div>';
        vmdForm += '        </div>';
        vmdForm += '    </div>';
        vmdForm += '</div>';

    return (vmdForm);
}
