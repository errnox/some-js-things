$(document).ready(function() {

  //=======================================================================
  // Reddit-related
  //=======================================================================



  var COLLAPSE_SHOW_TOKEN = 'Show';
  var COLLAPSE_HIDE_TOKEN = 'Hide';

  var nilToken = '<div id="faded">(not available)</div>'

  $('#page-header').fadeIn();
  $('#explanation-header').slideDown('slow');

  $('.vertical-ui-holder').hide();

  $('#reload-page-header').click(function() {
    location.reload();
  });


  //-----------------------------------------------------------------------
  // Msg
  //-----------------------------------------------------------------------


  var msg = function(msg, options) {

    var milliseconds = options.duration || 4000;
    var warning = $('<div/>');
    warning.addClass('msg-element')

    var color;
    var backgroundColor;
    var position;
    var border;
    var bottom;

    switch(options.type) {
    case 'error':
      color = '#B94A48';
      backgroundColor = 'rgb(242, 222, 222)';
      border = 'solid rgb(238, 211, 215)';
      break;
    case 'warning':
      color = '#C09853';
      backgroundColor = 'rgb(252, 248, 227)';
      border = 'solid rgb(251, 238, 213)';
      break;
    case 'success':
      color = '#468847';
      backgroundColor = 'rgb(223, 240, 216)';
      border = 'solid rgb(214, 233, 198)';
      break;
    case 'info':
      color = '#3A87AD';
      backgroundColor = 'rgb(217, 237, 247)';
      border = 'solid rgb(188, 232, 241)';
      break;
    case 'default':
      color = '#FFF';
      backgroundColor = 'rgb(100, 100, 100)';
      border = 'solid rgb(120, 120, 120)';
      break;
    default:
      color = '#FFF';
      backgroundColor = 'rgb(100, 100, 100)';
      border = 'solid rgb(120, 120, 120)';
    }

    if (options.color) {
      color = options.color;
    }

    if (options['background-color']) {
      backgroundColor = options['background-color'];
    }

    if (options.backgroundColor) {
      backgroundColor = options.backgroundColor;
    }

    switch(options.position) {
    case 'top':
      position = 'top';
      break;
    case 'center':
      position = '50%';
      break;
    case 'bottom':
      bottom = '0';
      break;
    default:
      position = 'top';
    }

    warning.css({
      'border': border,
      'border-width': '2px',
      'opacity': '0.8',
      'position': 'absolute',
      'width': '100%',
      'top': position,
      'bottom': bottom,
      'font-weight': 'bold',
      'text-size': '1.5em',
      'padding': '10px',
      'margin': 'auto',
      'background-color': backgroundColor,
      'color': msg.color || color,
    });

    if (options.css) {
      warning.css(options.css);
    }

    var centered = options.center || null;

    if (msg instanceof jQuery) {
      if (centered == true) {
        msg.css({
          'margin': 'auto',
        });
      }

      warning.append(msg);

      var hideElement = $('<p>&#10006</p>');
      hideElement.css({
        'float': 'right',
        'position': 'relative',
        'margin-right': '30px',
        'margin-left': '30px',
        'cursor': 'pointer',
      });
      hideElement.click(function() {
        $('.msg-element').remove();
      });

      warning.prepend(hideElement);

    } else {
      if (centered == true) {
        warning.css({
          'text-align': 'center',
        });
      }

      warning.text(msg);
    }

    $('body').prepend(warning);
    warning.fadeOut(milliseconds);
    warning.remove();
  };



  //-----------------------------------------------------------------------
  // User input
  //-----------------------------------------------------------------------

  var previousBgColor = $('.number-of-comments').css('background-color');

  var flicker = function(element, milliseconds) {
    var milliseconds = milliseconds || 100;
    element.slideUp(milliseconds);
    element.slideDown(milliseconds);
  }

  var setLoading = function(element, adjust) {
    element.fadeOut('fast');
    var spinner = $(
      '<img class="loading-spinner" src="public/img/spinner.gif"/>');

    // Adjust the size of the spinner image
    if (adjust) {
      spinner.css({
        'height': element.css('height'),
        'width': element.css('height'),
      });
    }

    spinner.hide();
    element.prepend(spinner);
    spinner.fadeIn('fast');
    element.fadeIn();
  };

  var unsetLoading = function(element) {
    element.parent().find('.loading-spinner').remove();
    element.show();
  }


  var oldAjaxButtonHTML;
  var setLoadingAjaxButton = function() {
    var ajaxButton = $('#run-ajax-button');
    oldAjaxButtonHTML = ajaxButton.html();

    ajaxButton.html(
      '<img class="loading-spinner" src="public/img/spinner.gif"/><p>&#10155</p>');

  }

  var unsetLoadingAjaxButton = function() {
    $('#run-ajax-button').html(oldAjaxButtonHTML);
    $('#run-ajax-button').parent().parent().fadeOut();
  }


  var prevLinkColor;
  var prevCSS = {};
  $('#run-ajax-button').hover(function() {
    // $(this).fadeOut();

    prevLinkColor = $(this).children().css('color');

    $(this).children().css({
      'color': 'red',
    });

    prevCSS['box-shadow'] = $(this).css('box-shadow');
    prevCSS['text-shadow'] = $(this).css('text-shadow');

    $('button').each(function(i, obj) {
      $(obj).animate({
        '': '',
      }, {
        duration: 500,
        step: function() {
          $(this).css({
            '-moz-transform': 'rotate(10deg) scale(1.3)',
            '-moz-transition': '-moz-transform 0.8s ease-in-out',
          });
        },
      });
    });

  }, function() {
    $(this).children().css({
      'color': prevLinkColor,
    });

    $('body *:not(div):not(#content):visible').each(function(i, obj) {
      $(obj).animate({
        '': '',
      }, {
        duration: 500,
        step: function() {
          $(this).css({
            '-moz-transform': 'rotate(0deg)',
            '-moz-transition': '-moz-transform 0.4s ease-in-out',
          });
        },
      });
    });
  });



  var makeValidatable = function() {

    $('.number-of-comments').keyup(function(e) {
      if (/[^0-9]+/.test($(this).val())) {
        msg('Numbers only', {
          duration: 2000,
          type: 'info',
          position: 'top',
          center: true,
        });

        $(this).val('');

        // Flicker
        flicker($(this));
      }

      if (parseInt($(this).val()) > 100) {
        $(this).val('100');

        // Flicker
        flicker($(this));
      }
    });
  };

  makeValidatable();


  // Allo adding of new user input element rows

  // Save the default state
  var userInputElementRow = $('.user-input-element-row').clone();
  $('.new-user-name').click(function() {
    $('#user-input-element .new-insert-anchor').append(userInputElementRow.clone());
    makeValidatable();

    // Make ever user input element removable

    $('.remove-user-input-element-button').click(function() {
      console.log('click');  // DEBUG
      $(this).parent('.user-input-element-row').slideUp({
        complete: function() {
          $(this).remove();
          console.log('remove' + $(this).find('.user-name').val());  // DEBUG
        },
      });
    });
  });


  $('#run-ajax-button').click(function() {
    $('#reload-page-header').slideDown();
    $('.user-input-element-row').each(function(i, obj) {
      getUserComments($(obj).find('.user-name').val(),
                      $(obj).find('.number-of-comments').val(),
		      $(obj).children('.do-build-table').attr('checked'));
      console.log(JSON.stringify(obj, undefined, 2));  // DEBUG // TODO
    });
  });

  //-----------------------------------------------------------------------
  // Handle collapsing
  //-----------------------------------------------------------------------

  function unfoldBodyCell(collapsableText, collapseElement, noAnimation) {
    var oldBgColor = collapsableText.css('background-color');
    noAnimation ? collapsableText.show() : collapsableText.slideDown();
    collapseElement.text(COLLAPSE_HIDE_TOKEN);
    collapseElement.addClass('unfolded');
  };

  function foldBodyCell(collapsableText, collapseElement, noAnimation) {
    noAnimation ? collapsableText.hide() : collapsableText.slideUp();
    collapseElement.text(COLLAPSE_SHOW_TOKEN);
    collapseElement.removeClass('unfolded');
  };

  function toggleCollapseBodyCell(collapsableText, collapseElement) {
    if (collapseElement.text() == COLLAPSE_SHOW_TOKEN) {
      unfoldBodyCell(collapsableText, collapseElement);
    } else {
      foldBodyCell(collapsableText, collapseElement);
    }
  };

  // Fold all body cells
  var foldAll = function() {
    $('.body-cell').each(function() {
      foldBodyCell($($(this).children('.collapsable-text')),
                   $($(this).children('.collapse-element')),
                   true);
    });
  };

  // Unfold all body cells
  var unfoldAll = function() {
    $('.body-cell').each(function() {
      unfoldBodyCell($($(this).children('.collapsable-text')),
                     $($(this).children('.collapse-element')),
                     true);
    });
  };

  var foldAllElementText = $('.fold-all-element').text();
  var unfoldAllElementText = $('.unfold-all-element').text();

  $('.fold-all-element').click(function() {
    foldAll();
  });

  $('.unfold-all-element').click(function() {
    unfoldAll();
  });


  var getUserComments = function(userName, numberOfComments, notable) {

    // Initialize the table

    var commentsTable = $('<table/>');
    commentsTable.addClass(
      'table table-bordered table-striped table-condensed');
    commentsTable.attr('class', 'reddit-table');
    commentsTable.attr('id', 'reddit-table-' + userName);

    var row = $('<tr/>');
    row.append('<th id="faded">#</th>')
    row.append('<th>Comments</th>')
    row.append('<th>Chars</th>')
    row.append('<th>Freqs</th>')
    row.append('<th>Ups</th>')
    row.append('<th>Downs</th>')
    row.append('<th>Created</th>')
    row.append('<th>Edited</th>')
    row.append('<th>Gilded</th>')
    commentsTable.append(row);

    var collapsableCell;

    var doToggle = true;
    var collapseElement;
    var tableCell;


    var limit = numberOfComments || 100;  // Reddit has a 100 max limit

    $.ajax({
      type: 'GET',
      url:
      'http://www.reddit.com/user/' + userName + '/comments.json?jsonp=?&limit=' +
        numberOfComments,
      dataType: 'jsonp',
      beforeSend: function(xhr, obj) {
        $('#page-header').slideUp('slow');
        $('#explanation-header').slideUp();


        setLoadingAjaxButton();
      },
      success: function(resp) {

        var summaryData = {};
        // Fill the table
        $.each(resp.data.children, function(i, obj) {

          // Collect the summary data
          if (typeof summaryData.body == 'undefined') {
            summaryData.body = '';
          }
          summaryData.body += obj.data.body;
          if (typeof summaryData.ups == 'undefined') {
            summaryData.ups = [0, 0];
          }
          var ups = parseInt(obj.data.ups);
          if (ups != 0) {
            ++summaryData.ups[0];
            summaryData.ups[1] += ups;
          }
          if (typeof summaryData.downs == 'undefined') {
            summaryData.downs = [0, 0];
          }
          var downs = parseInt(obj.data.downs);
          if (downs != 0) {
            ++summaryData.downs[0];
            summaryData.downs[1] += downs;
          }
          if (typeof summaryData.edited == 'undefined') {
            summaryData.edited = 0;
          }
          if(obj.data.edited != false) {
            ++summaryData.edited;
          }
          if (typeof summaryData.gilded == 'undefined') {
            summaryData.gilded = 0;
          }
          var gildeds = parseInt(obj.data.gilded);
          if (gildeds != 0) {
            summaryData[0] += gildeds;
          }


          if (!(notable)) {

            row = $('<tr/>');
            row.append('<td><div id="faded">' + i + '</div></td>');

            // Body

            // Hierarchy: td > p (collapsableText) + p (collapseElement)
            tableCell = $('<td/>');
            tableCell.attr('class', 'body-cell');
            collapseElement = $('<p/>');
            collapseElement.attr('class', 'collapse-element');
            collapseElement.text(COLLAPSE_HIDE_TOKEN);
            collapsableText = $('<p>' + obj.data.body + '</p>');
            collapsableText.attr('class', 'collapsable-text');
            collapseElement.on('click', function() {
              toggleCollapseBodyCell($($(this).parent().children(
                '.collapsable-text')), $($(this).parent().children(
                  '.collapse-element')));
            });
            tableCell.append(collapseElement);
            tableCell.append(collapsableText);
            row.append(tableCell);

            // Chars
            row.append('<td><div class="label">' +
                       obj.data.body.length + '</div></td>');

            // Frequencies
            row.append('<td><div class="freq-element">Show</div></td>');

            row.append('<td><span class="badge badge-success">' +
                       obj.data.ups + '</span></td>');
            row.append('<td><span class="badge badge-important">' +
                       obj.data.downs + '</span></td>');
            row.append('<td><span class="label created-cell">' +
                       convertToHumanReadableDate(obj.data.created) +
                       '</span></td>');
            row.append('<td>' + checkIfEdited(obj.data.edited) + '</td>');
            row.append('<td><span class="badge badge-warning">' +
                       obj.data.gilded + '</span></td>');
            commentsTable.append(row);

          }
        });

        // Append the user name
        $('#main-content').append($('<h2>' + userName + '</h2>'));
        // Append the summary
        $('#main-content').append(buildSummary(summaryData));

        if (!(notable)) {


          // Append the table
          $('#main-content').append(commentsTable);

          var htmlString = $('html').clone().html();
          // console.log(htmlString);  // DEBUG

          // Make the whole document easily storable
          // (Uses the base64 jQuery plugin)
          var datauri = 'data:text/html;charset=utf-8;base64,' +
            $.base64.encode(htmlString);
          $('#save-for-later-section').append('<a href="' + datauri +
                                              '">Save it!</a>');

          foldAll();

          var modal = new Modal();
          var freqList = new FreqList();
          $('.freq-element').on('click', function() {
            var table = $(freqList.build($(this).parents('tr').find(
              '.collapsable-text').text()).sort().htmlTable([
                ['==', 1, 'error'],
                ['>=', 2, 'warning'],
                ['>=', 5, 'info'],
                ['>=', 10, 'success'],
              ]));
            table.addClass(
              'table table-bordered table-striped table-hover table-condensed');
            modal.show(table);
          });
        }},
      error: function(res, resp, error) {
        throw error;
      },
      complete: function() {
        unsetLoadingAjaxButton();
        $('.vertical-ui-holder').slideDown();
      },
    });
  }

  var convertToHumanReadableDate = function(unixTimestamp) {
    var humanReadableDate = '';
    if (date != false || date != null) {
      var date = new Date(unixTimestamp * 1000);
      var monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                     'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = date.getFullYear();
      var month = monthes[date.getMonth()];
      var date = date.getDate();

      // Reddit is not that precise
      //
      // var hour = date.getHours();
      // var min = date.getMinutes();
      // var sec = date.getSeconds();
      //
      // humanReadableDate = date + ', ' + month + ' ' + year + ' ' + hour +
      //   ':'  + min + ':' + sec;

      // So we just take the short version
      humanReadableDate = date + ', ' + month + ' ' + year

    } else {
      humanReadableDate = nilToken;
    }

    return humanReadableDate;
  }

  var checkIfEdited = function(edited) {
    var answer = '<span class="label label-important">No</span>';

    if (!edited == false) {
      answer = '<span class="label label-success">Yes</span>';
    }

    return answer;
  }


  var buildSummary = function(data) {
    var summary = $('<div/>');
    summary.addClass('summary row');

    // Add chars
    summary.append('<div class="span2">Total chars: <span class="label">'
                   + data.body.length + '</span></div>');

    // Add frequency element

    var totalFreqElement = $('<p class="total-freq-element">Show</p>');
    totalFreqElement.addClass('span1');
    totalFreqElement.on('click', function() {
      var modal = new Modal();
      var freqList = new FreqList();
      var table = $(freqList.build(data.body).sort().htmlTable([
        ['==', 1, 'error'],
        ['>=', 2, 'warning'],
        ['>=', 5, 'info'],
        ['>=', 10, 'success'],
      ]));
      table.addClass(
        'table table-bordered table-striped table-hover table-condensed');
      modal.show(table);
    });
    summary.prepend(totalFreqElement);

    // Add ups
    summary.append('<div class="span2"><ul class="unstyled"><li>Number of ups: '
                   + data.ups[0] +
                   '</li><li>Ups total: <span class="badge badge-success">'
                   + data.ups[1] + '</span></li></ul></div>');
    // Add downs
    summary.append('<div class="span2"><ul class="unstyled"><li>Number of downs: '
                   + data.downs[0] +
                   '</li><li>Downs total: <span class="badge badge-important">'
                   + data.downs[1] + '</span></li></ul></div>');
    // Add edits
    var badge = 'important';
    if (data.edited > 0) {
      badge = 'success';
    }
    summary.append(
      '<div class="span2">Number of edits: <span class="label label-' +
        badge + '">' + data.edited + '</span></div>');
    // Add gildings
    summary.append(
      '<div class="span2">Number of gildings: <span class="badge badge-warning">'
        + data.gilded + '</span></div>');

    return summary;
  };

  //=======================================================================
  // Frequency list
  //=======================================================================

  var FreqList = (function() {
    function FreqList(string) {
      var self = this;
      this.string = string;
      this.data = [];
    }

    FreqList.prototype = new (function() {

      this.build = function(string) {
        var s = '';
        string ? s = string : s = this.string;
        var tokens = s.split(
            / |\.|\,|\?|\!|\:|\"|\'|\;|\@|\#|\(|\)|\[|\]|\{|\}|\+/g);

        // Schema: `[["Lorem", 3], ["ipsum", 2], ["dolor", 1], ...]'
        var freqList = new Array(tokens.length);
        var copy = new Array();
        var exists = false;
        var currentToken = '';

        for (var i = 0; i < freqList.length; ++i) {
          currentToken = tokens[i];

          exists = false;

          for (var j = 0; j < freqList.length + 1; ++j) {
            if (freqList[j] && freqList[j][0] == currentToken) {
              exists = true;
              ++freqList[j][1];
            }
          }

          if (!exists) {
            freqList[i] = [];
            freqList[i][0] = currentToken;
            freqList[i][1] = 1;
          }

          if (typeof freqList[i] != 'undefined' &&
              typeof freqList[i] != null &&
              // Check if the string is only whitespace or empty
              !(/^\s*$/.test(freqList[i][0]))) {
            copy.push(freqList[i]);
          }

        }

        self.data = copy;
        return this;

      };

      this.sort = function(reversed) {
        var comparison = null;
        self.data.sort(function(a, b) {
          if (reversed) {
            comparison = a[1] - b[1];
          } else {
            comparison = b[1] - a[1];
          }
          return comparison;
        });

        return this;
      };

      this.reverseSort = function() {
        this.sort(true);

        return this;
      };

      this.freqs = function() {
        return self.data;
      };

      this.removeUniques = function() {
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          if (!(self.data[i][1] == 1)) {
            copy.push(self.data[i]);
          }
        }

        self.data = copy;
        return this;
      };

      this.uniques = function() {
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          if (self.data[i][1] == 1) {
            copy.push(self.data[i]);
          }
        }

        self.data = copy;
        return this;
      };

      this.length = function(min, max) {
        var max = max || min;
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          if (self.data[i][0].length >= min &&
              self.data[i][0].length <= max) {
            copy.push(self.data[i]);
          }
        }

        self.data = copy;
        return this;
      };

      this.minLength = function(length) {
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          if (self.data[i][0].length >= length) {
            copy.push(self.data[i]);
          }
        }

        self.data = copy;
        return this;
      };

      this.maxLength = function(length) {
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          if (self.data[i][0].length <= length) {
            copy.push(self.data[i]);
          }
        }

        self.data = copy;
        return this;
      };

      this.reverse = function(min, max) {
        var copy = [];

        for (var i = 0; i < self.data.length; ++i) {
          copy.unshift(self.data[i]);
        }

        self.data = copy;
        return this;
      };

      // [ [2, '.success'], [4, '.error'], [10, '.warning'] ]
      this.htmlTable = function(thresholds) {
        var current;
        var classes;
        var classesKeys;
        var classString;
        var table =
          '<table><thead><tr><th>Frequency</th><th>Token</th></tr></thead><tbody>';
        for (var i = 0; i < self.data.length; ++i) {
          current = self.data[i];
          table += '<tr'

          // Add class attributes, if any

          // TODO
          classes = {};
          if (thresholds) {
            for (var j = 0; j < thresholds.length; ++j) {

              if (thresholds[j][0] == '<') {
                if (current[1] < thresholds[j][0]) {
                  classes[thresholds[j][2]] = true;
                }
              } else if (thresholds[j][0] == '>') {
                if (current[1] > thresholds[j][1]) {
                  classes[thresholds[j][2]] = true;
                }
              } else if (thresholds[j][0] == '<=') {
                if (current[1] <= thresholds[j][1]) {
                  classes[thresholds[j][2]] = true;
                }
              } else if (thresholds[j][0] == '>=') {
                if (current[1] >= thresholds[j][1]) {
                  classes[thresholds[j][2]] = true;
                }
              } else if (thresholds[j][0] == '==') {
                if (current[1] == thresholds[j][1]) {
                  classes[thresholds[j][2]] = true;
                }
              }

            }

            classesKeys = Object.keys(classes);
            if (classesKeys.length > 0) {
              table += ' class="'
              for (var k = 0; k < classesKeys.length; ++k) {
                classString = classesKeys[k];
              }
              table += classString;
              table += '"'
            }

          }

          table += '><td>' + current[1] + '</td><td>' + current[0] +
            '</td></tr>'
        }
        table += '<tbody></table>';
        return table;
      }

    })();

    return FreqList;
  })();


  //=======================================================================
  // Modal
  //=======================================================================

  var Modal = (function() {
    function Modal() {
      var self = this;

      // Handle hiding

      // Hide on button click
      $('#modal-close-button').on('click', function() {
        self.hide();
      });

      // Hide when clicking outside the modal window itself
      $('#modal-overlay').on('click', function() {
        self.hide();
      });

      // Restrict the `#model-content' height to the window height

      $('#modal-content').css({
        'height': $(window).height() - 50 + 'px',
      });

      $(window).on('resize', function() {
        $('#modal-content').css({
          'height': $(window).height() - 50 + 'px',
        });
      });

    }

    Modal.prototype = new (function() {

      // Functions

      this.show = function(content) {
        if (content) {
          this.content(content);
        }

        $('#modal-wrap').fadeIn('fast');
      };

      this.hide = function(doClear) {
        $('#modal-wrap').fadeOut('fast');

        if (doClear) {
          this.clear();
        }
      };

      this.content = function(content) {
        $('#modal-content').empty();
        $('#modal-content').append(content);
      };

      this.clear = function(content) {
        $('#modal-content').empty();
      };

    })();

    return Modal;
  })();



  //#######################################################################
  // DEBUG
  //#######################################################################
  //
  // There is no software engineering justification for having this DEBUG
  // section here at all. But neither is there for having such a huge
  // file... and no tests... and no structure... and...
  //
  // So please keep this around. Thanks.


  //=======================================================================
  // Reddit API
  //=======================================================================

  // getUserComments(userName);


  //=======================================================================
  // Frequency list
  //=======================================================================

  var string = 'Lorem ipsum sit dolor sit sit amet, consectetaur adipisicing elit, sed do eiusmod tempor sunt lorem officia incididunt sunt ut labore et dolore magna aliqua. Ut enim ad quis minim veniam, quis nostrud quis quis exercitation esse ullamco esse laboris nisi ut aliquip ex ea commodo consequat quis. Duis aute quis quis irure dolor quis quis quis in reprehenderit in voluptate quis esse velit esse cillum dolore eu Lorem fugiat nulla pariatur. quis Excepteur lorem sint occaecat quis lorem cupidatat Lorem non Lorem quis proident, sunt in culpa qui quis officia deserunt mollit anim id est laborum.';

  // var freqList = new FreqList(string);

  // var table = $(freqList.build().maxLength(4).sort().htmlTable([
  //   ['==', 1, 'warning'],
  //   ['<=', 10, 'warning'],
  //   ['>=', 2, 'success'],
  //   ['>=', 4, 'info'],
  //   ['>=', 10, 'error'],
  // ]));  // DEBUG

  // table.addClass(
  //   'table table-bordered table-striped table-hover table-condensed');
  // $('#main-content').append(table);

  // console.group('table');
  // console.info(table.html());  // DEBUG
  // console.groupEnd();


  //=======================================================================
  // Modal window
  //=======================================================================

  // Stick it to the document so it is available in the console
  // document.modal = Modal;

  // var modal = new Modal();

  // $('#show-modal-element').on('click', function() {
  //   var content = $('<ul/>');
  //   for (var i = 0; i < 100; ++i) {
  //     content.append('<li>Item ' + i + '</li>');
  //   }

  //   modal.show(content);
  // });



  //=======================================================================
  // Loading animation
  //=======================================================================


  // setLoading($('#run-ajax-button'));
  // unsetLoading($('#run-ajax-button'));

  // setLoading($('.new-user-name'));
  // unsetLoading($('.new-user-name'));

  // setLoading($('.user-input-element-row'));

  // $('li').click(function() {
  //   setLoading($(this), false);
  // });


  // setLoading($('#run-ajax-button'), true);
  // $('body').animate({
  //   'opacity': '0.3',
  // }, {
  //   duration: 3000,
  //   complete: function() {
  //     unsetLoading($(this));
  //     $(this).css('opacity', '1.0');
  //   }
  // });

  // setLoadingAjaxButton();
  // $('body').animate({
  //   // 'opacity': '0.3',
  //   'left': '10',
  // }, {
  //   duration: 1000,
  //   complete: function() {
  //     unsetLoadingAjaxButton();
  //   }
  // });


});
