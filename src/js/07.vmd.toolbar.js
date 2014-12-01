/*  Build Toolbar */
$vmd.buildToolbar = function() {

    var vmdMenu = '';
        vmdMenu += '<div class="vmd-toolbar ui fitted segment">';
        vmdMenu += '    <div class="ui two column grid">';
        vmdMenu += '        <div class="left floated column">';
        vmdMenu += '            <div class="ui mini label vmd-toolbar-handle">|||</div>';
        vmdMenu += '            <div id="vmd-logo" class="ui mini label">VMD</div>';
        vmdMenu += '            <div id="vmd-on-off" class="ui mini circular toggle button">Off</div>';
        vmdMenu += '            <div id="vmd-ui-buttons" class="mini attached ui buttons"></div>';
        vmdMenu += '        </div>';
        vmdMenu += '        <div class="right floated right aligned column">';
        vmdMenu += '            <div class="ui mini buttons">';
        vmdMenu += '                <div class="vmd-play-all ui positive button">1 <i class="play icon"></i></div>';
        vmdMenu += '                <div class="or"></div>';
        vmdMenu += '                <div class="vmd-play-all ui negative button">2 <i class="pause icon"></i></div>';
        vmdMenu += '            </div>';
        vmdMenu += '        </div>';
        vmdMenu += '    </div>';
        vmdMenu += '</div>';

    return vmdMenu;
}
