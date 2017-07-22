window.onload = function() {
    var canvas;
    var ctx;
    var rect = {
	x: 20,
	y: 100,
	width: 100,
	height: 80,
    };
    var dragging = false;

    function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function rectangle(x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height)
	ctx.closePath();
	ctx.fill();
    }

    function mouseX(e) {
	return e.pageX - canvas.offsetLeft;
    }

    function mouseY(e) {
	return e.pageY - canvas.offsetTop;
    }

    function init() {
	canvas = document.getElementById('mainCanvas');
	ctx = canvas.getContext('2d');

	return setInterval(draw, 10);
    }

    function draw() {
	clear();
	ctx.fillStyle = 'rgba(255, 0, 0, .5)';
	// ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	rectangle(rect.x, rect.y, rect.width, rect.height);
    }

    function main() {
	init();
	draw();
    }

    // TEST
    function sprayPaint(x, y) {
	    ctx.fillStyle = 'rgba(255, ' +
		Math.floor(Math.random()*255) + ', 0, 0.5)';
	    ctx.fillRect(
		rect.x + Math.floor(Math.random() * 50),
		rect.y + Math.floor(Math.random() * 50),
		10, 10);
    }

    function mouseMove(e) {
	if (dragging) {
	    // rect.x = e.pageX - canvas.offsetLeft;
	    // rect.y = e.pageY - canvas.offsetTop;

	    rect.x = mouseX(e);
	    rect.y = mouseY(e);

	    rectangle(rect.x, rect.y, rect.height);
	    // sprayPaint(rect.x, rect.y); // TEST
	}
    }

    function mouseDown(e) {
	dragging = true;
	canvas.onmousemove = mouseMove;
    }

    function mouseUp(e) {
	dragging = false;
	canvas.onmousemove = null;
    }

    main();

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

};
