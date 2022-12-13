const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const User = require("./auth");

const redirectLogin = (req, res, next) => {
  if (!req.session.user_email) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.use((req, res, next) => {
  const { user_email } = req.session;
  if (user_email) {
    res.locals.user = db.model.users.find((user) => user.email === user_email);
  }
  next();
});

// Add a new video-share
router.get("/new_video", redirectLogin, (req, res) => {
  res.render("add_video.pug");
});

router.post("/new_video", redirectLogin, (req, res) => {
  Video.addVideo(req.body, res.locals.user);
  res.render("add_video_confirmation.pug");
});

// Display a video Dashboard accesssible to authenticated users only
router.get("/dashboard/:videofilter", redirectLogin, (req, res) => {
  if (req.params.videofilter === "mine") {
    let videos = Video.displayUserVideos(res.locals.user.email);
    res.render("video_dashboard", { videos });
  } else {
    let videos = Video.displayAllVideos();
    res.render("video_dashboard", { videos });
  }
});

router.get("/dashboard", redirectLogin, (req, res) => {
  let videos = Video.displayAllVideos();
  res.render("video_dashboard", { videos });
});

module.exports = router;
