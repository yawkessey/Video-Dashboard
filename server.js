const express = require("express"); // Import express library
const app = express(); // create an express app
const pug = require("pug"); // Imports the PUG Template Engine
const cors = require("cors"); // Import cors library
const morgan = require("morgan");
const flash = require("express-flash");
const flash = require("express-session");
require("dotenv").config();

app.use(cors()); // Enables cross-origin resource sharing for all origins
app.use(morgan("tiny")); // Log requrest info


const initializePassport = require("./passport-config");
const passport = require("passport");
initializePassport(passport, (email) => users.find((user) => user.email === email));

// View engine setup
app.set("views", "./views");
app.set("view engine", "pug");

// Import Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");

// Other imports
const { PORT } = require("./config");

// Session middleware
const { appendFile } = require("fs");
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 1000 * 60 * 60 },
	})
);
app.use(passport.initialize())
app.use(passport.session())

// Middleware that makes the body of the request available in req.body
// Can use these middleware to get paramaters from the body of post requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
	res.render("layout.pug");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running 🚀 on http://localhost:${PORT}`);
});
