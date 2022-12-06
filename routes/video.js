const express = require("express");
const router = express.Router();
const Video = require("../models/video");

// Add a new video-share
router.get("/new_video", (req, res) => {
  // If session then they can add a video
  model_view = {
    action_url: "/add_video",
  };
  res.render("add_video.pug");
  // else "You must login to access this account"
});
router.post("/new_video", (req, res) => {
  // If session then they can add a video
  Video.addVideo(req.body);
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
  let videos = Video.displayVideos();
  console.log("Videos in dashboard:", videos)
  res.render("video_dashboard", {videos});
});

module.exports = router;

//     //- <iframe width="389" height="692" src="https://www.youtube.com/embed/aBtKnxy5mDg" title="Stop doing this on airplanes… #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
