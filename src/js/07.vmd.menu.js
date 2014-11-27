    /*  Build Menu */
    $vmd.buildMenu = function() {

        var vmdOnOff = '';
            vmdOnOff += '  <div id="vmd-logo" class="ui mini label">VMD</div>';
            vmdOnOff += '  <div id="vmd-on-off" class="ui mini circular toggle button">Off</div>';

        var vmdMenu = '';
            vmdMenu += '  <div class="left menu">';
            vmdMenu += '  <div class="ui mini button ui-widget-handle">|||</div>';
            vmdMenu +=    vmdOnOff;
            vmdMenu += '  </div>';
            vmdMenu += '  <div id="vmd-ui-buttons" class="mini attached ui buttons">';
            vmdMenu += '  </div>';
            vmdMenu += '  <div class="right menu">';
            vmdMenu += '    <div class="ui mini buttons">';
            vmdMenu += '        <div class="ui positive button">1 <i class="play icon"></i></div>';
            vmdMenu += '        <div class="or"></div>';
            vmdMenu += '        <div class="ui negative button">2 <i class="pause icon"></i></div>';
            vmdMenu += '    </div>';
            vmdMenu += '  </div>';
            vmdMenu += '  </div>';

        return vmdMenu;
    }
