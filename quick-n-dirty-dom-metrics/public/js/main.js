(function() {
  // Log to HTML
  var logBox = document.getElementById('metrics-console');

  var log = function(message) {
    // Log to DOM
    var paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'log-message');
    paragraph.innerHTML = JSON.stringify(message);
    logBox.appendChild(paragraph);
  }

  var testElement = document.getElementsByTagName('div')[1];
  var result = metrics.countChildTagsOf(testElement);

  // log(result);
  // log(metrics.cssOf(testElement));

  console.log(result);

}).call(this);
