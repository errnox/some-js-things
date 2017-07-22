$(document).ready(function() {
    function init() {
	// Animate the sidebar
	$('#sidebar') .animate({
	    opacity: 0.25,
	    left: '+=50',
	    height: 'toggle',
	}, 600, function() {
	    // Animation complete
	});

	$('#sidebar') .animate({
	    opacity: 1,
	    left: '-=50',
	    height: 'toggle',
	}, 1000, function() {
	    // Animation complete
	});
	console.log('loaded');

	// Animate the body
	$('body').animate({
	    'opacity': '.25',
	}, 1000, function() {
	    // Animation complete
	});

	$('body').animate({
	    'opacity': '1',
	}, 1000, function() {
	    // Animation complete
	});

	// Animate the body using chained animations
	$('body').animate({
	    textIndent: 0,
	}, {
	    step: function(now,fx) {
		$(this).css({'-moz-transition': 'all 1s',
			     '-moz-transform': 'scale(.5)',
			     'border': '200px solid #000000',
			    });
	    },
	    duration: 'slow'
	}, 'linear');

	$('body').animate({
	    textIndent: 0,
	}, {
	    step: function(now,fx) {
		$(this).css({'-moz-transition': 'all 1s',
			     '-moz-transform': 'scale(1)',
			     'border': '0px solid #000000',
			    });
	    },
	    duration: 'slow'
	}, 'linear');
    }

    // // Add some gimmicks (interfers with other animations/settings)
    // $('#content').click(function() {
    // 	addGimmicks();
    // });

    function addGimmicks() {
	$('body').css({
	    '-moz-transition': 'all 1s',
	    '-moz-transform': 'scale(.5)',
	});

	// Clicking
	$('*').toggle(function() {
	    $(this).css({'opacity': '.5'});
	}, function() {
	    $(this).css({'opacity': '1'});
	});

	// Hovering
	$('body *').hover(function () {
	    $(this).css({
		'-moz-transition': 'all 1s',
		'-moz-transform': 'scale(1.2)',
	    });
	}, function() {
	    $(this).css({
		'-moz-transition': 'all 1s',
		'-moz-transform': 'scale(1)',
	    });
	});
    }

    function toggleNotification() {
	$('#slideIn').toggleClass('hide');
	$('#slideInContent').toggleClass('hide');
    }

    $('#sidebar').click(function() {
	toggleNotification();
    });

    $('#notificationHover').hover(function() {
	toggleNotification();
    }, function() {
	toggleNotification();
    });
});
