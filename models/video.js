class Video {
    // Add a new video-share accessible to authenticated users only
    addVideo(video) {
        db.model.videos.push(video);
        db.update();
    }

    displayVideos() {  
        return db.model.videos;
    }
}

module.exports = Video;