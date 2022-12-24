const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const User = require("../models/user");

// Middleware function that redirects to Login if they are not loggged in
const redirectLogin = (req, res, next) => {
	if (!req.session.user_email) {
		res.redirect("/auth/login");
	} else {
		next();
	}
};

// Mounts the middleware function at the /video route
// Checks if there's an active user in session and makes email available
// through res.locals.user
router.use(async (req, res, next) => {
	const { user_email } = req.session;
	try {
		if (user_email) {
			res.locals.user = await User.fetchUserByEmail(user_email);
		}
	} catch (error) {
		next(error);
	}
});

// Add a new video-share
router.get("/new_video", redirectLogin, (req, res, next) => {
	try {
		res.render("add_video.pug", { loggedIn: true });
	} catch (error) {
		next(error);
	}
});

router.post("/new_video", redirectLogin, async (req, res, next) => {
	try {
		await Video.addVideo(req.body, res.locals.user);
		res.render("add_video_confirmation.pug", { loggedIn: true });
	} catch (error) {
		next(error);
	}
});

// Display a video Dashboard accesssible to authenticated users only
router.get("/dashboard/:videofilter", redirectLogin, async (req, res, next) => {
	try {
		if (req.params.videofilter === "mine") {
			let videos = await Video.displayUserVideos(res.locals.user.email);
			res.render("video_dashboard", { videos, loggedIn: true });
		} else {
			let videos = await Video.displayAllVideos();
			res.render("video_dashboard", { videos, loggedIn: true });
		}
	} catch (error) {
		next(error);
	}
});

router.get("/dashboard", redirectLogin, async (req, res, next) => {
	try {
		let videos = await Video.displayAllVideos();
		res.render("video_dashboard", { videos, loggedIn: true });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
