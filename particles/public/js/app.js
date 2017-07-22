WIDTH = 500;
HEIGHT = 300;

var App = {};

App.mouseX = WIDTH / 2;
App.mouseY = HEIGHT / 2;


// ------------------------------------------------------------------------
// Vector

App.Vector = function(options) {

  var cls = this;

  cls.init = (function(options) {
    cls.ctx = options.context;
    cls.magnitude = options.magnitude || 20;
    cls.x1 = options.x1;
    cls.y1 = options.y1;
    cls.x2 = options.x2 || cls.x1 + cls.magnitude;
    cls.y2 = options.y2 || cls.x1 + cls.magnitude;
    cls.color = options.color || 'rgba(255, 0, 0, 0.5)';
  })(options);

  cls.draw = function() {
    cls.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    cls.ctx.beginPath();
    cls.ctx.arc(cls.x1, cls.y1, 3, 0, 360);
    cls.ctx.fill();

    cls.ctx.beginPath();
    cls.ctx.strokeStyle = cls.color;
    cls.ctx.moveTo(cls.x1, cls.y1);
    cls.ctx.lineTo(cls.x2, cls.y2);
    cls.ctx.stroke();

    var dx = cls.x2 - cls.x1;
    var dy = cls.y2 - cls.y1;
    var angle = Math.atan2(dy, dx);
    cls.ctx.save();
    cls.ctx.translate(cls.x2, cls.y2);
    cls.ctx.rotate(angle);
    cls.ctx.lineTo(-6, -6);
    cls.ctx.moveTo(0, 0);
    cls.ctx.lineTo(-6, 6);
    cls.ctx.stroke();
    cls.ctx.restore();
  };

  cls.autoOrient = function() {
    var dx = App.mouseX - cls.x1;
    var dy = App.mouseY - cls.y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    dx /= distance;
    dy /= distance;
    cls.x2 = cls.x1 + dx * cls.magnitude;
    cls.y2 = cls.y1 + dy * cls.magnitude;
  };

};


// ------------------------------------------------------------------------
// Draggable Rectangle

App.DraggableRectangle = function(options) {

  var cls = this;

  cls.init = (function(options) {
    cls.ctx = options.context;
    cls.x = options.x;
    cls.y = options.y;
    cls.width = options.width || 50;
    cls.height = options.height || 50;
    cls.color = options.color || 'rgba(20, 210, 20, 0.5)';
    cls.normalColor = cls.color;
    cls.highlightColor = options.highlightColor ||
      'rgba(210, 20, 20, 0.5)';
  })(options);

  cls.draw = function() {
    cls.ctx.beginPath();
    cls.ctx.fillStyle = cls.color;
    cls.ctx.rect(cls.x, cls.y, cls.width, cls.height);
    cls.ctx.fill();

    var dx = App.mouseX - cls.x - cls.width / 2;
    var dy = App.mouseY - cls.y - cls.height / 2;
    var distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= 100) {
      cls.ctx.strokeStyle = 'rgba(20, 210, 20, 0.5)';
      cls.ctx.beginPath();
      cls.ctx.moveTo(cls.x + cls.width / 2, cls.y + cls.width / 2);
      cls.ctx.lineTo(App.mouseX, App.mouseY);
      cls.ctx.stroke();

      cls.ctx.strokeStyle = 'rgba(20, 20, 210, 0.2)';

      // Inner ring
      cls.ctx.beginPath();
      cls.ctx.arc(cls.x + cls.width / 2, cls.y + cls.width / 2, 5, 0,
                  Math.PI * 2);
      cls.ctx.stroke();

      // Outer ring
      cls.ctx.beginPath();
      cls.ctx.arc(cls.x + cls.width / 2, cls.y + cls.width / 2, 50, 0,
                  Math.PI * distance / 20);
      cls.ctx.stroke();

      // Text
      cls.ctx.beginPath();
      cls.ctx.font = '10px Monospace';
      cls.ctx.fillStyle = 'rgba(20, 20, 20, 0.5)';
      var text = cls.x + ' | ' + cls.y;
      var textWidth = cls.ctx.measureText(text).width;
      cls.ctx.fillText(text, cls.x + cls.width / 2 - textWidth / 2,
                       cls.y - cls.height / 2);
    }
  };

  cls.highlight = function() {
    cls.color = cls.highlightColor;
  };

  cls.unhighlight = function() {
    cls.color = cls.normalColor;
  };

};


// ------------------------------------------------------------------------
// Collision Marker

App.CollisionMarker = function(options) {

  var cls = this;

  cls.init = (function(options) {
    cls.ctx = options.context;
    cls.x = options.x;
    cls.y = options.y;
    cls.width = cls.height = 2;
  })(options);

  cls.draw = function() {
    cls.ctx.beginPath();
    cls.ctx.fillStyle = 'rgba(150, 30, 30, 0.4)';
    cls.ctx.rect(cls.x - cls.width / 2, cls.y - cls.height / 2,
                 cls.width, cls.height);
    cls.ctx.fill();
  };

}


// ------------------------------------------------------------------------
// Particle

App.Particle = function(options) {

  var cls = this;

  cls.init = (function(options) {
    cls.ctx = options.context;
    cls.x = options.x || Math.random() * WIDTH;
    cls.y = options.y || Math.random() * HEIGHT;
    cls.oldX = cls.x;
    cls.oldY = cls.y;
    cls.velocityX = cls.x - cls.oldX;
    cls.velocityY = cls.y - cls.oldY;
    cls.width = options.width || 10;
    cls.height = options.height || cls.width;
  })(options);

  cls.draw = function() {
    // Draw the particle body.
    cls.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    cls.ctx.beginPath();
    cls.ctx.rect(cls.x - cls.width / 2, cls.y - cls.height / 2,
                 cls.width, cls.height);
    cls.ctx.fill();

    // Draw the particle trail.
    cls.ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
    cls.ctx.lineWidth = 2;
    cls.ctx.beginPath();
    cls.ctx.moveTo(cls.oldX, cls.oldY);
    cls.ctx.lineTo(cls.x, cls.y);
    cls.ctx.stroke();
  };

  cls.update = function() {
    cls.velocityX = cls.x - cls.oldX;
    cls.velocityY = cls.y - cls.oldY;
    cls.oldX = cls.x;
    cls.oldY = cls.y;
    cls.x += cls.velocityX;
    cls.y += cls.velocityY;
    cls.swirl();

    // Make the particle bounce off of the display boundaries.
    if (cls.x <= 0 + cls.width / 2) {
      cls.x += 1;
    }
    if (cls.x >= WIDTH - cls.width / 2) {
      cls.x -= 1;
    }
    if (cls.y <= 0 + cls.height / 2) {
      cls.y += 1;
    }
    if (cls.y >= HEIGHT - cls.height / 2) {
      cls.y -= 1;
    }
  };

  cls.swirl = function() {
    var dx = WIDTH / 2 - cls.x;
    var dy = HEIGHT / 2 - cls.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if ((Math.floor(Math.random() * (20 - 1)) + 1) > 10) {
      cls.x += dx / distance;
      cls.y += dy / distance;
    }
    // Excite the particle again if it becomes too lazy.
    if (Math.abs(distance) <= 5) {
      cls.x += Math.floor(Math.random() * (3 + 3) - 3)
      cls.y += Math.floor(Math.random() * (3 + 3) - 3)
    }
  };
};


// ------------------------------------------------------------------------
// App

App.tick = function() {
  var cls = App;
  window.requestAnimationFrame(cls.tick);
  if (!cls.doPause) {
    cls.ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw the collision markers.
    for (var i = 0; i < cls.collisionMarkers.length; i++) {
      cls.collisionMarkers[i].draw();
    }

    // Draw the particles.
    for (var i = 0; i < cls.particles.length; i++) {
      cls.particles[i].update();
      cls.particles[i].draw();
    }

    // Manipulate the particle behavior.
    var distance = null;
    var dx = null;
    var dy = null;
    for (var i = 0; i < cls.particles.length; i++) {
      for (var j = 0; j < cls.particles.length; j++) {
        if (i != j) {
          dx = cls.particles[i].x - cls.particles[j].x;
          dy = cls.particles[i].y - cls.particles[j].y;
          distance = Math.sqrt(dx * dx + dy * dy);
          // Add new collision markers.
          if (Math.abs(distance) < 10) {
            cls.collisionMarkers.push(new App.CollisionMarker(
              {x: cls.particles[i].x + dx, y: cls.particles[i].y + dy,
               context: cls.ctx}));
          }
          // Remove old collision markers.
          if (cls.collisionMarkers.length > 300) {
            cls.collisionMarkers.shift();
          }
        }
      }
    }

    // Draw the draggable rectangles.
    for (var i = 0; i < cls.draggableRectangles.length; i++) {
      cls.draggableRectangles[i].draw();
    }

    // Draw the auto-orienting vectors.
    for (var i = 0; i < cls.vectors.length; i++) {
      cls.vectors[i].autoOrient();
      cls.vectors[i].draw();
    }

    cls.doPause = false;
  }
};

App.run = function() {
  var cls = App;
  cls.display = document.getElementById('display');
  cls.display.width = WIDTH;
  cls.display.height = HEIGHT;
  cls.ctx = display.getContext('2d');
  cls.dragIdx = 0;
  cls.dragDX = 0;
  cls.dragDY = 0;

  // Add the particles.
  cls.particles = [];
  for (var i = 0; i < 3; i++) {
    cls.particles.push(new App.Particle({context: cls.ctx}));
  }

  // Collision markers
  cls.collisionMarkers = [];

  // Add some draggable rectangles.
  cls.draggableRectangles = [];
  for (var i = 0; i < 5; i++) {
    cls.draggableRectangles.push(new App.DraggableRectangle({
      context: cls.ctx,
      x: i * 30,
      y: i * 30,
      width: 30, height: 30}));
  }

  window.requestAnimationFrame(cls.tick);

  window.addEventListener('keypress', function(e) {
    // Pause the game loop.
    if (e.charCode == 112) { // "p"
      cls.doPause = !cls.doPause;
    }
  });

  cls.getMousePositionFromEvent = function(e) {
    var rect = cls.display.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    return {x: posX, y: posY};
  };

  // Make draggable rectangles draggable.

  cls.startMovingRectangleListener = function(e) {
    var canAddParticle = true;
    if (e.buttons == 1) { // Left mouse button

      var mouseXY = cls.getMousePositionFromEvent(e);
      var mouseX = mouseXY.x;
      var mouseY = mouseXY.y;

      try {
        // Handle dragging of draggable elements.
        for (var i = cls.draggableRectangles.length - 1; i >= 0; i--) {
          if (mouseX > cls.draggableRectangles[i].x &&
              mouseX < cls.draggableRectangles[i].x +
              cls.draggableRectangles[i].width &&
              mouseY > cls.draggableRectangles[i].y &&
              mouseY < cls.draggableRectangles[i].y +
              cls.draggableRectangles[i].height) {
            canAddParticle = false;
            cls.dragIdx = i;
            cls.dragDX = mouseX - cls.draggableRectangles[i].x;
            cls.dragDY = mouseY - cls.draggableRectangles[i].y;
            cls.display.addEventListener(
              'mousemove', cls.moveRectangleListener);
            cls.display.addEventListener(
              'mouseup', cls.stopRectangleListener);
          }
        }
      } catch (e) {
        // Ignore.
      }

      // Add another particle (but only if no draggable element is being
      // dragged right now).
      if (canAddParticle) {
        cls.particles.push(new App.Particle(
          {context: cls.ctx, x: mouseX, y: mouseY}));
      }

    } else if (e.buttons == 4) { // Right mouse button
      // Remove a particle.
      cls.particles.shift();
    }
  };

  cls.moveRectangleListener = function(e) {
    var mouseXY = cls.getMousePositionFromEvent(e);
    var mouseX = mouseXY.x;
    var mouseY = mouseXY.y;
    cls.draggableRectangles[cls.dragIdx].x =
      mouseX - cls.dragDX;
    cls.draggableRectangles[cls.dragIdx].y =
      mouseY - cls.dragDY;
  };

  cls.stopRectangleListener = function(e) {
    cls.dragIdx = 0;
    cls.display.removeEventListener(
      'mousemove', cls.moveRectangleListener);
    cls.display.removeEventListener(
      'mouseup', cls.stopRectangleListener);
  };

  cls.display.addEventListener(
    'mousedown', cls.startMovingRectangleListener);

  cls.mouseMoveListener = function(e) {
    var mouseXY = cls.getMousePositionFromEvent(e);
    var mouseX = mouseXY.x;
    var mouseY = mouseXY.y;

    App.mouseX = mouseXY.x;
    App.mouseY = mouseXY.y;

    // Highlight draggable rectangles on hover.
    for (var i = cls.draggableRectangles.length - 1; i >= 0; i--) {
      if (mouseX > cls.draggableRectangles[i].x &&
          mouseX < cls.draggableRectangles[i].x +
          cls.draggableRectangles[i].width &&
          mouseY > cls.draggableRectangles[i].y &&
          mouseY < cls.draggableRectangles[i].y +
          cls.draggableRectangles[i].height) {
        cls.draggableRectangles[i].highlight();
      } else {
        cls.draggableRectangles[i].unhighlight();
      }
    }
  };

  cls.display.addEventListener('mousemove', cls.mouseMoveListener);

  // Vectors
  cls.vectors = [];
  var vectorFieldDistance = 40;
  // cls.vectors.push(new App.Vector({
  //   x1: 6 * vectorFieldDistance,
  //   y1: 6 * vectorFieldDistance,
  //   x2: 5 * vectorFieldDistance + 80,
  //   y2: 5 * vectorFieldDistance + 80,
  //   magnitude: 20,
  //   context: cls.ctx
  // }));

  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      cls.vectors.push(new App.Vector({
        x1: x * vectorFieldDistance,
        y1: y * vectorFieldDistance,
        x2: x * vectorFieldDistance + 80,
        y2: y * vectorFieldDistance + 80,
        magnitude: 20,
        context: cls.ctx
      }));
    }
  }

};

App.run();
