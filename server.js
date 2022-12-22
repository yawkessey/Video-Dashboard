const express = require("express"); // Import express library
const app = express(); // create an express app
const pug = require("pug"); // Imports the PUG Template Engine
const cors = require("cors"); // Import cors library
const morgan = require("morgan");
app.use(cors()); // Enables cross-origin resource sharing for all origins
app.use(morgan("tiny")); // Log requrest info

// View engine setup
app.set("views", "./views");
app.set("view engine", "pug");

// Import Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");

// Other imports
const { PORT } = require("./config");

// Session middleware
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

// global.db = require("./data/storage")(db_connection, db_schema);

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
