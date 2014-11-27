/***********************
    Helper Functions
***********************/

function objectToString (variable) {
    var properties = [];

    for (var property in variable) {
    	var value = variable[property];

    	if (Array.isArray(value)) {
    		value = "[" + value + "]";
    	} else if (!/^[0-9]+$/.test(value)) {
			value = '"' + value + '"';
		}
        
        properties.push(property + ": " + value);
    }

    return "{ " + properties.join(", ") + " }";
}

/* From: http://stackoverflow.com/questions/2068272/getting-a-jquery-selector-for-an-element */
$.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        if (node.attr('id')) {
            name = '#' + node.attr('id');
        }

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? ' > ' + path : '');

        node = parent;
    }

    return path;
};

/* From: http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript */
function clearPageSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
}
