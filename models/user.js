class User {
  static fetchUserByEmail(email) {
    // Fetch user from database
    let user = db.model.users.find((user) => user.email === email);
    return user;
  }

  static register(credentials) {
    // Check if user exists in our database
    const existing_user = this.fetchUserByEmail(credentials.email);
    // Create new user in our database
    if (!existing_user) {
      db.model.users.push(credentials);
      db.update();
      return credentials;
    } else {
      console.log("User already exists. Log in.");
    }
  }

  static login(credentials) {
    // Check if user exists in our database
    const user = this.fetchUserByEmail(credentials.email);
    console.log("User logging in");
    // Check if password is correct
    if (user && user.password === credentials.password) {
      console.log("Login successful");
    }
    // Create a new session for the user

    // Return the session
  }

  static logout(session) {
    // Destroy the session
  }
}

module.exports = User;
