class Video {
  static extractVideoId(video_url) {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    var match = video_url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  // Add a new video-share accessible to authenticated users only
  static addVideo(video) {
    // If registered user
    let embededLink =
      "https://www.youtube.com/embed/" + this.extractVideoId(video.video_url);
    console.log("embededLink", embededLink);
    db.model.videos.push({ video_url: embededLink });
    db.update();
  }

  static displayVideos() {
    // If registered user
    return db.model.videos;
  }
}

module.exports = Video;
