const db = require("../db");

class Video {
	static extractVideoId(video_url) {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
		var match = video_url.match(regExp);

		return match && match[2].length === 11 ? match[2] : null;
	}

	// Add a new video-share accessible to authenticated users only
	static async addVideo(video, user) {
		let embededLink = "https://www.youtube.com/embed/" + this.extractVideoId(video.video_url);

		const result = await db.query(
			`
			INSERT INTO videos (
				user_id, 
				video_title,
				video_url
			)
			VALUES ($1, $2, $3)
			RETURNING video_title, video_url
			`,
			[user.id, video.video_title, embededLink]
		);

		const new_video = result.rows[0];
		return new_video;
	}

	static async displayAllVideos() {
		const query = `
			SELECT * 
			FROM videos
		`;
		const result = await db.query(query);
		const videos = result.rows;
		return videos;
	}

	static async displayUserVideos(email) {
		const query = `
			SELECT * 
			FROM videos
			WHERE user_id = (
				SELECT id
				FROM users
				WHERE email = $1
			)
		`;
		const result = await db.query(query, [email.toLowerCase()]);

		const userVideos = result.rows;
		return userVideos;
	}
}

module.exports = Video;
