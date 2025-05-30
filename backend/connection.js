const mongoose = require("mongoose");

async function handleToDB(url) {
    try {
        return mongoose.connect(url);

    } catch (error) {
        console.log(`[connection][handleToDB] Error occured during connect with DB: ${error.message}`);
    }
}

//Export
module.exports = {
    handleToDB,
}   