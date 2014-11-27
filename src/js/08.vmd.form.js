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
    var vmdForm = ' \
        <div class="vmd-form" style="width:50%; min-width:1000px; margin-left:auto; margin-right:auto; position:absolute; top:50px; left: 60px;"> \
            <div class="ui top attached black block header"> \
                <div class="ui three column grid"> \
                    <div class="vmd-identifier gray aligned column"> \
                            #identifier \
                    </div> \
                    <div class="center aligned column"> \
                        <div class="small blue circular ui button" style="margin-top:-4px; box-shadow:2px 2px 4px rgba(0,0,0,0.6);">A</div> \
                    </div> \
                    <div class="right aligned column"> \
                        <div class="ui circular button"><i class="setting icon"></i></div> \
                    </div> \
                </div> \
            </div> \
            <div class="ui small attached form segment"> \
              <div class="drag ui grid"> \
                <div class="column"> \
                  <i class="small lightgray rotated content icon"></i> \
                </div> \
                <div class="seven wide column"> \
                    <div class="ui mini stretched search selection right labeled left icon dropdown"> \
                        <i class="wizard icon"></i> \
                        <input type="hidden" name="country"> \
                        <div class="default text">Transformation</div> \
                        <div class="menu"> \
                            <div class="item" data-value="opacity">opacity</div> \
                            <div class="item" data-value="blur">blur</div> \
                            <div class="item" data-value="translateX">translateX</div> \
                            <div class="item" data-value="translateY">translateY</div> \
                        </div> \
                    </div> \
                    <div class="ui right floated small blue button"><i class="small edit icon"></i></div> \
                </div> \
                <div class="two wide column"> \
                    <div class="ui left icon mini input"> \
                        <i class="circle icon" data-position="left center" data-content="Value"></i> \
                        <input placeholder="0" type="number"> \
                    </div> \
                </div> \
                <div class="three wide column"> \
                    <label class="ui two column grid"> \
                        <div class="left aligned column">Delay </div> \
                        <div class="right aligned column"> <b>150</b>ms</div> \
                    </label> \
                    <input placeholder="0" type="range" style="width:100%"> \
                </div> \
                <div class="two wide column"> \
                    <label class="ui two column grid"> \
                        <div class="left aligned column"> Duration </div> \
                        <div class="right aligned column"> <b>500</b>ms </div> \
                    </label> \
                    <input placeholder="0" type="range"> \
                </div> \
              </div> \
              <div class="ui divider"></div> \
              <div class="ui grid"> \
                    <div class="center aligned column"> \
                        <div class="ui mini blue icon button"><i class="add icon"></i></div> \
                    </div> \
              </div> \
            </div> \
            <h5 class="ui small bottom attached black block header"> \
                <div class="ui one column grid"> \
                    <div class="vmd-identifier left floated right aligned gray column"> \
                            #identifier \
                    </div> \
                </div> \
            </h5> \
        </div> ';

        return (vmdForm);
}
