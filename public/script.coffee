socket = io.connect 'http://localhost:3000'

$ ->
  user = window.prompt 'ユーザ名は？'
  tmpl = _.template ($ '#tmpl-body').html()

  # sendボタンが押された時の処理
  $input = $ '#input'
  ($ '#button').on 'click', ->
    text = $input.val()
    socket.emit 'send',
      user: user
      text: text
    $input.val ''

  # サーバからテキストがきた時の処理
  $ul = $ '#ul'
  socket.on 'res', (data) ->
    $ul.prepend tmpl data

  setInterval ->
    if ($date = ($ '.date')).size()
      $date.each (i, el) ->
        $el = $ el
        $el.text (moment $el.attr 'data-date').fromNow()
  , 1000

