const express = require("express");
const router = express.Router();
const User = require("../models/user");
// TODO: Insert some http request codes (i.e. 401, 200...)
// 201: user created
// Redirects to login if user attempts private route
const redirectLogin = (req, res, next) => {
	if (!req.session.user_email) {
		res.redirect("/auth/login");
	} else {
		next();
	}
};

// Redirects to home if they are already logged in
const redirectHome = (req, res, next) => {
	if (req.session.user_email) {
		console.log("Redirect home", req.session.user_email);
		res.redirect("/video/dashboard");
	} else {
		next();
	}
};

// Login Routes
router.get("/login", redirectHome, (req, res) => {
	res.render("login.pug");
});

router.post("/login", redirectHome, async (req, res) => {
	//TODO: Insert some try/catch
	const user = await User.login(req.body);
	if (user) {
		req.session.user_email = user.email;
		req.session.isAuthenticated = true;
		res.redirect("/video/dashboard");
	} else {
		res.redirect("/auth/login");
	}

	//return res.status(200).json({user})
});

// Register Routes
router.get("/register", redirectHome, (req, res) => {
	res.render("register.pug");
});

router.post("/register", redirectHome, (req, res) => {
	let credentials = User.register(req.body);
	if (credentials) {
		res.render("account_created");
	} else {
		res.redirect("/auth/register");
	}
  // return rest.status(201).json({credentials})
});

// Logout
router.get("/logout", redirectLogin, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send("You are logged out!");
		}
	});
});

module.exports = router;
