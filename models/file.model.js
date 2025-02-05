const mongoose = require("mongoose"); // import the mongoose

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

module.exports = mongoose.model("File", fileSchema);
