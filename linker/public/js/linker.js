$(document).ready(function() {


  //=======================================================================
  // Structure
  //=======================================================================

  // Logic
  var isActive = false;
  var animationSpeed = 250;
  var attrPrefix = 'll-';
  var layout = 'vertical';

  // Link list
  var linkListDiv = $('<div/>');
  var linkListContentDiv = $('<div/>');
  var linkListLi = $('<ul/>');

  // Body container
  var bodyContainer = $('<div/>');

  // Remover Element
  var removerElement = $('<div/>');
  removerElement.text('Remove');

  // var loadingElement = $('<h1>Loading</h1>');
  var loadingElement = $('<div><p>Loading...</p></div>');
  loadingElement.attr('id', attrPrefix + 'loading-element');


  //=======================================================================
  // Styling
  //=======================================================================

  linkListDiv.css({
    'background-color': '#E4E4E4',
    'z-index': '9999',
    'width': '100%',
    // 'height': '80%',
    'top': '0',
    'left': '0',
    'margin': '0',
    'padding': '0',
    // 'overflow': 'auto',
  })

  linkListContentDiv.css({
    'background-color': 'yellow',  // TODO
    'position': 'relative',
    'overflow': 'auto',
    'height': '50%',
    'resize': 'vertical',
  })

  bodyContainer.css({
    'background-color': 'red',  // TODO
    'width': '100%',
    'top': '0',
    'left': '0',
    'margin': '0',
    'padding': '0',
    'height': '100%',
    'overflow': 'auto',
  })

  removerElement.css({
    'background-color': 'green',  // TODO
    'z-index': '9999',  // Just to be sure
    'width': '100%',
    'cursor': 'pointer',
    'bottom': '0',
    'text-align': 'center',
  })

  loadingElement.css({
    'background-color': 'rgba(0, 0, 0, 0.5)',
    'color': 'white',
    'font-size': '2.2em',
    'text-align': 'center',
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
  });

  // Save the original CSS of the body
  var oldBodyPosition = $('body').css('position') || '';
  var oldBodyTop = $('body').css('top');
  var oldBodyOverflow = $('body').css('overflow');


  //=======================================================================
  // Code
  //=======================================================================

  var insertLinkList = function() {
    $('a').each(function(i, item) {
      linkListLi.append('<li><a href="' + item.href + '">' +
                        item.innerHTML + '</a></li>');
    });

    // Wrap the body

    bodyContainer.append($('body'));

    $('html').append(bodyContainer);

    $('body').css({
      // Not usable when reloading the windows
      // 'height': '20%',
      'overflow': 'auto',
    });


    // Set layout
    if(layout == 'vertical') {
      $('body').css({
	// 'margin-left': '50%',
	// 'width': '50%',
	'width': '50%',
	'float': 'right',

	'background-color': 'blue',
	'height': '100%',
      });

      linkListDiv.css({
	'width': '50%',
	'float': 'left',
      });

      linkListContentDiv.css({
	'height': '100%',
      });

      bodyContainer.css({
	'margin': 'auto',
      });
    }

    // Append the link list
    linkListContentDiv.append(linkListLi);
    linkListDiv.append(linkListContentDiv);
    linkListDiv.css('display', 'none');
    bodyContainer.prepend(linkListDiv);
    bodyContainer.fadeIn(animationSpeed);  // Only needed when fading it out

    // Initially slide in, but fade in for any further reload
    linkListContentDiv.prepend(loadingElement);
    if (!isActive) {
      linkListDiv.slideDown({
        duration: animationSpeed,
        step: function(i, fx) {
          if (i == 0) {
            linkListDiv.children().hide();
          }
        },
        complete: function() {
          linkListDiv.children().fadeIn(animationSpeed);
          loadingElement.detach();
        },
      });
      isActive = true;
    } else {
      linkListDiv.fadeIn(animationSpeed, function() {
        loadingElement.detach();
      });
    }

    // Add remover element
    linkListDiv.append(removerElement);
    removerElement.hide();
    removerElement.fadeIn(animationSpeed);
    removerElement.on('click', removeLinkList);


    // Make the link list container resizable
    //
    // linkListDiv.resizable({
    //   handles: 's',
    //   minHeight: 100,
    // });


    // Resize the max height of the body element when resizing the content
    // div for the link list
    // (usual `resize' events do not work with the CSS3 `resize' property;
    // so `DOMAttrModified' has to be used, wich is slow, unfortunately.)
    // Resizing has to be done to make it possible to scroll in both
    // windows (`body' and `linkListContentDiv') at the same time.
    //
    // linkListContentDiv.on('DOMAttrModified', function(e) {
    //   $('body').height(parseInt($(window).height()) -
    //                    parseInt(linkListContentDiv.css('height')));
    // });


    // Focus link list
    linkListContentDiv.focus();
  }


  var removeLinkList = function() {
    isActive = false;

    // Remove link list and restore original body
    $('html').append($('body'));
    bodyContainer.fadeOut(animationSpeed, function() {
      bodyContainer.remove();
    });
    $('body').css({
      'position': oldBodyPosition,
      'top': oldBodyTop,
      'overflow': oldBodyOverflow,
    });
  }


  //=======================================================================
  // DEBUG
  //=======================================================================

  // insertLinkList();
  // removeLinkList();

  $('#insert-link-list-button').click(insertLinkList);

  //=======================================================================
  // DEBUG
  //=======================================================================

  var keyMap = {};
  $(document).keydown(function(e) {
    keyMap[e.keyCode] = true;

    // Split the screen vertically
    if (keyMap['17'] === true      // Ctrl key
        && keyMap['18'] == true     // Meta key
        && keyMap['86'] == true) {  // v key
      insertLinkList();
    }

    // Unsplit the screen
    if (keyMap['17'] === true      // Ctrl key
        && keyMap['18'] == true     // Meta key
        && keyMap['75'] == true) {  // v key
      removeLinkList();
    }

  });

  $(document).keyup(function(e) {
    console.log(e.keyCode);  // DEBUG
    keyMap[e.keyCode] = false;
  });

  $(document).keypress(function(e) {
    // 17 + 18 + 68

    // console.log(JSON.stringify(keyMap, undefined, 2));  // DEBUG

  });


});
