const cloudinary = require("cloudinary").v2; // importing the cloudinary version 2
require("dotenv").config(); // import the dotenv, by which it loads all the data of .env into the process object

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            // The cloudinary.config() function is used to set up the Cloudinary configuration with authentication credentials.
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    } catch (error) {
        console.log(error);
    }
};
