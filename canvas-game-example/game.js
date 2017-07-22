window.onload = function() {
    var canvas;
    var ctx;
    var keysDown = {};
    var arrow = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
    };
    var player = {
	x: 10,
	y: 10,
	width: 50,
	height: 50,
	speed: 265
    };
    var movingObjects = new Array();
    var then;

    var heroReady = false;
    var heroIsMoving = false;

    var heroImage= new Image();
    heroImage.onload = function () {
	heroReady = true;
    };
    var heroImageSteady = "res/playerSteady.png";
    var heroImageLeft = "res/playerLeft.png";
    var heroImageRight = "res/playerRight.png";
    var heroImageUp = "res/playerUp.png";

    var jumping = false


    // Disable window scrolling for arrow key presses
    window.top.document.onkeydown = function(e) {
	e = e || window.event;

	var keyCode = e.keyCode;

	if (keyCode >= 37 && keyCode <= 40) {
	    return false;
	}

	// SPACE key
	if (keyCode == 32) {
	    jump();
	}
    }

    addEventListener('keydown', function(e) {
	keysDown[e.keyCode] = true;
    }, false);

    addEventListener('keyup', function(e) {
	delete keysDown[e.keyCode];
	keyups(e);
    }, false);

    // Performs the periodic main loop checking and catches key strokes
    var update = function(modifier) {
	if (arrow.left in keysDown) {
	    player.x -= player.speed * modifier;
	    setHeroImage(heroImageLeft);
	}

	if (arrow.right in keysDown) {
	    player.x += player.speed * modifier;
	    setHeroImage(heroImageRight);
	}

	if (arrow.up in keysDown) {
	    player.y -= player.speed * modifier;
	    setHeroImage(heroImageUp);
	}

	if (arrow.down in keysDown) {
	    player.y += player.speed * modifier;
	}

	// b key
	if (66 in keysDown) {
	    beamPlayer();
	}

	// // r key
	// if (82 in keysDown) {
	//     rotatePlayer();
	// }

	// SHIFT key
	if (16 in keysDown) {
	    player.speed = 512;
	} else {
	    player.speed = 256;
	}

	// c key
	if (67 in keysDown) {
	    addCanvas();
	}

    }

    function keyups(e) {
	if (e.keyCode == 32) {
	    jumping = false;
	}
    }

    function rectangle(x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.closePath();
	ctx.fill();
    }

    function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function init() {
	canvas = document.getElementById('mainCanvas');
	ctx = canvas.getContext('2d');

	setHeroImage(heroImageSteady);
	if (heroReady) {
	    ctx.drawImage(heroImage, player.x, player.y);
	}

	then = Date.now();
	return setInterval(draw, 10);

    }

    function setHeroImage(image) {
	heroImage.src = image;
	ctx.drawImage(heroImage, player.x, player.y);
    }

    function beamPlayer() {
	player.x = Math.floor(Math.random() * canvas.width - heroImage.width);
	player.y = Math.floor(Math.random() * canvas.height - heroImage.height);
    }

    function jump() {
	jumping = true;

	if (jumping) {
	    movingObjects.push(rectangle(player.x, player.y, 30, 30));
	}

	jumping = false;

    }

    // var canvas2Added = false;
    // function rotatePlayer() {
    // 	// for (var i = 0; i < 360; i++) {
    // 	//     clear();
    // 	//     ctx.save();
    // 	//     ctx.translate(player.x, player.y);
    // 	//     // ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    // 	//     ctx.translate(player.x, player.y);
    // 	//     ctx.rotate(i);
    // 	//     setHeroImage(heroImageSteady);
    // 	//     ctx.restore();
    // 	// }

    // 	// clear();
    // 	// ctx.save();
    // 	// ctx.translate(ctx.width / 2, ctx.height / 2);
    // 	// ctx.translate(player.width / 2, player.height / 2);
    // 	// ctx.rotate(90 * Math.PI / 180);
    // 	// setHeroImage(heroImageSteady);
    // 	// ctx.restore();

    // 	if (!canvas2Added) {
    // 	    var mainContent = document.getElementById('mainContent');
    // 	    var canvas2 = mainContent.appendChild(document.createElement('canvas'));
    // 	    var ctx2 = canvas2.getContext('2d');

    // 	    ctx2.drawImage(heroImage, player.x + 10, player.y + 10);

    // 	    ctx2.save();
    // 	    // ctx2.rotate(90 * Math.PI / 180);
    // 	    ctx2.translate(ctx.width / 2, ctx.height / 2);
    // 	    ctx2.rotate(90 * Math.PI / 180);
    // 	    setHeroImage(heroImageSteady);
    // 	    ctx2.restore();

    // 	    canvas2Added = true;
    // 	}
    // }

    function addCanvas() {
	var mainContent = document.getElementById('mainContent');
	var canvas2 = mainContent.appendChild(document.createElement('canvas'));

	canvas2.position = 'absolute';
	canvas2.x = canvas.x;
	canvas2.y = canvas.y;
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;

	var ctx2 = canvas2.getContext('2d');
	// ctx2.fillStyle = '#FF0000';
	// ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
	ctx2.fillStyle = '#00FF00';
	ctx2.fillRect(50, 50, 100, 80);
	ctx2.rotate(90 * Math.PI / 180);
    }

    var counter = 0;
    function draw() {
	clear();

	ctx.fillStyle = 'rgba(0, 150, 250, 0.5)';
	rectangle(50, 50, 50, 50);

	ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	// rectangle(player.x, player.y, player.width, player.height);

	if (!heroIsMoving) {
	    setHeroImage(heroImageSteady);
	}

	for (object in movingObjects) {
	    console.log(object);
	}

	var now = Date.now();
	var delta = now - then;
	update(delta / 1000)
	then = now;
    }

    function main() {
	init();
	draw();
    }

    main();

};
