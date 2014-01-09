var socket = io.connect('http://localhost:3000');

$(function(){

  var user = window.prompt('ユーザ名は？');
  var tmpl = _.template($('#tmpl-body').html());

  // sendボタンが押された時の処理
  $('#button').on('click', function(){
    var text = $('#input').val();
    socket.emit('send', {
      user: user,
      text: text
    });
    $('#input').val('');
  });

  // サーバからテキストがきた時の処理
  socket.on('res', function(data){
    // data = { user: .., text: .., date: .. }
    $('#ul').prepend(  tmpl(data)  );
  });
});

setInterval(function(){
  if(($date = $('.date')).size()) {
    $date.each(function(i, el){
      $el = $(el);
      $el.text('(' + moment($el.attr('data-date')).fromNow() + ')');
    });
  }
}, 1000);




