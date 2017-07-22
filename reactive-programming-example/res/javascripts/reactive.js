$(document).ready(function() {

  function setA(){  // A=X+Y as integers
    var A = parseInt($('#X').text()) + parseInt($('#Y').text());
    $('#A').text( A );
  }
  setA(); // for initial value of A
  $('#X,#Y').css('cursor','pointer').click(function(){
    // by reaction to a click at X or at Y...
    var obj = $(this);
    obj.text(parseInt(obj.text())+1);  // updates X or Y
    setA(); // updates A
  });

});
