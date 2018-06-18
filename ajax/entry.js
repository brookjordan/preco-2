let express = require('express');
let app = express();
let initRoutes = require('./routes');
let passport = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({
  type: [
    'application/vnd.api+json',
    'application/x-www-form-urlencoded',
    'application/json',
  ],
}));

initRoutes(app);

app.listen(8080);
console.log('Listening on 8080');
