$(document).ready(function() {
    function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
    }

    randElems = [
	'<p>one</p>',
	'<p>two</p>',
	'<p>three</p>',
	'<p>four</p>',
	'<h2>This is a headline</h2>',
	'<ul><li><a href="http://www.example.com/">IANA</a></li></ul>',
	'<table>\
           <tr>\
             <td>foo</td>\
             <td>bar</td>\
             <td>foobar</td>\
             <td>foobaz</td>\
           </tr>\
           <tr>\
             <td>oof</td>\
             <td>rab</td>\
             <td>raboof</td>\
             <td>zaboof</td>\
           </tr>\
         </table>'
    ];

    for (i = 0; i < 50; i++){
	randElem = randElems[randomInt(0, randElems.length)];
	color = 'rgb(255, 0, ' + randomInt(0, 255) + ')';
	$('#mainContent').append(randElem)
    }

    $('#mainContent').children().each(function() {
	$(this).css({'background-color': 'rgba(' + randomInt(0, 255) +
		     ', ' + randomInt(0, 255) + ', ' +
		     randomInt(0, 255) + ', 0.' + randomInt(0, 9) + ')'});
    });

    $('#content').prepend('<input id="testButton" type="submit" value="Something"/>');
    $('#testButton').css({'background-color': 'blue'});

    buttonScaled = false;

    $('#testButton').click(function() {
	    $('html').css({'-moz-transform': 'scale(1)',
			   '-moz-transition': 'all 1s'});

	if (buttonScaled) {
	    // Scale the button
	    $(this).css({'-moz-transform': 'scale(1)',
			 'background-color': 'blue',
			 '-moz-transition': 'all .25s'});
	    buttonScaled = false;

	    // Scale the site
	    $('#mainContent').css({'-moz-transform-origin': '50% 0%',
				   '-moz-transform': 'scale(1)',
				   '-moz-transition': 'all .5s'});
	} else {
	    // Scale the button
	    $(this).css({'-moz-transform': 'scale(2) rotate(-10deg)',
			 'background-color': 'red',
			 '-moz-transition': 'all .25s'});
	    buttonScaled = true;

	    // Scale the site
	    $('#mainContent').css({'-moz-transform-origin': '50% 0%',
				   '-moz-transform': 'scale(.8)',
				   '-moz-transition': 'all .5s'});
	}
    });

    scrolling = false;
    mainBgColor = $('#mainContent').css('background-color');
    // // Not working
    // $(window).scroll(function() {
    // 	if (scrolling) {
    // 	    $('#mainContent').css({'background-color': 'red',
    // 				   '-moz-transition': 'all .5s'});
    // 	    scrolling = false;
    // 	} else {
    // 	    $('#mainContent').css({'background-color': mainBgColor,
    // 				   '-moz-transition': 'all .5s'});
    // 	    scrolling = true;
    // 	}
    // });

    var t, l = (new Date()).getTime();

    $(window).scroll(function(){
	var now = (new Date()).getTime();
    
	if(now - l > 400){
	    $(this).trigger('scrollStart');
            l = now;
	}
    
	clearTimeout(t);
	t = setTimeout(function(){
            $(window).trigger('scrollEnd');
	}, 300);
    });

    $(window).bind('scrollStart', function(){
	$('#mainContent').css({'background-color': 'rgba(255, 255, 0, 0.5)',
			       '-moz-transition': 'all .5s'});
    });

    $(window).bind('scrollEnd', function(){
	$('#mainContent').css({'background-color': mainBgColor,
			       '-moz-transition': 'all .5s'});
    });

    // // If mouse position is > window height scroll down,
    // // if mouse position is < window height scroll up
    function dumbScrolling() {
	var status = 'idle',
	speedFactor = 1;

	$('body').mouseleave(function(e) {
	    status = 'idle';
            $('html,body').stop(true);
	});
	
	$('body').mousemove(function(e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY - $(window).scrollTop();
            var isBottom = (mouseY, status, (mouseY > $(window).height() / 2));

            if (status != 'bottom' && isBottom) {
		status = 'bottom';
		var to = $(document).height() - $(window).height();
		$('html, body').stop(true).animate({
		    'scrollTop': to
		}, speedFactor * (to - $(window).scrollTop()));
            } else if (status != 'top' && !isBottom) {
		status = 'top';
		$('html, body').stop(true).animate({
                    'scrollTop': 0
		}, speedFactor * $(window).scrollTop());
            }
	});
    }

    $.get('www.example.com', function(response) {
	alert(response);
    });


    function zoomAllElements() {
	// TODO: Zoom on every element individually
	$('#mainContent > *').hover(function(){
	    $(this).css({'-moz-transform': 'scale(2)',
			 'opacity': '.5',
			 '-moz-transform-origin': '50% 50%',
			 '-moz-transition': 'all .5s'})
	}, function() {
	    $(this).css({'-moz-transform': 'scale(1)',
			 'opacity': '1',
			 '-moz-transform-origin': '50% 50%',
			 '-moz-transition': 'all .5s'})
	});
    }

    var hoveredElement = null;
    $('*').hover(function() {
	hoveredElement = $(this).clone();
    });

    mouseBoxSet = false;
    $('#mainContent').click(function(e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;

	var mouseBox = '<div id="mouseBox">\
<div id="closeButton">X</div>\
<div id="mouseBoxContent">\
<p>Mouse Box</p>\
<p>barfoo</p>\
</div>\
</div>'

	if (!mouseBoxSet) {
	    $('html').append(mouseBox);
	    $('#mouseBox').css({'position': 'absolute',
				'background-color': 'rgba(255, 0, 0, .5)',
			       });
	    $('#mouseBox').css({'left': mouseX - ($('#mouseBox').width() / 2),
	    			'top': mouseY - ($('#mouseBox').height() / 2)});
	    $('#mouseBox').css({'-moz-transform': 'perspective(1200px) rotateY(-25deg) rotate(20deg)',
				'-moz-transition': 'all .2s'});

	    $('#mouseBoxContent').css({'padding': '10px'});

	    // Add the element at cursor to #mouseBox
	    $('#mouseBoxContent').append(hoveredElement);

	    mouseBoxSet = true;
	} else {
	    // $('#mouseBox').remove();
	    // mouseBoxSet = false;
	}

	$('#closeButton').css({'background-color': '#FF0000',
			       'padding': '2px',
			       'cursor': 'pointer',
			       'float': 'right'});


	var originalColor = '';
	$('#closeButton').hover(function() {
	    originalColor = $('#closeButton').css('background-color');
	    $('#closeButton').css({'background-color': '#AA0000'});
	}, function() {
	    $('#closeButton').css({'background-color': originalColor});
	});

	$('#mouseBox div[id="closeButton"]').click(function() {
	    $('#mouseBox').remove();
	    mouseBoxSet = false;
	});
    });


    // // DEBUG
    zoomAllElements();


    // $('#mainCanvas').css({'-moz-transform': 'perspective(800px) rotateX(52deg)',
    // 			  '-moz-transition': 'all 1s'});
});
