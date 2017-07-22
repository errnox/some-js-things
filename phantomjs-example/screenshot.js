var page = require('webpage').create();

console.log('Load website');

page.viewportSize = { width: 2000, height: 600 };
page.open('http://github.com/', function() {
  console.log('Take screenshot');
  page.render('github-com.png');
  console.log('Exit');
  phantom.exit();
});
