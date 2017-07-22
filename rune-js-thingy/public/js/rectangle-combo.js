app.rectangleCombo = function() {
  var cls = this;

  cls.randomColors = [
    '#FF8D1E',
    '#FF3763',
    '#0083F5',
    '#FFE433',
    '#00F5A3',
    '#33CDFF'
  ];

  cls.randomColor = function() {
    return cls.randomColors[Math.floor(
      Rune.random(cls.randomColors.length))];
  };

  cls.drawRectangleCombo = function(x, y, width, options) {
    var doFill = false;
    if (options) {
      doFill = options.fill;
    }

    // Left rectangle
    r.triangle(x, y,
               x + width, y,
               x, y + width)
      .fill(cls.randomColor())
      .stroke(false);
    r.triangle(x + width, y,
               x + width, y + width,
               x, y + width)
      .fill(cls.randomColor())
      .stroke(false);

    // Right triangle
    r.triangle(x + width, y,
               x + width * 2, y + width,
               x + width, y + width)
      .fill(cls.randomColor())
      .stroke(false);
    r.triangle(x + width, y,
               x + width * 2, y,
               x + width * 2, y + width)
      .fill(cls.randomColor())
      .stroke(false);

    if (doFill === true) {
      var margin = 25;
      r.rect(x + margin / 2, y + margin / 2,
             width - margin, width - margin)
        .fill(cls.randomColor())
        .stroke(false);
      r.rect(x + width + margin / 2, y + margin / 2,
             width - margin, width - margin)
        .fill(cls.randomColor())
        .stroke(false);
    }
  };

  cls.draw = function() {
    cls.rectangleComboWidth = 50;
    for (var y = 0; y < 10; y++) {
      for (var x = 0; x < 10; x++) {
        cls.drawRectangleCombo(
          x * cls.rectangleComboWidth * 2,
          y * cls.rectangleComboWidth,
          cls.rectangleComboWidth,
          {fill: true});
      }
    }

    r.draw();

    cls.extractNumbers = function(string) {
      var match = [];
      if (string !== null) {
	string.replace(/\b[0-9]+\b/g, function(x) {
	  match.push(parseInt(x));
	});
      }
      return match
    };

    cls.negateSVGElementColor = function(element) {
      var values = cls.extractNumbers(element.getAttribute('fill'));
      var negated = new Rune.Color(values[0], values[1], values[2])
        .greyscale().rgb();
      var s = 'rgb(' + negated['r'] + ', ' + negated['g'] + ', ' +
        negated['b'] + ')';
      element.setAttribute('fill', s);
    };

    // Make the shapes change colour randomly on mouseover.
    var elements = document.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseenter', function(e) {
        // e.target.setAttribute('fill', cls.randomColor());
        // e.target.setAttribute('fill', );

	cls.negateSVGElementColor(e.target);
      });
    }

    // r.on('draw', function() {
    //   var elements = r.stage.children;
    //   for (var i = 0; i < elements.length; i++) {
    // 	// console.log(elements[i]);  // DEBUG
    // 	if (Math.floor(Rune.random(5000)) == 2) {
    // 	  elements[i].fill(cls.randomColor());
    // 	}
    //   }
    //
    //   // Make the shapes change colour randomly on mouseover.
    //   var elements = document.querySelectorAll('*');
    //   for (var i = 0; i < elements.length; i++) {
    // 	elements[i].addEventListener('mouseenter', function(e) {
    //       e.target.setAttribute('fill', cls.randomColor());
    // 	});
    //   }
    // });
    // r.play();
  }

  return cls;
};
