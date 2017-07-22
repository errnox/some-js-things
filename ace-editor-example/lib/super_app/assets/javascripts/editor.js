var editor = ace.edit('editor');
editor.setTheme('ace/theme/solarized_dark');
editor.getSession().setMode('ace/mode/ruby');

editor.setValue(document.getElementById('editor-initial-content')
                .innerHTML);

editor.setKeyboardHandler('ace/keyboard/emacs');

var offsetToPos = function(lines, offset) {
  var row = 0;
  var col = 0;
  var pos = 0;

  while(row < lines.length && pos + lines[row].length < offset) {
    pos += lines[row].length;
    pos++; // for the newline
    row++;
  }
  col = offset - pos;
  return {row: row, column: col};
}

var setSelection = function(start, end) {
  // Translate Ace's positions to textarea-like offsets.

  var doc = editor.getSession().getDocument();
  var lines = doc.getAllLines();

  var start = offsetToPos(lines, start);
  var end = offsetToPos(lines, end);

  var sel = editor.getSelection();
  var range = sel.getRange();
  range.setStart(start.row, start.column);
  range.setEnd(end.row, end.column);
  sel.setSelectionRange(range);

  // Focus the editor
  editor.focus();
};

setSelection(32, 53);
