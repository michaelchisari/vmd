/*  Build Toolbar */
VMD.buildToolbar = function() {

    var _menu = '';
        _menu += '<div class="vmd-toolbar ui fitted segment">';
        _menu += '    <div class="ui two column grid">';
        _menu += '        <div class="left floated column">';
        _menu += '            <div class="ui mini label vmd-toolbar-handle">|||</div>';
        _menu += '            <div id="vmd-logo" class="ui mini label">VMD</div>';
        _menu += '            <div id="vmd-on-off" class="ui mini circular toggle button">Off</div>';
        _menu += '            <div id="vmd-ui-buttons" class="mini attached ui buttons"></div>';
        _menu += '        </div>';
        _menu += '        <div class="right floated right aligned column">';
        _menu += '            <div class="ui mini buttons">';
        _menu += '                <div class="vmd-play-all ui positive button">1 <i class="play icon"></i></div>';
        _menu += '                <div class="or"></div>';
        _menu += '                <div class="vmd-play-all ui negative button">2 <i class="pause icon"></i></div>';
        _menu += '            </div>';
        _menu += '        </div>';
        _menu += '    </div>';
        _menu += '</div>';

    return _menu;
}
