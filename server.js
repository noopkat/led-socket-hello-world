var Hapi = require('hapi');
var server = new Hapi.Server();
var routes = require('./server/config/routes');

// set up port
server.connection({ port: 8082 });
// templating
server.views({
  engines: {
      html: require('handlebars')
  },
  path: __dirname + '/server/views'
});

// routing import
for (var route in routes) {
  server.route(routes[route]);
}

// set up Arduino
var five = require('johnny-five');
var board = new five.Board();
var led;

// set up web socket to listen on server
var io = require('socket.io')(server.listener);

// when arduino board is ready
board.on('ready', function() {
  // set up led
  led = new five.Led.RGB({
    pins: [3, 5, 6],
    isAnode: true
  });

  // connect to web socket and listen to change the color of the led
  io.on('connection', function (socket) {
    socket.on('color:choice', function (color) {
      led.color(color);
    });
  });
  // end board ready
});

server.start(function() {
  console.info('Server running at:', server.info.uri);
});