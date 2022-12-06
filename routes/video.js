const express = require("express");
const router = express.Router();
const Video = require("../models/video");


// Add a new video-share
router.get("/video/new_video", (req, res) => {
    // If session then they can add a video
    // else "You must login to access this account"
});
router.post("/video/new_video", (req, res) => {
    // If session then they can add a video
    // else "You must login to access this account"
});
// Display a video Dashboard accesssible to authenticated users only
router.get("/video/dashboard/:videofilter", (req, res) =>{
    // If session then they can add a video
    // else "You must login to access this account"
})


module.exports = router;
