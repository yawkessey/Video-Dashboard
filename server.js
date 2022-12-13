//Import express library and create an express app
const express = require("express");
const app = express();

//Imports the PUG Template Engine
const pug = require("pug");

//Import cors library
const cors = require("cors");

// Corss Orign Resource Sharing middleware
app.use(cors());

// View engine setup
app.set("views", "./views");
app.set("view engine", "pug");

// Import Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");

// Session middleware
//Should I leave this here or should I make it global to other code

const session = require("express-session");
const { appendFile } = require("fs");
app.use(
  session({
    secret: "ThisIsSupposedToBeASecret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// Middleware that makes the body of the request available in req.body
// Can use these middleware to get paramaters from the body of post requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db_connection = __dirname + "/data/db.json";
db_schema = {
  users: [],
  videos: [],
};

global.db = require("./data/storage")(db_connection, db_schema);

// Routes
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("layout.pug");
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running 🚀");
});
