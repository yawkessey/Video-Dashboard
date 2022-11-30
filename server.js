const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes 
// app.use () ,express.static /demo/index_dev.html checks the folder and searches for the file
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
