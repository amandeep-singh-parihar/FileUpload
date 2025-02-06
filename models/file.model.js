const mongoose = require("mongoose"); // import the mongoose
const nodemailer = require("nodemailer"); // import the nodeMailer
const transporter = require("../config/emailCofig");

// define the schema of the file
const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        tags: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);

// Post middleware for sending the email
fileSchema.post("save", async function (doc) {
    /*
    fileSchema.post("save", async function (doc) {...})
    -> This is a Mongoose post middleware function.
    -> "save": The middleware runs after a document is saved to the database.
    -> doc: This refers to the newly created document in the database.
    -> The function is asynchronous (async), allowing await to be used inside it.
    */
    try {
        // Sending email
        let info = await transporter.sendMail({
            from: `PISN`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        /*
        • await transporter.sendMail({...})
        -> Sends an email asynchronously.

        • from: "PISN"
        -> The name or email address that appears as the sender.

        • to: doc.email
        -> The recipient’s email address, which is taken from the saved document (doc).

        • subject: "New File Uploaded on Cloudinary"
        -> The subject line of the email.
        
        • html: "<h2>Hello</h2> <p>File Uploaded View here: <a href='${doc.imageUrl}'>${doc.imageUrl}</a></p>"
        -> The email body in HTML format.
        -> It includes a link to the uploaded file (doc.imageUrl).
         */

        // console.log("INFO : ", info);
    } catch (error) {
        console.error("Error in sending email: ", error);
    }
});

module.exports = mongoose.model("File", fileSchema);
