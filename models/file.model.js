const mongoose = require("mongoose"); // import the mongoose
const nodemailer = require("nodemailer");

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

//post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("doc : ", doc); // jo entry database me create hui usi ko hum yaha doc se refer kr rahe hai

        //transporter -> it should it be in config upder config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `PISN`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        console.log("INFO : ", info);
    } catch (error) {
        console.error(error);
    }
});

module.exports = mongoose.model("File", fileSchema);
