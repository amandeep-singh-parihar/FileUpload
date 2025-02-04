// app create
const express = require("express");
const app = express();
require("dotenv").config();

//port
const PORT = process.env.PORT || 4000;

//middle ware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

// db connect
require("./config/database").dbConnect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const Upload = require("./routes/fileUpload.route");
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
    console.log("App is running at PORT : " + PORT);
});
