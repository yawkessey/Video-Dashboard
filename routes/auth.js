const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Video = require("../models/video");

//Access user in other routes
// const { user } = res.locals
// Checks if the user is authenticated
// When trying to access a private route
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

// Redirects to home if they are already logged in
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    console.log("Redirect home", req.session.userId);
    res.redirect("/video/dashboard");
  } else {
    console.log("User is not authenticated");
    next();
  }
};

// Login Routes
router.get("/login", redirectHome, (req, res) => {
  res.render("login.pug");
});

router.post("/login", redirectHome, (req, res) => {
  const user = User.login(req.body);
  if (user) {
    req.session.userId = user.name;
    req.session.isAuthenticated = true;
    res.redirect("/video/dashboard");
  } else {
    res.redirect("/auth/login");
  }
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
    // ERROR HANDLING
  }
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
