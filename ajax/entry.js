let express = require('express');
let app = express();
let initRoutes = require('./routes');

app.use(express.json({
  type: [
    'application/vnd.api+json',
    'application/x-www-form-urlencoded',
  ],
}));

initRoutes(app);

app.listen(8080);
console.log('Listening on 8080');
