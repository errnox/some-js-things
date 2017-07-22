window.onload = function() {


  var autoInsert = function(options) {
    // Non-global counter
    typeof count == 'undefined' ? count = 0 : void(0);

    // MIlliseconds for timeout
    options.ms ? options.ms : options.ms = 100;

    if (count < options.queryText.length) {
      options.textField.value = options.queryText.substring(0, ++count);

      // Optionally focus the text field
      options.focus ? options.textField.focus() : void(0);

      // Scroll to the end of the text field (in case the text consumes
      // more screen estate than the field has to offer)
      var len = options.textField.value.length;
      options.textField.setSelectionRange(len, len);

      window.setTimeout(function() {
        autoInsert(options);
      }, options.ms);

    } else {  // Finalize
      // Optionally unfocus the text field
      options.unfocusOnExit ? options.textField.blur() : void(0);
      options.callback();
    }
  };


  autoInsert({
    textField: document.getElementsByClassName('auto-inserting-text')[0],
    queryText: 'This is an auto-inserting text field.',
    focus: false,
    unfocusOnExit: true,
    callback: function() {
      // window.location.href = 'http://www.google.com.au/#hl=en&q=' +
      // options.queryText.replace(/\s+/g, '+');

      console.log(('Done'));  // DEBUG
    },
    ms: 200,
  });

};

