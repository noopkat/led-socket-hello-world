var requireDirectory = require('require-directory');
var handlers = requireDirectory(module, '../handlers');

module.exports = function() {
  return [
    {
      method: 'GET',
      path: '/',
      config : {
        handler: handlers.index
      }
    },
    {
      method: 'GET',
      path: '/about',
      config : {
        handler: handlers.about
      }
    },
    {
      method: 'GET',
      path: '/images/{path*}',
      config : {
        handler: {
          directory: { path: __dirname + '/../../public/images' }
        }
      }
    },
    {
      method: 'GET',
      path: '/js/{path*}',
      config : {
        handler: {
          directory: { path: __dirname + '/../../public/js' }
        }
      }
    },
    {
      method: 'GET',
      path: '/css/{path*}',
      config : {
        handler: {
          directory: { path: __dirname + '/../../public/css' }
        }
      }
    }
  ];
}();