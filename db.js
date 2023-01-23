const { Client } = require("pg"); // Node PostgreSQL package
const { getDatabaseUri } = require("./config");
require("colors");

const db = new Client({ connectionString: "postgresql://postgres:TSMH60KS9uWfie31IaKt@containers-us-west-125.railway.app:6600/railway" });
//getDatabaseUri()

db.connect((err) => {
	if (err) {
		console.error("connection error".red, err.stack);
	} else {
		console.log("Successfuly connected to postgres db!".blue);
	}
});

module.exports = db;
