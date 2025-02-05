const express = require("express"); // import express for creating app
const app = express(); // creating express app
require("dotenv").config(); // importing dotenv, which load all the data in the .env to the process object

// Defining the PORT
const PORT = process.env.PORT || 4000;

// Middlerwares
app.use(express.json()); // express middleware
const fileupload = require("express-fileupload"); // express-fileupload middleware for uploading file
app.use(fileupload()); // using the express-fileupload middleware

// Connection to the DB using the dbConnect function
require("./config/database").dbConnect();

// Connection to the cloud
const cloudinary = require("./config/cloudinary"); // importing the cloudinary function form the config folder
cloudinary.cloudinaryConnect(); // function to connect to the cloudinary

// Mounting the api routes
const Upload = require("./routes/fileUpload.route");
app.use("/api/v1/upload", Upload);

// Activate the server
app.listen(PORT, () => {
    console.log("App is running at PORT : " + PORT);
});
