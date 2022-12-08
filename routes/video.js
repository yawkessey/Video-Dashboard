const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const User = require("./auth");

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.use((req, res, next) => {
  const { userId } = req.session;
  console.log("User Id:", userId);
  if (userId) {
    res.locals.user = db.model.users.find((user) => user.name === userId);
    console.log("User:", res.locals.user);
  }
  next();
});

// Add a new video-share
router.get("/new_video", redirectLogin, (req, res) => {
  res.render("add_video.pug");
});

router.post("/new_video", redirectLogin, (req, res) => {
  console.log("User id in confirmation page:", res.locals.user);
  Video.addVideo(req.body, res.locals.user);
  res.render("add_video_confirmation.pug");
  console.log("User id in confirmation page:", res.locals.user);
});

// Display a video Dashboard accesssible to authenticated users only
router.get("/dashboard/:videofilter", redirectLogin, (req, res) => {
  // 2 possible routes
  // Logged in user's videos. req.params = mine
  // All videos req.params = all
  if (req.params.videofilter === "mine") {
    let videos = Video.displayUserVideos(res.locals.user.userId);
    console.log("User Videos:", videos);
    // res.render("video_dashboard", { videos});
  } else {
    res.render("video_dashboard");
  }

  let videos = Video.displayAllVideos();
  res.send(videos);
});

router.get("/dashboard", redirectLogin, (req, res) => {
  let videos = Video.displayAllVideos();
  res.render("video_dashboard", { videos });
});

module.exports = router;
