let fs = require('fs');
let path = require('path');

module.exports = app => {  
  let files = fs.readdirSync(path.join(__dirname, 'routes'));
  
  files.forEach(file => {
    let routeName = file.replace(/\.js$/, '');
    app.get(`/ajax/${ routeName }`, require(`./routes/${ file }`));
  });
};
