module.exports = whitelistObject;

function whitelistObject(data, whitelist) {
  let whitelistIncludingIDs = Object.assign({ id: true, uuid: true }, whitelist);

  return Object.keys(whitelistIncludingIDs).reduce((filteredData, attr) => {
    if (whitelist[attr] && typeof data[attr] !== 'undefined') {
      filteredData[attr] = data[attr];
    }

    return filteredData;
  }, {});
}
