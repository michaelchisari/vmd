/*  Build Toolbar */
VMD.buildToolbar = function vmdBuildToolbar() {

    var _toolbar = '' +
                   '<div class="vmd-toolbar ui fitted segment">' +
                   '    <div class="ui two column grid">' +
                   '        <div class="left floated column">' +
                   '            <div class="ui mini label vmd-toolbar-handle">|||</div>' +
                   '            <div id="vmd-logo" class="ui mini label">VMD</div>' +
                   '            <div id="vmd-on-off" class="ui mini circular toggle button">Off</div>' +
                   '            <div id="vmd-ui-buttons" class="mini attached ui buttons"></div>' +
                   '        </div>' +
                   '        <div class="right floated right aligned column">' +
                   '            <div class="ui mini buttons">' +
                   '                <div class="vmd-play-all ui positive button">1 <i class="play icon"></i></div>' +
                   '                <div class="or"></div>' +
                   '                <div class="vmd-play-all ui negative button">2 <i class="pause icon"></i></div>' +
                   '            </div>' +
                   '        </div>' +
                   '    </div>' +
                   '</div>';

    return _toolbar;
}
