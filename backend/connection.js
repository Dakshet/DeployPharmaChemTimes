const mongoose = require("mongoose");

async function handleToDB(url) {
    try {
        console.log(url);
        return mongoose.connect(url);

    } catch (error) {
        console.log(error.message);
    }
}

//Export
module.exports = {
    handleToDB,
}   