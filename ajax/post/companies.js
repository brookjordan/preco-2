module.exports = (req, res, next) => {
  console.log(req);
  res.send({
    data: {
      added: 'person',
    },
  });
};
