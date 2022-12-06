const express = require("express");
const router = express.Router();
const Video = require("../models/video");

// Add a new video-share
router.get("/new_video", (req, res) => {
  // If session then they can add a video
  // else "You must login to access this account"
});
router.post("/new_video", (req, res) => {
  // If session then they can add a video
  // else "You must login to access this account"
});
// Display a video Dashboard accesssible to authenticated users only
router.get("/dashboard/:videofilter", (req, res) => {
  // If session then they can add a video
  // else "You must login to access this account"
  res.render("video_dashboard");
  let videos = Video.displayVideos();
  res.send(videos);
});
router.get("/dashboard", (req, res) => {
  // If session then they can add a video
  // else "You must login to access this account"
  res.render("video_dashboard");
  let videos = Video.displayVideos();
  res.send(videos);
});

module.exports = router;
