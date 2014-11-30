/*  Build Form */
$vmd.buildForm = function () {

    var vmdModalForm = '';
        vmdModalForm += '<div class="vmd vmd-edit-modal ui small modal">';
        vmdModalForm += '    <div class="header">';
        vmdModalForm += '      Translation';
        vmdModalForm += '    </div>';
        vmdModalForm += '    <div class="content">';
        vmdModalForm += '      <div class="left">';
        vmdModalForm += '        <i class="code icon"></i>';
        vmdModalForm += '      </div>';
        vmdModalForm += '      <div class="right">';
        vmdModalForm += '        <div class="ui form">';
        vmdModalForm += '          <div class="field">';
        vmdModalForm += '            <label>User Text</label>';
        vmdModalForm += '            <textarea></textarea>';
        vmdModalForm += '          </div>';
        vmdModalForm += '        </div>';
        vmdModalForm += '      </div>';
        vmdModalForm += '    </div>';
        vmdModalForm += '    <div class="actions">';
        vmdModalForm += '      <div class="two fluid ui buttons">';
        vmdModalForm += '        <div class="ui negative labeled icon button">';
        vmdModalForm += '          <i class="remove icon"></i>';
        vmdModalForm += '          Cancel';
        vmdModalForm += '        </div>';
        vmdModalForm += '        <div class="ui positive right labeled icon button">';
        vmdModalForm += '          Submit';
        vmdModalForm += '          <i class="checkmark icon"></i>';
        vmdModalForm += '        </div>';
        vmdModalForm += '      </div>';
        vmdModalForm += '    </div>';
        vmdModalForm += '</div>';

    var vmdTranslationDropdown = '';
        vmdTranslationDropdown += '<div class="ui tiny search selection dropdown">';
        vmdTranslationDropdown += '  <div class="default text">Translation</div>';
        vmdTranslationDropdown += '  <i class="dropdown icon"></i>';
        vmdTranslationDropdown += '  <div class="vmd-edit purple small circular ui icon button"><i class="edit icon"></i></div>';
        vmdTranslationDropdown +=    vmdModalForm;
        vmdTranslationDropdown += '  <div class="menu">';
        vmdTranslationDropdown += '  </div>';
        vmdTranslationDropdown += '</div>';

    var vmdEasingDropdown = '';
        vmdEasingDropdown += '<div class="ui dropdown">';
        vmdEasingDropdown += '  <div class="default text">Easing</div>';
        vmdEasingDropdown += '  <i class="dropdown icon"></i>';
        vmdEasingDropdown += '  <div class="menu">';
        vmdEasingDropdown += '    <div class="item">Edit</div>';
        vmdEasingDropdown += '    <div class="item">Remove</div>';
        vmdEasingDropdown += '    <div class="item">Hide</div>';
        vmdEasingDropdown += '  </div>';
        vmdEasingDropdown += '</div>';

    var vmdForm = '';
        vmdForm += '<div id="vmd-menu-a" class="ui vmd menu segment">';
        vmdForm += '  <div class="header item">';
        vmdForm += '    <label class="vmd-identifier" >#identifier</label>';
        vmdForm += '    <div class="blue circular ui icon button">';
        vmdForm += '        <i class="add icon"></i>';
        vmdForm += '    </div>';
        vmdForm += '    <div class="circular ui icon button">';
        vmdForm += '        <i class="setting icon"></i>';
        vmdForm += '    </div>';
        vmdForm += '  </div>';
        vmdForm += '<div class="ui grid segment">';
        vmdForm += '  <div class="two column row">';
        vmdForm += '  <div class="column">';
        vmdForm += '  <div class="vmd-transition item">';
        vmdForm +=      vmdTranslationDropdown;
        vmdForm += '  </div>';
        vmdForm += '  </div>';
        vmdForm += '  <div class="vmd-transition-input item">';
        vmdForm += '    <div class="ui mini icon input">';
        vmdForm += '        <input type="number" placeholder="0">';
        vmdForm += '    </div>';
        vmdForm += '  </div>';
        vmdForm += '  <div class="vmd-duration item">';
        vmdForm += '    <label for="duration">Duration</label>';
        vmdForm += '    <input id="slider1" class="ui small slider" type="range" min="100" max="500" step="10" />';
        vmdForm += '  </div>';
        vmdForm += '  <div class="vmd-delay item">';
        vmdForm += '    <label for="delay">Delay</label>';
        vmdForm += '    <input id="slider1" class="ui small slider" type="range" min="100" max="500" step="10" />';
        vmdForm += '  </div>';
        vmdForm += '  <div class="item">';
        vmdForm +=      vmdEasingDropdown;
        vmdForm += '  </div>';
        vmdForm += '</div>';
        vmdForm += '</div>';

        /* Input form for animations */

    var vmdForm = '';
        vmdForm += '<div class="vmd-form">';
        vmdForm += '    <div class="vmd-form-handle ui top attached black block blue header segment">';
        vmdForm += '        <div class="ui two column grid">';
        vmdForm += '            <div class="vmd-identifier ui column">.vmd-identifier</div>';
        vmdForm += '            <div class="ui right aligned column">';
        vmdForm += '                <div class="ui mini circular blue button">A</div>';
        vmdForm += '            </div>';
        vmdForm += '        </div>';
        vmdForm += '    </div>';
        vmdForm += '    <div class="ui fluid attached form segment">';
        vmdForm += '      <div class="field">';
        vmdForm += '          <label>Transition</label>';
        vmdForm += '          <div class="ui fluid input">';
        vmdForm += '            <input name="transition" placeholder="Transition">';
        vmdForm += '          </div>';
        vmdForm += '      </div>';
        vmdForm += '      <div class="four fields">';
        vmdForm += '        <div class="field">';
        vmdForm += '            <label>Duration: <b>1500ms</b></label>';
        vmdForm += '            <input type="range" name="duration" />';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '            <label>Delay: <b>500ms</b></label>';
        vmdForm += '            <input type="range" name="delay" />';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '            <div class="ui compact selection dropdown">';
        vmdForm += '              <input type="hidden" name="gender">';
        vmdForm += '              <div class="default text">Easing</div>';
        vmdForm += '              <i class="dropdown icon"></i>';
        vmdForm += '              <div class="menu">';
        vmdForm += '                <div class="item" data-value="1">ease-in-out</div>';
        vmdForm += '                <div class="item" data-value="0">ease-in-out</div>';
        vmdForm += '              </div>';
        vmdForm += '            </div>';
        vmdForm += '        </div>';
        vmdForm += '        <div class="field">';
        vmdForm += '          <div class="ui fluid input">';
        vmdForm += '            <input type="text" name="easing-data" placeholder="Easing Data">';
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
