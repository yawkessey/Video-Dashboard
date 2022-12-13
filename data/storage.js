const fs = require("fs");

let loadDatabase = (db_connection, schema = {}) => {
  if (!fs.existsSync(db_connection)) {
    fs.writeFileSync(db_connection, JSON.stringify(schema, null, 2));
  }

  let model = require(db_connection);
  //Create db object
  //Add more functions to db object
  //get and set
  let db = {
    model: model,
    filename: db_connection,
    update: () => {
      fs.writeFileSync(db_connection, JSON.stringify(model, null, 2));
    },
    addCollection: (collection) => {
      model[collection] = [];
    },
  };
  return db;
};

module.exports = loadDatabase;
