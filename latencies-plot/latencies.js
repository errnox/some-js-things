window.onload = function() {
    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');

    // var latencies = [
    // 	["L1 cache reference", 0.5],
    // 	["Branch mispredict", 5],
    // 	["L2 cache reference", 7],
    // 	["Mutex lock/unlock", 25],
    // 	["Main memory reference", 100],
    // 	["Compress 1K bytes with Zippy", 3000],
    // 	["Send 2K bytes over 1 Gbps network", 20000],
    // 	["Read 1 MB sequentially from memory", 250000],
    // 	["Round trip within same datacenter", 500000],
    // 	["Disk seek", 10000000],
    // 	["Read 1 MB sequentially from disk", 20000000],
    // 	["Send packet CA->Netherlands->CA", 150000000]
    // ];

    // var latencies = [
    // 	["Send 2K bytes over 1 Gbps network", 20000],
    // 	["L2 cache reference", 7],
    // 	["Main memory reference", 100],
    // 	["Read 1 MB sequentially from memory", 250000],
    // 	["L1 cache reference", 0.5],
    // 	["Round trip within same datacenter", 500000],
    // 	["Branch mispredict", 5],
    // 	["Mutex lock/unlock", 25],
    // 	["Read 1 MB sequentially from disk", 20000000],
    // 	["Disk seek", 10000000],
    // 	["Send packet CA->Netherlands->CA", 150000000],
    // 	["Compress 1K bytes with Zippy", 3000],
    // ];

    var latencies = [
	["Disk seek", 10000000],
	["Send 2K bytes over 1 Gbps network", 5040033],
	["L2 cache reference", 7],
	["Round trip within same datacenter", 500000],
	["L2 cache reference", 7],
	["Disk seek", 2200000],
	["Compress 1K bytes with Zippy", 3000],
	["Compress 1K bytes with Zippy", 3000],
	["Main memory reference", 100],
	["Disk seek", 293000],
	["Main memory reference", 100],
	["Mutex lock/unlock", 25],
	["Branch mispredict", 5],
	["Send 2K bytes over 1 Gbps network", 20000],
	["Read 1 MB sequentially from memory", 250000],
	["Main memory reference", 100],
	["L1 cache reference", 0.5],
	["Read 1 MB sequentially from disk", 20000000],
	["L2 cache reference", 7],
	["Read 1 MB sequentially from disk", 200000],
	["Read 1 MB sequentially from disk", 2500000],
	["Send packet CA->Netherlands->CA", 100.23432],
	["Send packet CA->Netherlands->CA", 25000],
	["Compress 1K bytes with Zippy", 3000],
	["Mutex lock/unlock", 25],
	["Main memory reference", 100],
	["Mutex lock/unlock", 25],
	["Read 1 MB sequentially from memory", 250000],
	["Send 2K bytes over 1 Gbps network", 20000],
	["Branch mispredict", 293395],
	["Branch mispredict", 50002],
	["L1 cache reference", 1500.5],
	["Round trip within same datacenter", 500000],
	["Send packet CA->Netherlands->CA", 155550],
	["Round trip within same datacenter", 500000],
	["Read 1 MB sequentially from memory", 250000],
	["L1 cache reference", 0.5],
	["L1 cache reference", 255555],
	["L1 cache reference", 2384845],
	["L1 cache reference", 383835],
	["L1 cache reference", 8338385],
	["L1 cache reference", 3848472],
	["L1 cache reference", 28928285],
	["L1 cache reference", 28282825],
	["L1 cache reference", 2838425],
	["L1 cache reference", 28282285],
	["L1 cache reference", 998888.5],
	["L1 cache reference", 18181815],
	["L1 cache reference", 28383.85],
	["L1 cache reference", 3838.5],
    ];

    var minLatency;
    var maxLatency;

    function getMaxLatency() {
    	var max = 0;
    	var value;

    	for (var i = 0; i < latencies.length; i++) {
    	    value = latencies[i][1];
    	    if (value > max) {
    		maxLatency = value;
    	    }
    	}
    }

    function minMaxLatencies() {
    	minLatency = latencies[0][1];
    	maxLatency = latencies[0][1];
    	var value;

    	for (var i = 0; i < latencies.length; i++) {
    	    value = latencies[i][1];

    	    if (value < minLatency) {
    		minLatency = value;
    	    }

    	    if (value > maxLatency) {
    		maxLatency = value;
    	    }
    	}
    }

    function scaleValue(x) {
    	var margin = 50;
    	var max = Math.sqrt(canvas.width * canvas.width,
    		       canvas.height * canvas.height) - margin;
    	var min = 0;

	var scaleFactor = (max - min) / (maxLatency - minLatency);
	var partialResult = max - maxLatency * scaleFactor;
	var returnValue = scaleFactor * x + partialResult;

    	return returnValue;
    }

    function scale() {
    	minMaxLatencies();
	var lat;

    	for (var i = 0; i < latencies.length; i++) {
	    latencies[i][1] = scaleValue(latencies[i][1]);
    	}
    }

    function sort(list) {
	for (var i = 0, j, tmp; i < list.length; ++i) {
	    tmp = list[i];
	    for (j = i - 1; j >= 0 && list[j][1] > tmp[1]; --j)
		list[j + 1] = list[j];
	    list[j + 1] = tmp;
	}
    }

    function debug() {
	for (var i = 0; i < latencies.length; i++) {
	    console.log(latencies[i][1]);
	}
    }

    function sum() {
	var sum = 0;

	for (var i = 0; i < latencies.length; i++) {
	    sum += latencies[i][1];
	}

	return sum;
    }

    function visualize() {
	canvas.width = sum();
	canvas.height = 500;

	var radius = 0;
	// var x = canvas.width / 2;
	// var y = canvas.height / 2;
	var x = 0;
	var y = canvas.height / 2;
	var nextRadius = 0;
	// Circles which are too small to represent (to small to see)
	// should have a minimal radius so that they are still visible.
	// At the same time they should have a specific color or other
	// visual marker which indicates that their width is not bound
	// to a real number in the data.
	var minimalRadius = 5;

	for (var i = 0; i < latencies.length; i++) {

	    if (latencies[i + 1]){
	    	nextRadius = latencies[i + 1][1] / 2;
	    }

	    x += radius + nextRadius;
	    radius = latencies[i][1] / 2;
	    y = canvas.height - radius / 2;
	    // y = canvas.height / 2;

	    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
	    ctx.strokeStyle = 'rgba(0, 155, 0, 1.0)';

	    // // DEBUG
	    // ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
	    // ctx.fillText(i, x, y);
	    // ctx.fillText('+', x, y + 10);
	    // ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';

	    // DEBUG
	    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
	    ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';
	    ctx.fillText(latencies[i][0], x, y - radius * 4);
	    ctx.beginPath();
	    ctx.moveTo(x - radius / 2, y - radius / 2);
	    ctx.lineTo(x, y - radius * 4);
	    ctx.stroke();
	    ctx.closePath();
	    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';

	    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
	    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
	    ctx.beginPath();
	    ctx.moveTo(x + radius - nextRadius - 5, 0);
	    ctx.lineTo(x + radius - nextRadius - 5, canvas.height);
	    ctx.stroke();
	    ctx.closePath();

	    ctx.strokeStyle = 'rgba(0, 155, 0, 1.0)';

	    if (radius <= 5) {
		ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
		ctx.strokeStyle = 'rgba(0, 0, 155, 1.0)';
		x += minimalRadius;
		radius = minimalRadius;
	    }

	    ctx.beginPath();
	    ctx.arc(x - nextRadius - 5, y, radius, 0, Math.PI * 10, false);
	    ctx.fill();
	    ctx.stroke();
	    ctx.closePath();
	}



    }

    scale();
    sort(latencies);
    latencies.reverse();
    console.log(latencies);
    visualize();
    // debug();
};
