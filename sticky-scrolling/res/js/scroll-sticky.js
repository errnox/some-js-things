$(function() {

  // Initialization
  var stickyElement = $('#scroll-sticky-element');
  // var originalTopOffset = stickyElement.offset().top;
  // var originalWidth = stickyElement.css('width');

  // Generate list of scroll-sticky elements
  var stickyElementsList = $('.sticky-element');
  var stickyElements = [];
  for (var i = 0; i < stickyElementsList.length; i++) {
    var element = $(stickyElementsList[i]);
    stickyElements[i] = [];
    stickyElements[i][0] = element;
    stickyElements[i][1] = parseInt(element.offset().top, 10);
    stickyElements[i][2] = parseInt(element.css('width'), 10);
  }


  // Makes an element sticky.
  //
  // element - The jQuery element which should be made sticky.
  // originalTopOffset - Integer representing the original offset of the
  //   element.
  // whenSticky - Callback which is executed everytime the element is made
  //   sticky.
  // whenUnsticky - Callback which is executed everytime the element is
  //   made unsticky.
  //
  // Returns nothing.
  var handleStickyness = function(element, originalTopOffset, whenSticky,
                                  whenUnsticky) {
    var whenSticky = whenSticky || null;
    var whenUnsticky = whenUnsticky || null;

    if ($(this).scrollTop() > originalTopOffset
        && element.css('position') != 'fixed'
        // Only check if necessary
        && !element.hasClass('scroll-sticky')) {
      element.addClass('scroll-sticky');
      whenSticky();
    }

    if ($(this).scrollTop() < originalTopOffset
        && element.css('position') == 'fixed'
        // Only check if necessary
        && element.hasClass('scroll-sticky')) {
      element.removeClass('scroll-sticky')
      whenUnsticky();
    }
  }

  $(window).scroll(function(e) {
    // Single element
    // handleStickyness(stickyElement, originalTopOffset);

    // Single element - preserving original width
    // handleStickyness(stickyElement, originalTopOffset, function() {
    //   stickyElement.css({'width': originalWidth});
    // });

    // Multiple elements - preserving original widths
    for (var i = 0; i < stickyElements.length; i++) {
      var element = stickyElements[i][0];
      handleStickyness($(element), stickyElements[i][1], function() {
        $(element).css({'width': stickyElements[i][2]});
      });
    }
  });

});
