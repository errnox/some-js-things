$(document).ready(function() {

    function init() {
	buildMap();
    }

    /* Helpers */
    
    function randrange(min, max) {
	var randVal = min+(Math.random()*(max-min));
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
    }


    /* Game */

    var map = {
	width: 20,
	height: 30,
	cells: new Array(this.height),
    }

    var cell = {
    	color: null,
    	width: 10,
    	height: 10,
    }

    function buildMap() {
	fillTable(map.width, map.height);

	for (var i = 0; i < map.height; i++) {
	    map.cells[i] = new Array(map.height);
	    for (var j = 0; j < map.width; j++) {
		map.cells[i][j] = new Object();
		map.cells[i][j].color = 'rgba(' + randrange(0, 255) + ', 255, 255, 1)';
	    }
	}
    }

    function fillTable(rows, columns) {
	var newTable;
	for (var i = 0; i < rows; i++) {
	    newTable += '<tr>';
	    for (var j = 0; j < columns; j++) {
		newTable += '<td>o</td>';
	    }
	    newTable += '</tr>';
	}
	$('#mainTable').append(newTable);
    }

    function colorizeTable() {
	$('#mainTable tr').each(function(x) {
	    $(this).children('td').each(function(y) {
		// Adds x and y attributes for later selection events
		// (e.g. click/hover)
		$(this).attr({
		    x: x,
		    y: y,
		});
		$(this).css('background-color', map.cells[y][x].color);
	    });
	});
    }

    function drawOnlyMarkedCells() {
	$('#mainTable tr').each(function(x) {
	    $(this).children('td').each(function(y) {
		if (map.cells[y][x].marked == true) {
		    $(this).css('background-color', '#FF0000');
		} else {
		    $(this).css('background-color', '#FFFFFF');
		}
	    });
	});
    }

    // TODO
    function drawMarkedConnectors() {
	var previous = null;
	var markedCells = [];
	$('#mainTable td').each(function(i) {
	    if (map.cells[$(this).attr('y')][$(this).attr('x')].marked == true) {
		markedCells.push($(this));
		if (previous != null) {
		    // Potentially draw lines in the future
		    //
		    // drawLine(
			// $(this).position().left,
			// $(this).position().top,
			// previous.position().left,
			// previous.position().top
		    // );
		}
		previous = $(this);
	    }
	});

	// for (var i = 0; i < markedCells.length; i++) {
	//     for (var j = 0; j < markedCells.length; j++) {
	// 	drawLine(
	// 	    markedCells[i].position().left,
	// 	    markedCells[i].position().top,
	// 	    markedCells[j].position().left,
	// 	    markedCells[j].position().top
	// 	);
	//     }
	// }
    }

    function randomizeColors() {
	$('#mainTable td').each(function() {
	    $(this).css('background-color', 'rgba(' + randrange(0, 255) + ', 255, 255, 1)');
	});
    }

    function rotateTable(deg, direction) {
	if (direction == 'left') {
	    deg = -deg;
	}

	$('#mainTable').css({
	    '-moz-transition': 'all 1s',
	    '-moz-transform': 'rotate(' + deg + 'deg)',
	});
    }

    // TODO
    function drawLine(x1, y1, x2, y2){
	// if (x1 - x2 < 0 && y1 -y2 > 0) {
	//     // First quadrant
	// } else 	if (x1 - x2 < 0 && y1 -y2 < 0) {
	//     // Second quadrant
	// } else 	if (x1 - x2 > 0 && y1 -y2 < 0) {
	//     // Third quadrant
	// } else 	if (x1 - x2 > 0 && y1 -y2 > 0) {
	//     // Fourth quadrant
	// }

	var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	// XXX: Angle is only correct for the first quadrant!
	var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	console.log(angle);
	var transform = 'rotate(' + angle + 'deg)';
	
	var line = $('<div>')
            .appendTo('html')
            .addClass('line')
            .css({
		'position': 'absolute',
		'-moz-transform': transform,
            })
            .width(length)
            .offset({left: x1, top: y1});

	return line;
    }

    function enableInteraction() {
	$('#mainTable td').hover(function() {
	    $(this).toggleClass('scaled');
	}, function() {
	    $(this).toggleClass('scaled');
	});

	$('#mainTable td').click(function() {
	    map.cells[$(this).attr('y')][$(this).attr('x')].marked = true;
	    // Does not redraw the whole map, only the current element
	    $(this).css('background-color', '#FF0000');

	    $(this).css({
		'-moz-transition': 'all 1s',
		'-moz-transform': 'rotate(25deg)',
	    });

	    drawMarkedConnectors();
	});
    }

    init();
    enableInteraction();
    // randomizeColors();
    colorizeTable();

    drawLine(100, 200, 10, 20);
    // drawLine(10, 10, 100, 100);
});
