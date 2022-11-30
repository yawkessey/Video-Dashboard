//Import express library and create an express app
const express = require("express");
const app = express();

// Import Routes
const videoRoutes = require("./routes/video");
const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
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
