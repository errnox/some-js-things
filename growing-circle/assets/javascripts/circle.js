$(document).ready(function() {

  $('.growing-circle').click(function(e) {
    e.preventDefault();
    $(this).text('');
    $(this).animate({
      'padding': '100%',
      'top': '-400px',
      'left': '-400px',
    }, 450, function() {
      $(this).remove();
      $('body').css({'background-color': '#AFEFAF'});
      $('.input-form-box').append('<h2>Form</h2><label>Input</label>\
<input type="text" class="form-control" \
placeholder="Your input here"></input>')
    });
  });
  
});
