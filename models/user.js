const bcrypt = require("bcrypt"); // Import bcrypt library

// Cost factor that shows how much time is needed to calculate a single BCRYPT hash
// Increasing the factor by 1 doubles the necessary time
// More time necessary, the more difficult it is to brute force
const saltRounds = 10;

const db = require("../db");

class User {
	static fetchUserByEmail(email) {
		// Fetch user from database
		// let user = db.model.users.find((user) => user.email === email);
		return user;
	}

	static async register(credentials) {
		// Check if user exists in our database
		const existing_user = this.fetchUserByEmail(credentials.email);
		// Create new user in our database
		if (!existing_user) {
			credentials.email = credentials.email.toLowerCase();
			credentials.password = await bcrypt.hash(credentials.password, saltRounds);
			// db.model.users.push(credentials);
			// db.update();
			return credentials;
		} else {
			console.log("User already exists. Log in.");
		}
	}

	static async login(credentials) {
		// Check if user exists in our database
		const user = this.fetchUserByEmail(credentials.email);
		// Check if password is correct
		if (user) {
			console.log("Found user:", user);
			const isAuthorized = await bcrypt.compare(credentials.password, user.password);
			if (isAuthorized) {
				console.log("Login successful");
				return user;
			}
		}
		return null;
	}
}

module.exports = User;
