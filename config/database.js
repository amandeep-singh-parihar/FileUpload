const mongoose = require("mongoose");
require("dotenv").config();

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
