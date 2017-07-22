$(document).ready(function() {
    $('#hoverLine').mouseover(function() {
	$('#hoverMenu').toggleClass('hidden');
	$('#hoverLine').css('z-index', '-9999');
	$('#mainContent').toggleClass('scaled');
    });

    $('#hoverMenu').mouseleave(function() {
	$('#hoverMenu').toggleClass('hidden');
	$('#hoverLine').css('z-index', '999999');
	$('#mainContent').toggleClass('scaled');
    });
});
