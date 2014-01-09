// Generated by CoffeeScript 1.6.3
(function() {
  var socket;

  socket = io.connect('http://localhost:3000');

  $(function() {
    var $input, $ul, tmpl, user;
    user = window.prompt('ユーザ名は？');
    tmpl = _.template(($('#tmpl-body')).html());
    $input = $('#input');
    ($('#button')).on('click', function() {
      var text;
      text = $input.val();
      socket.emit('send', {
        user: user,
        text: text
      });
      return $input.val('');
    });
    $ul = $('#ul');
    socket.on('res', function(data) {
      return $ul.prepend(tmpl(data));
    });
    return setInterval(function() {
      var $date;
      if (($date = $('.date')).size()) {
        return $date.each(function(i, el) {
          var $el;
          $el = $(el);
          return $el.text((moment($el.attr('data-date'))).fromNow());
        });
      }
    }, 1000);
  });

}).call(this);
