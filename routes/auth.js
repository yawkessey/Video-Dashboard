const express = require("express");
const router = express.Router();
const User = require("../models/user");
// TODO: Insert some http request codes (i.e. 401, 200...)
// 201: user created
// Redirects to login if user attempts private route

// TODO: Rearrange routes
// Middleware function that redirects to Login if they are not loggged in
const redirectLogin = (req, res, next) => {
	if (!req.session.user_email) {
		res.redirect("/auth/login");
		// Might return am UnauthorizedError
	} else {
		next();
	}
};

// Middleware function that redirects to home if they are already logged in
const redirectHome = (req, res, next) => {
	if (req.session.user_email) {
		console.log("Redirect home", req.session.user_email);
		res.redirect("/video/dashboard");
	} else {
		next();
	}
};

// Login Routes
router.get("/login", redirectHome, (req, res, next) => {
	try {
		res.render("login.pug");
	} catch (error) {
		res.status(400).send(error);
		next(error);
	}
});

router.post("/login", redirectHome, async (req, res, next) => {
	try {
		const user = await User.login(req.body);
		if (user) {
			req.session.user_email = user.email;
			req.session.isAuthenticated = true;
			res.redirect("/video/dashboard");
			return res.status(200);
		}
		//might not use redirect and catch error to display the message
		else {
			res.redirect("/auth/login");
		}
	} catch (error) {
		next(error);
	}
});

// Register Routes
router.get("/register", redirectHome, (req, res, next) => {
	try {
		res.render("register.pug");
		return res.status(200);
	} catch (error) {
		next(error);
	}
});

router.post("/register", redirectHome, async (req, res, next) => {
	try {
		const credentials = await User.register(req.body);
		if (credentials) {
			res.render("account_created");
			return res.status(201);
		}
		//might not use redirect and catch error to display the message
		else {
			res.redirect("/auth/register");
		}
	} catch (error) {}
});

// Logout
router.get("/logout", redirectLogin, (req, res, next) => {
	try {
		req.session.destroy();
		return res.status(200);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
