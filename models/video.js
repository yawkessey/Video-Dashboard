const db = require("../db");

class Video {
	static extractVideoId(video_url) {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
		var match = video_url.match(regExp);

		return match && match[2].length === 11 ? match[2] : null;
	}

	// Add a new video-share accessible to authenticated users only
	static addVideo(video, user) {
		// If registered user
		let embededLink = "https://www.youtube.com/embed/" + this.extractVideoId(video.video_url);
		db.model.videos.push({
			user_email: user.email,
			video_title: video.video_title,
			video_url: embededLink,
		});
		db.update();
	}

	static displayAllVideos() {
		// If registered user
		return db.model.videos;
	}

	static displayUserVideos(email) {
		return db.model.videos.filter((video) => video.user_email === email);
	}
}

module.exports = Video;
