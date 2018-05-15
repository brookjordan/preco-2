const PEOPLE = [
  {
    type: 'person',
    id: 1,
    attributes: {
      'full-name': 'Brook Jordan',
      'age': 30,
      'gender': 'male',
    },
  },
  {
    type: 'person',
    id: 2,
    attributes: {
      'full-name': 'Alex Smee',
      'age': 32,
      'gender': 'male',
    },
  },
  {
    type: 'person',
    id: 3,
    attributes: {
      'full-name': 'Sebastien Stettler',
      'age': 26,
      'gender': 'male',
    },
  },
]

module.exports = (req, resp) => {
  if (req.params && req.params.id) {
    let person = PEOPLE.find(person => +person.id === +req.params.id);
    if (person) {
      resp.status(200);
      resp.send({
        data: person,
      });
    } else {
      resp.status(404);
      resp.send({
        errors: [
          {
            title: `No model found with ID "${ req.params.id }"`
          }
        ]
      });
    }
  } else {
    resp.status(200);
    resp.send({
      data: PEOPLE,
    });
  }
};
