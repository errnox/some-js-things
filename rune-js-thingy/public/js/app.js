app.drawTests = function() {
  var rectangle = r.rect(20, 40, 200, 200).fill(255, 80, 100)
    .stroke(false);

  var width = 20;
  var height = 20;
  var spacing = 50;

  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      r.rect(x * (width + spacing), y * (height + spacing), width, height)
	.fill(0, 255 / x, 255 / y, 0.5)
	.stroke(false)
	.rotate(x * y);
    }
  }

  // Set up a grid.

  var grid = r.grid({
    x: 10,
    y: 10,
    width: 500,
    height: 500,
    gutter: 10,
    columns: 5,
    rows: 5
  });

  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      grid.add(r.rect(10, 10, 30, 40), x, y);
    }
  }

  var spiderX = 300;
  var spiderY = 300;
  for (var i = 0; i < 10; i++) {
    r.line(spiderX, spiderY,
           Math.sin(i) * spiderX * 2,
           Math.cos(i) * spiderY * 2)
      .stroke(155, 50, 70);
    r.circle(Math.sin(i) * spiderX * 2,
             Math.cos(i) * spiderY * 2, 5, 5)
      .stroke(false)
      .fill(150, 50, 50);
  }

  var randomX = Math.floor(Rune.random(100));
  r.triangle(120 + randomX, 120,
             150 + randomX, 80,
             180 + randomX, 120)
    .stroke(155, 100, 50)
    .strokeWidth(3)
    .fill(40, 255, 40);

  for (var i = 0; i < 10; i++) {
    r.text(i, 20, i * 30);
  }
};

// Animate.
// r.on('draw', function() {
//   rectangle.move(1, 2, true);
// });
// r.play();

// r.draw();
// console.log(r.getEl().outerHTML);  // DEBUG

// Set the art to be drawn.
var art =
  // new app.randomPath();
  // new app.rectangleCombo();
  // new app.dotMap();
  new app.particles();

art.draw();
