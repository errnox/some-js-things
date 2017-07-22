window.onload = function() {
  var canvas;
  var ctx;
  var keysDown = {};
  var now;
  var delta;
  var then;

  var map;
  var mapGrid;
  var mapScroll;

  var loadingAnimation;
  var showLoadingAnimation;

  var player = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    speed: 265,
    color: 'rgba(0, 0, 0, 1)',
    oldX: 0,
    oldY: 0,
  };

  var keys = {
    arrows: {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    },
    spacebar: 32,
    l: 76,
  };

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function buildMap() {
    map = {
      width: canvas.width * 3,
      height: canvas.height * 3,
      tilesX: 50,
      tilesY: 50,
    }

    mapGrid = new Array(map.tilesY);

    for (var i = 0; i < mapGrid.length; i++) {
      mapGrid[i] = new Array(map.tilesX);
    }

    var cellCounter = 0;
    for (var i = 0; i < mapGrid.length; i++) {
      for (var j = 0; j < map.tilesX; j++) {
        cell = new Object();
        if (cellCounter % 2 == 1 && j % 2 == 1) {
          cell.color = 'rgba(0, 0, 255, 0.5)';
          cell.description = '';
        } else {
          cell.color = 'rgba(255, 0, 0, 0.5)';
          cell.description = '';
        }

        if (Math.floor(Math.random() * 50) == 1) {
          cell.description = '';
          cell.cloudy = true;
        }

        mapGrid[i][j] = cell;
      }
      cellCounter++;
    }

    mapGrid.x = 0;
    mapGrid.y = 0;

    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    mapScroll = canvas.width;
  }

  function init() {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    clear();

    buildMap();

    addEventListener('keydown', function(e) {
      keysDown[e.keyCode] = true;
    }, false);

    addEventListener('keyup', function(e) {
      delete keysDown[e.keyCode];
    }, false);

    loadingAnimation = new LoadingAnimation()
    showLoadingAnimation = false;

    then = Date.now();
    return setInterval(draw, 10);
  }

  var update = function(modifier) {
    // // DEBUG: Get keycode
    // var keyList = Object.keys(keysDown);
    // if (keyList) {
    //     console.log(keyList);
    // }

    if (keys.arrows.left in keysDown) {
      player.x -= player.speed * modifier;
    }

    if (keys.arrows.right in keysDown) {
      player.x += player.speed * modifier;
    }

    if (keys.arrows.up in keysDown) {
      player.y -= player.speed * modifier;
    }

    if (keys.arrows.down in keysDown) {
      player.y += player.speed * modifier;
    }

    if (keys.l in keysDown) {
      // setTimeout(loading, 0.1);
      loading(3000);
    }
  }

  function warn() {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }



  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  // TODO:
  // 1. Better abstraction for animation of already existing objects
  //    (like player) including freezing.
  // 2. Time scaling
  function loading(milliseconds) {
    player.oldX = player.x;
    player.oldY = player.y;
    showLoadingAnimation = true;
    setTimeout(function() {
      showLoadingAnimation = false;
    }, milliseconds)
  }

  function LoadingAnimation() {
    this.x;
    this.y;
    this.width;
    this.height;
    this.gap;
    this.step = 0;

    this.update = function() {
      //     if (showLoadingAnimation == true) {
      //      if (player.x < player.oldX + 10 && this.step == 0) {
      //          player.x += 1;
      //      } else if (player.y < player.oldY + 10 && this.step == 1){
      //          player.y += 1;
      //      } else if (player.x > player.oldX - 10 && this.step == 2) {
      //          player.x -= 1;
      //      } else if (player.y < player.oldY + 10 && this.step == 3) {
      //          player.y -= 1;
      //      }

      //      if (player.x == player.oldX + 10) {
      //          player.oldX = player.x;
      //          this.step = 1;
      //      }

      //      if (player.y == player.oldY + 10) {
      //          this.step = 2;
      //      }

      //      if (player.x == player.oldX - 10) {
      //          this.step = 3;
      //      }

      //      if (player.y == player.oldY + 10) {
      //          if (this.step == 1) {
      //              this.step = 2;
      //          } else {
      //              this.step = 3;
      //              player.oldY = player.y;
      //          }
      //      }

      //     }

      // TODO: Maybe compare time/now to millisecods
      var time = new Date().getTime() * 100;
      if (showLoadingAnimation == true) {
        // player.x = Math.sin(time) * 96 + 228;
        // player.y = Math.cos(time * 0.9) * 96 + 228;

        player.x = Math.sin(time) * 10 + player.oldX;
        player.y = Math.cos(time * 0.9) * 10 + player.y;
      }
    }
  }

  function drawGrid() {
    gridCell = {
      width: map.width / map.tilesX,
      height: map.height / map.tilesY,
    };
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = .1;

    ctx.save();
    ctx.translate(-mapGrid.x, -mapGrid.y);
    var tileCounter = 0
    var linearGradient;
    for (var i = 0; i < mapGrid.length; i++) {
      tileCounter++;
      for (var j = 0; j < mapGrid[i].length; j++) {
        // Fill the current cell with appropriate color
        ctx.strokeRect(i * gridCell.width, j * gridCell.height, gridCell.width, gridCell.height);
        ctx.fillStyle = mapGrid[i][j].color;
        ctx.fillRect(i * gridCell.width, j * gridCell.height, gridCell.width, gridCell.height);

        // Draw cloudy cells
        if (mapGrid[i][j].cloudy == true) {
          ctx.fillStyle = 'rgba(0, 55, 0, 0.5)'
          ctx.fillRect(i * gridCell.width, j * gridCell.height, gridCell.width, gridCell.height);
          ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'
          ctx.fillRect(i * gridCell.width + (gridCell.width / 2 / 2),
                       j * gridCell.height + (gridCell.height / 2 / 2),
                       gridCell.width / 2,
                       gridCell.height / 2);
        }

        // Highlight current cell
        if (player.x + mapGrid.x >= i * gridCell.width && player.x + mapGrid.x < i * gridCell.width + gridCell.width && player.y + mapGrid.y >= j * gridCell.height && player.y + mapGrid.y < j * gridCell.height + gridCell.height) {

          if (mapGrid[i][j].cloudy == true) {
            ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
            player.color = 'rgba(255, 255, 255, 1.0)';
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            player.color = 'rgba(0, 0, 0, 1.0)';
          }
          ctx.fillRect(i * gridCell.width, j * gridCell.height, gridCell.width, gridCell.height);
        }

        // // DEBUG
        // ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        // ctx.fillText(tileCounter, i * gridCell.width + gridCell.width / 2,
        //           j * gridCell.height - gridCell.height / 2);
      }
    }
    ctx.restore();
  }

  function detectCollisions() {
    var width;
    if (player.x + player.width >= canvas.width) {
      // player.x = canvas.width - player.width / 2;
      warn();
      width = mapGrid.length * gridCell.width - canvas.width;
      if (mapGrid.x < width) {
        mapGrid.x += mapScroll;
        player.x = player.width * 2;
        console.log(mapGrid.x + " - " + width);
      } else {
        player.x = canvas.width - player.width * 2;
      }
    }

    if (player.x <= 0) {
      // player.x = 0 + player.width / 2;
      warn();
      console.log(mapGrid.x); // TODO
      if (mapGrid.x <= 0) {
        mapGrid.x -= mapScroll;
        player.x = canvas.width - player.width * 2;
      } // else {
      //  player.x = player.width * 2;
      // }
    }

    if (player.y <= 0) {
      // player.y = 0 + player.width / 2;
      warn();
      mapGrid.y -= mapScroll;
      player.y = canvas.height - player.height * 2;
    }

    if (player.y + player.height >= canvas.height) {
      // player.y = canvas.height - player.height / 2;
      warn();
      mapGrid.y += mapScroll;
      player.y = player.height * 2;
    }
  }

  function draw() {
    clear();

    drawGrid();

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(player.x, player.y, 1, 1);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

    loadingAnimation.update();

    detectCollisions();

    now = Date.now()
    delta = now - then;
    update(delta / 1000);
    then = now;
    // console.log(delta);
  }

  init();
  draw();
}
