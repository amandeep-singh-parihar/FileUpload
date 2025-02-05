const express = require("express"); // import the express
const router = express.Router(); // import the express Router

// Import all the controllers
const {
    localFileUpload,
    imageUpload,
    videoUpload,
    imageSizeReducer,
} = require("../controllers/fileUploadController");

// api routes (mapping)
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

// export
module.exports = router;
