const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
let initRoutes = require('./ajax/routes');

const httpServer = new ExpressHTTPServer();
const app = httpServer.app;

initRoutes(app);

let server = new FastBootAppServer({
  httpServer: httpServer,
  distPath: 'dist',
});

server.start();
