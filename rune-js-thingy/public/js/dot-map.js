app.dotMap = function() {

  var cls = this;

  cls.drawMap = function() {
    var self = this;
    self.dotMapGroup = r.group().move(50, 50);
    self.circleRadius = 10;
    self.spacing = 10;
    self.lightness = null;

    self.secondaryCircleWidth = null;
    self.secondaryLightness = null;

    self.x = 10;
    self.y = 20;
    for (var y = 0; y < self.x; y++) {
      for (var x = 0; x < self.y; x++) {
        self.lightness = Math.round(Rune.random(0.01, 1.00) * 100) / 100;
        r.circle(x * self.circleRadius * 2,
                 y * self.circleRadius * 2,
                 self.circleRadius,
                 self.dotMapGroup)
          .fill(60, 230, 180, self.lightness)
          .stroke(false);

        self.secondaryCircleWidth = self.circleRadius /
          Math.floor(Rune.random(self.circleRadius)) / 1.5;
        self.secondaryCircleWidth === Infinity ?
          self.secondaryCircleWidth = 0 : null;
        self.lightness > 0.50 ? self.secondaryCircleWidth -= 0.10 : null
        self.secondaryLightness = Math.round(
          Rune.random(0.01, 1.00) * 100) / 100;
        r.circle(x * self.circleRadius * 2,
                 y * self.circleRadius * 2,
                 self.secondaryCircleWidth,
                 self.dotMapGroup)
          .fill(30, 80, 115, self.secondaryLightness)
          .stroke(false);
      }
    }
  };

  cls.draw = function() {
    cls.drawMap();
    r.draw();
  };

};
