###
Module dependencies.
###

http = require 'http'
path = require 'path'
express = require 'express'

app = exports = module.exports = express()

# all environments

app.set 'port', (process.env.PORT || 3000)
app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'jade'
app.use express.favicon()
app.use express.logger 'dev'
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()
app.use app.router
app.use express.static path.join __dirname, 'public'

# development only

if 'development' is app.get 'env'
  app.use express.errorHandler()

app.get '/', (req, res) ->
  res.render 'index', title: 'Express'

app.get '/users', (req, res) ->
  res.send "respond with a resource"

server = http.createServer app

server.listen 3000, ->
  console.log "Express listening on port #{app.get 'port'}"

io = (require 'socket.io').listen server

io.sockets.on 'connection', (socket) ->
  socket.on 'send', (data) ->
    data.date = new Date()
    io.sockets.emit 'res', data



