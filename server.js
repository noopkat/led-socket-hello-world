var Hapi = require('hapi');
var routes = require('./server/config/routes');

var server = new Hapi.Server();
server.connection({ port: 8082 });

server.views({
  engines: {
      html: require('handlebars')
  },
  path: './server/views'
});

for (var route in routes) {
  server.route(routes[route]);
}

var io = require('socket.io')(server.listener);
io.on('connection', function (socket) {
  console.log('socket connected');
  socket.on('clienttest', function(data) {
    console.log('I got: ' + data);
    socket.emit('servertest', 'hello!');
  });
});



server.start(function () {
  console.info('Server running at:', server.info.uri);

  // test emit
  io.emit('status', 'server ready');
});