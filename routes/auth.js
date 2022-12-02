const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  model_view = {
    action_url: "/login",
  };
  res.render("login.pug");
});

router.get("/register", (req, res) => {
  model_view = {
    action_url: "/register",
  };
  res.render("register.pug");
});

router.post("/register", (req, res) => {
  const { name, email, password} = req.body;
  res.send(
    `Name: ${name} Email: ${email} Password: ${password}`
  )
  let errors = [];
});

module.exports = router;
