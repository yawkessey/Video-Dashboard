class Video {
    // Add a new video-share accessible to authenticated users only
    addVideo(video) {
        // If registered user 
        db.model.videos.push(video);
        db.update();
    }

    displayVideos() {  
        // If registered user
        return db.model.videos;
    }
}

module.exports = Video;