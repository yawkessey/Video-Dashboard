const { Client } = require("pg"); // Node PostgreSQL package
const { getDatabaseUri } = require("./config");
require("colors");

const db = new Client({ connectionString: getDatabaseUri() });
//getDatabaseUri()

db.connect((err) => {
	if (err) {
		console.error("connection error".red, err.stack);
	} else {
		console.log("Successfuly connected to postgres db!".blue);
	}
});

module.exports = db;
