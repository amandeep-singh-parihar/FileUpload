const File = require("../models/file.model"); // import the model which is used in this controller
const cloudinary = require("cloudinary").v2; // import the cloudinary

// localFileUpload -> handler function :- client k ek path se media fetch krta hai and uss media ko server k ek path pe upload kr deta hai
exports.localFileUpload = async (req, res) => {
    try {
        // fetch file
        const file = req.files.file;
        /* 
        syntax-> const variableName = object.property.subProperty;
        req.files → Represents the files uploaded in the request (req is the request object in an Express.js app using middleware like express-fileupload or multer).

        When a user uploads a file in an HTTP request (e.g., via a form), the uploaded files are stored in req.files (if express-fileupload is used) or req.file / req.files (if multer is used).

        req.files.file extracts the uploaded file object by referencing the specific file key (file).

        the file on the RHS here is the name of the key in which I send the file it can be any name like if I
        send the key as cat then i have to use <const file = req.files.cat> here
        */
        console.log("file aagyi bhai", file); // Just for what inside the file

        let path =
            __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        /*
            1] __dirname → Gives the absolute path of the current directory.
            2] "/files/" → Specifies the subdirectory where the file will be saved.
            3] Date.now() → Generates a unique timestamp to prevent filename conflicts.
            4] `.${file.name.split(".")[1]}` → Extracts the file extension (e.g., .jpg, .png).
            5] file.name.split(".") → Splits the filename at the dot (.).
            6] [1] → Gets the extension (e.g., "jpeg" from "download.jpeg").

            If file.name is "download.jpeg", the path could be:
                
            /path/to/project/files/1707154325678.jpeg
        */
        console.log("PATH -> ", path); // Just for what the path is

        file.mv(path, (err) => {
            console.log(err);
        });
        /*
        file.mv() is a method provided by the express-fileupload package in Node.js. It moves (saves) the uploaded file to the specified path

        syntax <file.mv(destinationPath, callback)>;

        file → The uploaded file object from req.files.<key>.

        destinationPath → The location where the file will be saved.

        callback(err) → A function that handles errors (if any occur during file movement).
        */
        res.json({
            success: true,
            message: "Local File Uploaded Successfully",
        });
    } catch (error) {
        console.log("Not able to upload the file on server");
        console.log(error);
    }
};

// Below is the function which check that the file type is supported type or not
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Below is the function which upload the file to the cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    /* 
    file: The file object to be uploaded.
    folder: The target folder in Cloudinary.
    quality: (Optional) The quality setting for the file.
    */
    const options = {
        folder,
    }; /*  Declares a constant variable named options. The options object helps organize various settings
     related to the upload, making it easier to pass them as a single argument to Cloudinary.*/

    // console.log("temp file path", file.tempFilePath);

    if (quality) {
        /*
         If the quality parameter is provided, it adds the quality setting to the options object.
         The quality parameter allows you to control the level of compression applied to the file. It’s optional, and only added if the user specifies it.
        */
        options.quality = quality;
    }
    options.resource_type = "auto"; // Sets the resource_type to "auto", which allows Cloudinary to automatically detect the file type (image, video, etc.).
    return await cloudinary.uploader.upload(file.tempFilePath, options); /* file.tempFilePath is the temporary storage
    path of a file on the server.
    1-> cloudinary: This is the Cloudinary library you're using in your Node.js project.
    2-> .uploader.upload(): This is a method provided by Cloudinary that uploads a file.
    3-> This is the file's temporary path on your server. It tells Cloudinary where the file is stored on your system.

    options -> This is an object that contains extra settings for the upload.
     */
}

// Image upload handler -> This will upload the image on the cloudinary and in the DB 
exports.imageUpload = async (req, res) => {
    try {
        // fetching name, tags, email from the request body
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);

        // fetching the image file from the form data on postman and save the it inside imageFile variable
        const file = req.files.imageFile;
        // console.log(file);

        // validation that the image must have out of these three extension
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase(); // eg hello.jpg -> jpg

        // If the file is not of the supported types send the response as below
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported !",
            });
        }

        // If the file format is supported
        const response = await uploadFileToCloudinary(file, "amandeep");
        //    variable         userdefined function (aboveOne,"folder_name")
        // console.log(response);

        // Save the entry in the Database, the fields inside are those as we create the schema
        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email,
        });
        // here secure_url -> is what I get in the response

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded",
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Video upload handler -> This will upload the video on the cloudinary and on the DB
exports.videoUpload = async (req, res) => {
    try {
        // fetching name, tags, email from the reqeuest body
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);

        // fetching the video file from the from the form data on postman and save the it inside videoFile variable
        const file = req.files.videoFile;

        // validation that the video must have out of these three extension
        const supportedTypes = ["mp4", "mov", "gif"];
        const fileType = file.name.split(".")[1].toLowerCase(); // eg. hello.mp4 -> mp4

        // add a upper limit of 5 mb for video -> incomplete
        // If the file format not supported, send the response
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported !",
            });
        }

        // If the file format supported
        // console.log("uploading to media");
        const response = await uploadFileToCloudinary(file, "amandeep");
        //    variable         userdefined function (aboveOne,"folder_name")
        // console.log(response);

        // Save the entry in the Database, the fields inside are those as we create the schema
        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email,
        });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "video Successfully Uploaded",
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// Image Size Reducer -> This reduces the size of the image
exports.imageSizeReducer = async (req, res) => {
    try {
        // fetching name, tags, email from the reqeuest body
        const { name, tags, email } = req.body;
        // console.log(name, tags, email);

        // fetching the image file from the from the form data on postman and save the it inside imageFile variable
        const file = req.files.imageFile;
        // console.log(file);

        // validation that the video must have out of these three extension
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase(); // eg. hello.png -> png

        // If the file format not supported, send the response
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported !",
            });
        }

        // If the file format supported
        // console.log("uploading to media");
        const response = await uploadFileToCloudinary(file, "amandeep", 50);
        //    variable         userdefined function (aboveOne,"folder_name")
        // console.log(response);

        // Save the entry in the Database, the fields inside are those as we create the schema
        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email,
        });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded",
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
