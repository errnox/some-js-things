$(document).ready(function() {
    function draw() {
	var canvas = $('#mainCanvas')[0];

	if (canvas.getContext) {
	    console.log('Context found');
	    var ctx = canvas.getContext('2d');

	    for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
		    // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		    ctx.fillStyle = 'rgba(0, ' + y*50 + ', 200,' + 0.1*y*x + ')';
		    ctx.fillRect(x*50, y*50, 10, 10);
		}
	    }

	    ctx.fillStyle = 'rgba(0, 150, 0, 0.5)';
	    ctx.fillRect(50, 50, 150, 150);
	    ctx.strokeRect(70, 70, 150, 150);
	    ctx.clearRect(80, 80, 50, 50);

	    // animate(canvas, ctx);
	} else {
	    console.log('No context found');
	}
    }

    function animate(canvas, ctx) {
	var moveRight = true;
	var moveDown = true;
	var rect = {x: 80, y: 20, width: 50, height: 50};
	ctx.fillStyle = 'rgba(0, 0, 150, 0.1)';
	setInterval(function() {

	    // Check horizontal movement
	    if (rect.x == canvas.width) {
		moveRight = false;
	    } else if (rect.x == 0) {
		moveRight = true;
	    }

	    if (moveRight){
		rect.x += 5;
	    } else {
		rect.x -= 5;
	    }

	    // Check vertical movement
	    if (rect.y == canvas.height) {
		moveDown = false;
	    } else if (rect.x == 0) {
		moveDown = true;
	    }

	    if (moveDown){
		rect.y += 5;
	    } else {
		rect.y -= 5;
	    }

	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	}, 1);
    }

    draw();

    function drawShapes() {
	var canvas = document.getElementById('mainCanvas');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = 'rgba(150, 0, 0, 0.5)';
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'rgba(150, 0, 0, 1.0)';

	ctx.beginPath();
	ctx.moveTo(90, 90);
	ctx.lineTo(100, 140);
	ctx.lineTo(140, 100);
	ctx.moveTo(200, 200);
	ctx.arc(60, 65, 5, 0, Math.PI*2, true);
	ctx.fill();
    }

    function drawPath() {
	var canvas = document.getElementById('mainCanvas');
	var ctx = canvas.getContext('2d');

	ctx.lineWidth = 5;
	ctx.fillStyle = 'rgba(0, 150, 0, 0.5)';
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

	ctx.moveTo(300, 280);
	ctx.lineTo(240, 240);
	ctx.lineTo(260, 240);

	ctx.stroke();
    }

    function drawBezier() {
	var canvas = document.getElementById('mainCanvas');
	var ctx = canvas.getContext('2d');

	ctx.lineWidth = 5;
	ctx.fillStyle = 'rgba(0, 150, 0, 0.5)';
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

	ctx.moveTo(250, 250);
	ctx.bezierCurveTo(360, -125, -120, 162.5, 220, 262.6);

	ctx.stroke();
    }

    drawShapes();
    drawPath();
    drawBezier();

    // ====================================================================
    // Animation
    // ====================================================================

    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');
    var rect = {x: 0, y: 0, width: 50, height: 50};

    function render() {
	rect.x += 5;
	ctx.fillStyle = 'rgba(150, 0, 0, 0.5)';
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    var main = function() {
	var now = Date.now();
	var delta = now - then;

	// update(delta / 1000);
	render();

	then = now;
    }

    var then = Date.now();
    // setInterval(main, 1);
});
