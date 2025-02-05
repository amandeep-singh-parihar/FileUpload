const File = require("../models/file.model"); // import the model which is used in this controller

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
