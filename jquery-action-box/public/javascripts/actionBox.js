// Experiments

self.mousePos = {x: -1, y: -1}
$(document).mousemove(function(e) {
  self.mousePos.x = e.pageX;
  self.mousePos.y = e.pageY;
});

self.actionBoxActive = false;
$('.action-box-trigger').click(function(e) {
  if (!self.actionBoxActive) {
    var element = $(
      '<div class="action-box panel panel-default panel-bod">'+
        '<p>' +
        '<button type="button" class="action-box-close-button pull-right btn btn-link">' +
        '&times;' +
        '</button>' +

      '<p>' +
        $(this).html() +
        '</p>' +

      'This is a test.' +
        '<button type="button" class="btn btn-primary">' +
        'Click' +
        '</button>' +
        '</p>' +
        '</div>'
    );
    element.css({
      'z-index': '9999',
      'position': 'absolute',
      'padding': '20px',
      'top': self.mousePos.y,
      'left': self.mousePos.x,
    });
    self.actionBoxActive = true;
    // $('body').append(element);
    element.appendTo($('body')).hide().fadeIn('fast');
    // Adjust the elements position.
    element.css({
      'left': self.mousePos.x - element.width() / 2,
    });

    element.find('.action-box-close-button').click(function(e) {
      e.preventDefault();
      console.log('CLOSE');  // DEBUG
      $(this).closest('.action-box').fadeOut('fast', function(e) {
        $(this).remove();
        self.actionBoxActive = false;
      });
    });
  }
});
