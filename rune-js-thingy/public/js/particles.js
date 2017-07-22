app.particles = function() {

  var cls = this;

  cls.init = function() {
    cls.doPause = false;
    cls.particles = [];
    cls.particleWidth = cls.particleHeight = 5;
    cls.damping = 0.99;
    cls.numParticles = 5;

    // Moving collision indicator
    //
    // cls.collisionIndicator =
    //   new Rune.Circle(app.width / 2, app.height / 2, 10)
    //   .stroke(false).fill(255, 0, 0, 0.3);
    // r.stage.add(cls.collisionIndicator);

    cls.collisionIndicatorRadius = 3;
    cls.collisionIndicators = [];
  };

  cls.newParticle = function(x, y) {
    return new Rune.Rectangle(
      x, y,
      cls.particleWidth,
      cls.particleHeight)
      .stroke(false)
      .fill(100, 100, 100);
  };

  cls.newCollisionIndicator = function(x, y) {
    return new Rune.Circle(x, y, cls.collisionIndicatorRadius)
      .stroke(false).fill(255, 0, 0, 0.15);
  };

  cls.run = function() {
    var self = this;
    var rect = null;
    for (var i = 0; i < cls.numParticles; i++) {
      rect = cls.newParticle(Rune.random(0, app.width),
                             Rune.random(0, app.height));
      rect.oldX = rect.vars.x;
      rect.oldY = rect.vars.y;
      cls.particles[i] = rect;
    }
    for (var i = 0; i < cls.particles.length; i++) {
      r.stage.add(cls.particles[i]);
    }
  };

  cls.updatePosition = function() {
    var p = null;
    var velocityX = null;
    var velocityY = null;
    var doScale = null;
    var bounceOffSpeed = 10;
    var dx = null;
    var dy = null;
    var distance = null;
    for (var i = 0; i < cls.particles.length; i++) {
      p = cls.particles[i];

      p.move(Rune.random(-1, 1), Rune.random(-1, 1), true);

      velocityX = (p.vars.x - p.oldX) * cls.damping;
      velocityY = (p.vars.y - p.oldY) * cls.damping;
      p.oldX = p.vars.x;
      p.oldY = p.vars.y;
      p.move(velocityX, velocityY, true);

      // Keep the particle withing the stage boundaries.
      if (p.vars.x <= 0) {
        p.move(bounceOffSpeed, 0, true);
      }
      if (p.vars.x >= app.width - cls.particleWidth) {
        p.move(-bounceOffSpeed, 0, true);
      }
      if (p.vars.y <= 0) {
        p.move(0, bounceOffSpeed, true);
      }
      if (p.vars.y >= app.height - cls.particleHeight) {
        p.move(0, -bounceOffSpeed, true);
      }

      // Nudge the particle down.
      //
      // p.move(0, Rune.random(0, 1), true);
      //
      // p.move(0, Rune.random(0, 1.3), true);

      // Scale the particle randomly.
      //
      // doScale = Rune.random(0, 30);
      // if (doScale < 10) {
      //        p.scale(1.1);
      // } else if (doScale > 20) {
      //        if (p.vars.width > cls.particleWidth &&
      //            p.vars.height > cls.particleHeight) {
      //          p.scale(0.9);
      //        }
      // }

      // Attract the particle to the center.
      if (Rune.random(0, 10) > 5) {
        dx = app.width / 2 - p.vars.x;
        dy = app.height / 2 - p.vars.y;
        distance = Math.sqrt(dx * dx + dy * dy);
        p.move(dx / distance, dy / distance, true);
      }
    }
  };

  cls.updateCollisionIndicator = function() {
    var distance = dx = dy = p1 = p2 = null;
    var indicator = null;
    for (var i = 0; i < cls.particles.length; i++) {
      p1 = cls.particles[i];
      for (var j = 0; j < cls.particles.length; j++) {
        p2 = cls.particles[j];
        dx = p1.vars.x - p2.vars.x;
        dy = p1.vars.y - p2.vars.y;
        distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 10 && i != j) {
          // Move the moving collision indicator to the latest collision
          // point.
          //
          // cls.collisionIndicator.move(cls.particles[i].vars.x,
          //                 cls.particles[i].vars.y);

          // Add another permanent collision indicator.
          //
          // indicator = cls.newCollisionIndicator(
          //   cls.particles[i].vars.x - cls.collisionIndicatorRadius / 2,
          //   cls.particles[i].vars.y - cls.collisionIndicatorRadius / 2);
          // cls.collisionIndicators.push(indicator);
          // r.stage.add(indicator);
        }
      }
    }
  };

  cls.update = function() {
    cls.updatePosition();
    cls.updateCollisionIndicator();
  };

  cls.draw = function() {
    cls.init();
    cls.run();
    r.draw();
    r.on('draw', function() {
      if (!cls.doPause) {
        cls.update();
      }
    });

    var rect = null;
    r.on('mousedown', function(e) {
      rect = cls.newParticle(e.x - cls.particleWidth / 2,
                             e.y - cls.particleHeight / 2);
      rect.oldX = rect.vars.x;
      rect.oldY = rect.vars.y;
      cls.particles.push(rect);
      r.stage.add(rect);
    });

    r.play();
    // DEBUG: Do puase.
    //
    // r.pause();

    document.addEventListener('keypress', function(e) {
      if (e.charCode == 112) { // "p"
        cls.doPause = !cls.doPause;
      }
    });
  };

};
