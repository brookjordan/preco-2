const whitelists = {
  people: Object.freeze(require('./whitelists/people')),
  companies: Object.freeze(require('./whitelists/companies')),
};

module.exports = whitelists;
