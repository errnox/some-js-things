$(document).ready(function () {

  //=======================================================================
  // Progress Bar
  //=======================================================================

  /**
     Sets the new width of the progress bar and animates it

     @param {string} selector CSS selector string for the progress bar
     @param {int/float} width New width for the progress bar
     @param {function/Array} callback (Optional) Callback which will be
       fired as soon as the animation is done. Can also be an Array of
       functions which will be fired in the specified order.
     @param {duration} duration (Optional) Animation duration in milliseconds
   */
  var setProgressBarWidth = function(selector, width, callback, duration) {
    // Get current progress bar element's widht
    var barElementWidth = $(selector).width();
    var currentWidth = $(this).width();

    //---------------------------------------------------------------------
    // Side note:
    //
    // Example for linear scaling (jQuery's step attribute for the animated
    // object uses the actual step for the progress. The progress bar text,
    // however, should always be scaled from 0 to 100.)
    //---------------------------------------------------------------------
    //
    // var oldMin = 0;
    // var newMin = 0;
    // var oldRange = (barElementWidth - oldMin);
    // var newRange = (100 - 0);
    // var newValue = (((currentWidth - oldMin) * newRange) / oldRange) +
    //   newMin;

    // Set the new width
    $(selector + ' > .progress-bar-text').text(width);
    // Set the text
    $(selector + ' > span').css('width', width + '%')
    // Animate it
    $(selector + ' > span').each(function() {
      $(this)
        .data('origWidth', $(this).width())
        .width(0)
        .animate({
          width: $(this).data('origWidth'),
        }, {
          duration: duration ? duration : 1200,
          easing: 'swing',
          step: function(progress) {
            $(selector + ' > .progress-bar-text').text(
              // Linear scaling
              Math.ceil((((progress - 1) * 100) / barElementWidth) + 0) +
                '%');
          },
          complete: function() {
            // Execute all callbacks
            if (callback) {
              if (Object.prototype.toString.call(callback) == '[object Array]') {
                for (var i = 0; i < callback.length; ++i) {
                  callback[i]();
                }
              } else {
                callback();
              }
            }
          }
        });
    });

  }


  //=======================================================================
  // Debugging
  //=======================================================================

  var debug = function() {
    $('body').append(
      '<ul id="debug-message-box" class="debug-ui-element"></ul>')
  }

  var progressMessage = function(message) {
    // arguments.each(function(message) {
    return function() {
      $('#debug-message-box').append('<li>' + message + '</li>');
    }
  }

  debug();

  // setProgressBarWidth('#main-progress-bar', 75);
  setProgressBarWidth('#main-progress-bar', 75.0, progressMessage('25'));
  // setProgressBarWidth('#main-progress-bar', 25, progressMessage('25'));
  // setProgressBarWidth('#main-progress-bar', 30, progressMessage('30'));
  // setProgressBarWidth('#main-progress-bar', 10, progressMessage('10'));
  // setProgressBarWidth('#main-progress-bar', 100, progressMessage('100'));
  // setProgressBarWidth('#main-progress-bar', 50, progressMessage('50'));
  setProgressBarWidth('#main-progress-bar', 50, [progressMessage('50'),
						 progressMessage('Done.')]);

});
