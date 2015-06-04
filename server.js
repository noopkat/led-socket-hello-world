var Hapi = require('hapi');
var routes = require('./server/config/routes');

var server = new Hapi.Server();
server.connection({ port: 8081 });

server.views({
  engines: {
      html: require('handlebars')
  },
  path: './server/views'
});

for (var route in routes) {
  server.route(routes[route]);
}

server.start(function () {
  console.info('Server running at:', server.info.uri);
});