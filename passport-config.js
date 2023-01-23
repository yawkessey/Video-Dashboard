const LocalStrategy = require("passport-local");

 function initialize(passport, getUserByEmail) {
	const aunthenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null){
      return done(null,false, {message: 'No user with that email'})
    }

    try {
      if (await bcrypt.compare(passord, user.password)){
        return done(null,user)
      } else {
        return done(null, false, {message: 'Passowrd incorrect'})
      }
    } catch (e) {
      return done(e);
    }
  };
	passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
	passport.serializeUser((user, done) => {});
	passport.deserializeUser((id, done) => {});
}

module.exports = initialize;