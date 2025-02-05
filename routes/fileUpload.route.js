const express = require("express"); // import the express
const router = express.Router(); // import the express Router

// import controller
const { localFileUpload } = require("../controllers/fileUploadController");

// api routes (mapping)
router.post("/localFileUpload", localFileUpload);

// export
module.exports = router;
