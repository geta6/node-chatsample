var socket = io.connect('http://localhost:3000');

$(function(){

  var user = window.prompt('ユーザ名は？');

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
    var body = [
      data.user,
      ': ',
      data.text
    ].join('');
    $('#ul').prepend(
      $('<li>')
        .text(body)
        .append($('<span>')
          .css('padding-left', '10px')
          .addClass('date')
          .attr('data-date', data.date)
        )
    );
  });
});

setInterval(function(){
  if(($date = $('.date')).size()) {
    $date.each(function(i, el){
      $el = $(el);
      $el.text(moment($el.attr('data-date')).fromNow());
    });
  }
}, 1000);




