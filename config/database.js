const mongoose = require("mongoose"); // import the mongoose
require("dotenv").config(); // import the dotenv, by which it loads all the data of .env into the process object

// function for connection to the DB
exports.dbConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB connection Successfull");
        })
        .catch((err) => {
            console.error(err);
            console.log("DB connection failed!!!");
            process.exit(1);
        });
};
