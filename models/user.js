const bcrypt = require("bcrypt"); // Import bcrypt library

// Cost factor that shows how much time is needed to calculate a single BCRYPT hash
// Increasing the factor by 1 doubles the necessary time
// More time necessary, the more difficult it is to brute force
const saltRounds = 10;

const db = require("../db");

class User {
	static async fetchUserByEmail(email) {
		if (!email) {
			//throw a bad request error with a message
		}

		const query = `
			SELECT * 
			FROM users
			WHERE email = $1
		`;

		const result = await db.query(query, [email.toLowerCase()]);

		const user = result.rows[0];

		return user;
	}

	static async register(credentials) {
		const requiredFields = ["name", "email", "password"];
		/*
		requiredFields.forEach(field => {
			if(!credentials.hasOwnProperty(field)) {
				throw new error (`Missing ${field} in requrestbody.')
			}
		})
		*/
		// Check if user exists in our database

		if (credentials.email.indexOf("@") <= 0) {
			// throw new error("Invalid email");
			// TODO: Change to BadRequestError
		}
		const existing_user = await User.fetchUserByEmail(credentials.email);
		// Create new user in our database
		if (!existing_user) {
			credentials.email = credentials.email.toLowerCase();
			credentials.password = await bcrypt.hash(credentials.password, saltRounds);

			const result = await db.query(
				`
				INSERT INTO users (
					name, 
					email, 
					password
				)
				VALUES ($1, $2, $3)
				RETURNING id, email, name
			`,
				[credentials.name, credentials.email, credentials.password]
			);

			const user = result.rows[0];

			return user;
		} else {
			console.log("User already exists. Log in.");
		}
		/*
			if (existingUser) [
				throw new BadRequestError(`Duplicate email: ${credentials.email}`)
			]
		*/
	}

	static async login(credentials) {
		const requiredFields = ["name", "email", "password"];
		/*
		requiredFields.forEach(field => {
			if(!credentials.hasOwnProperty(field)) {
				throw new error (`Missing ${field} in requrestbody.')
			}
		})
		*/
		// Check if user exists in our database
		const user = await User.fetchUserByEmail(credentials.email);
		// Check if password is correct
		if (user) {
			const isAuthorized = await bcrypt.compare(credentials.password, user.password);
			if (isAuthorized) {
				console.log("Login successful");
				return user;
			}
		}
		// throw new UnauthorizedError("Invalid email/password combo")
		// return null;
	}
}

module.exports = User;
