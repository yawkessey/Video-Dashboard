const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const User = require("../models/user");

const redirectLogin = (req, res, next) => {
	if (!req.session.user_email) {
		res.redirect("/auth/login");
	} else {
		next();
	}
};

router.use(async (req, res, next) => {
	const { user_email } = req.session;
	if (user_email) {
		res.locals.user = await User.fetchUserByEmail(user_email);
	}
	next();
});

// Add a new video-share
router.get("/new_video", redirectLogin, (req, res) => {
	res.render("add_video.pug", { loggedIn: true });
});

router.post("/new_video", redirectLogin, (req, res) => {
	Video.addVideo(req.body, res.locals.user);
	res.render("add_video_confirmation.pug", { loggedIn: true });
});

// Display a video Dashboard accesssible to authenticated users only
router.get("/dashboard/:videofilter", redirectLogin, async (req, res) => {
	if (req.params.videofilter === "mine") {
		let videos = await Video.displayUserVideos(res.locals.user.email);
		res.render("video_dashboard", { videos, loggedIn: true });
	} else {
		let videos = await Video.displayAllVideos();
		res.render("video_dashboard", { videos, loggedIn: true });
	}
});

router.get("/dashboard", redirectLogin, async (req, res) => {
	let videos = await Video.displayAllVideos();
	res.render("video_dashboard", { videos, loggedIn: true });
});

module.exports = router;
