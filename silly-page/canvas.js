window.onload = function() {
    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');


    ctx.clearRect(0, 0, ctx.width, ctx.height);

    // ctx.fillStyle = '#00AF00';
    // ctx.fillRect(30, 40, 100, 150);
    
    // ctx.lineWidth = 5;
    // ctx.beginPath();
    // ctx.moveTo(100, 0);
    // ctx.arc(75, 75, 35, 0, Math.PI, false);
    // ctx.lineTo(300, 300);
    // ctx.stroke();

    function pieChart(percentage, color, x, y) {
	ctx.lineWidth = 80;
	ctx.strokeStyle = color || '#000000';
	var x = x || ctx.width / 2;
	var y = x || ctx.height / 2;

	ctx.beginPath();
	ctx.arc(x, y, 100, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + percentage), false);
	ctx.stroke();
    }

    function clock(color, x, y) {
	var color = color || '#000000';
	var x = x || 100;
	var y = y || 100;
	var time = new Date();
	ctx.clearRect(0, 0, 500, 500);
	pieChart(time.getSeconds() * 10, color, x, y);
	var fontSize = 30
	ctx.font = fontSize + "pt Arial";
	var text = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
	var textMetrics = ctx.measureText(text);
	ctx.fillText(text, x - textMetrics.width / 2, y - fontSize);
    }

    function drawClock() {
	clock('rgba(255, 0, 0, 0.5)', 200, 300);

	pieChart(90, 'rgba(255, 0, 0, 0.5)', 300, 100);
	pieChart(180, 'rgba(0, 255, 0, 0.5)', 300, 100);
	pieChart(270, 'rgba(255, 255, 0, 0.5)', 300, 100);
	pieChart(350, 'rgba(0, 0, 255, 0.5)', 300, 100);
    }

    setInterval(drawClock, 100);
}

