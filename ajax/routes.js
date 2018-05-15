let fs = require('fs');
let path = require('path');

let CORS_WHITELIST = [
  'http://localhost:4200',
  'https://preco.io',
];

module.exports = app => {
  app.use(function(req, resp, next) {
    resp.header('Content-Type', 'application/json');
    if (CORS_WHITELIST.includes(req.headers.origin)) {
      resp.header('Access-Control-Allow-Origin', req.headers.origin);
      resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
  });

  let getPath = 'get';
  let files = fs.readdirSync(path.join(__dirname, getPath));

  files.forEach(file => {
    let routeName = file.replace(/\.js$/, '');
    app.get(`/${ routeName }`, require(`./${ getPath }/${ file }`));
    app.get(`/${ routeName }/:id`, require(`./${ getPath }/${ file }`));
  });
};
