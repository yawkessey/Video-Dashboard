const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Session middleware
//Should I leave this here or should I make it global to other code

const session = require("express-session");
router.use(
  session({
    secret: "ThisIsSupposedToBeASecret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

// Login Routes
router.get("/login", (req, res) => {
  model_view = {
    action_url: "/login",
  };
  res.render("login.pug");
});

router.post("/login", (req, res) => {
  User.login(req.body);
});

// Register Routes
router.get("/register", (req, res) => {
  model_view = {
    action_url: "/register",
  };
  res.render("register.pug");
});

router.post("/register", (req, res) => {
  let credentials = User.register(req.body);
  if (credentials) {
    res.render("account_created");
  } else {
    // ERROR HANDLING
  }
});

// Logout
router.get("/logout", (req, res) => {
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
