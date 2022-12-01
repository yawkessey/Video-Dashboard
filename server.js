//Import express library and create an express app
const express = require("express");
const app = express();

//Import cors library
const cors = require("cors");

// cors middleware
app.use(cors());

// Import Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");

db_connection = __dirname + "/data/db.json";
db_schema = {
  users: [],
  videos: [],
};

global.db = require("./data/storage")(db_connection, db_schema);
console.log("database", db);
app.get("/who", (req, res) => {
  newvideo = {
    title: "New Video",
    description: "This is a new video",
    url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
  };
  db.model.videos.push(newvideo);
  db.update();
  console.log("db", db.model.videos);
  console.log("updated database");
  res.send("Main route is working");
});

// Routes
app.use("/video", videoRoutes);
app.use("/auth", authRoutes);

// app.use () ,express.static /demo/index_dev.html checks the folder and searches for the file

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running 🚀");
});
