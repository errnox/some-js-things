app.randomPath = function() {
  var cls = this;

  cls.drawRandomPath = function(startX, startY, segments, pathStep) {
    var pathX = 0;
    var pathY = 0;
    var newPathX = 0;
    var newPathY = 0;
    var randomNumber = 0;
    var pathGroup = r.group(startX, startY);
    var pathColour = new Rune.Color(20, 40, 180);
    var path = r.path(pathX, pathY, pathGroup)
      .stroke(pathColour)
      .strokeWidth(2)
      .fill(false);

    for (var i = 0; i < segments; i++) {
      path.lineTo(newPathX, newPathY);
      pathX = newPathX;
      pathY = newPathY;

      randomNumber = Math.floor(Rune.random(3));
      if (randomNumber == 0) {
        newPathX += pathStep;
      } else if (randomNumber == 1) {
        newPathX -= pathStep;
      } else if (randomNumber == 2) {
        newPathY += pathStep;
      } else if (randomNumber == 3) {
        newPathX -= pathStep;
      }

      r.circle(pathX, pathY, 5, pathGroup)
        .fill(pathColour)
        .strokeWidth(2)
        .stroke(255, 255, 255);

      // r.circle(pathX, pathY, 10, pathGroup)
      // .fill(20, 40, 180, 0.1)
      // .stroke(false);

    }

  };

  cls.draw = function() {
    // Draw random paths.
    var stepWidth = 50;
    for (var i = 0; i < 10; i++) {
      cls.drawRandomPath(Math.floor(Rune.random(10)) * stepWidth,
                         0, 30, stepWidth);
    }

    r.draw();

    // Make the path nodes interactive.
    app.nodes = document.querySelectorAll('circle');
    for (var i = 0; i < app.nodes.length; i++) {
      app.nodes[i].addEventListener('mouseenter', function(e) {
        e.target.setAttribute('fill', 'rgb(215, 40, 40)');
        e.target.setAttribute('r', '10');
        e.target.setAttribute('stroke-width', '4');
      });
    }
  };

  return cls;
};
