const fs = require("fs");

let loadDatabase = (db_connection, schema = {}) => {
  console.log("Loading database...");
  if (!fs.existsSync(db_connection)) {
    fs.writeFileSync(db_connection, JSON.stringify(schema));
    console.log("Database created");
  }

  let model = require(db_connection);
    console.log("Database loaded");
  //Create db object
  //Add more functions to db object
    //get and set functions
  let db = {
    model: model,
    filename: db_connection,
    update: () => {
        console.log("Updating database...");
      fs.writeFileSync(db_connection, JSON.stringify(model));
    },
    addCollection: (collection) => {
      model[collection] = [];
    },
  };
  return db;
};

module.exports = loadDatabase;
