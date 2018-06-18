let fs = require('fs');
let path = require('path');
let passport = require('./config/passport');

let CORS_WHITELIST = [
  'http://localhost:4200',
  'https://preco.io',
];

module.exports = app => {
  app.use((req, resp, next) => {
    resp.header('Content-Type', 'application/json');
    if (CORS_WHITELIST.includes(req.headers.origin)) {
      resp.header('Access-Control-Allow-Origin', req.headers.origin);
      resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
  });

  app.post('/log-in',
    (req, res, next) => {
      passport.authenticate('local-login', (err, user, info) => {
        if (err) {
          res.status(401);
          return res.send({ errors: [err] });
        }
        if (!user) {
          res.status(401);
          return res.send({ errors: [info || 'Authentication error'] });
        }

        res.status(200);
        return res.send({ data: 'Done' });
      })(req, res, next);
    },
  );

  addGetRoutes(app);
  addPostRoutes(app);
};

function addGetRoutes(app) {
  let getPath = 'get';
  let files = fs.readdirSync(path.join(__dirname, getPath));

  files.forEach(file => {
    let routeName = file.replace(/\.js$/, '');
    app.get(`/${ routeName }`, require(`./${ getPath }/${ file }`));
    app.get(`/${ routeName }/:id`, require(`./${ getPath }/${ file }`));
  });
}

function addPostRoutes(app) {
  let postPath = 'post';
  let files = fs.readdirSync(path.join(__dirname, postPath));

  files.forEach(file => {
    let routeName = file.replace(/\.js$/, '');
    app.post(`/${ routeName }`, require(`./${ postPath }/${ file }`));
    app.post(`/${ routeName }/:id`, require(`./${ postPath }/${ file }`));
  });
}
