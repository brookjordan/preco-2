let Pluralize = require('pluralize');

module.exports = {
  toApp,
  toJSON,
};

function toJSON(_type, flatData) {
  let type = Pluralize.plural(_type);
  if (typeof flatData.length === 'number') {
    return flatData.map(item => convertObjectToJSON(type, item));
  } else {
    return convertObjectToJSON(type, flatData);
  }
}

function toApp(jsonAPIData) {
  let type = Pluralize.singular(jsonAPIData[0].type);
  let data;

  if (typeof jsonAPIData.length === 'number') {
    data = jsonAPIData.map(item => convertObjectToApp(item));
  } else {
    data = convertObjectToApp(jsonAPIData);
  }

  return {
    [type]: data,
  };
}

function convertObjectToJSON(type, flatItem) {
  let attributes;
  let id = flatItem.uuid || flatItem.id;

  attributes = Object.assign({}, flatItem);
  delete attributes.uuid;

  let jsonAPIItem = {
    type,
    attributes,
    id,
  };

  return jsonAPIItem;
}

function convertObjectToApp(jsonAPIItem) {
  let attributes = jsonAPIItem.attributes;

  let flatItem = Object.assign({}, jsonAPIItem, attributes, {
    uuid: jsonAPIItem.id,
  });

  delete flatItem.id;
  delete flatItem.type;
  delete flatItem.attributes;

  return flatItem;
}

