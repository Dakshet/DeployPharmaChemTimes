const mongoose = require("mongoose");

async function handleToDB(url) {
    try {
        // Connect to MongoDB with the given URL
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Use the new connection management engine
            maxPoolSize: 10, // Recommended for serverless environments to manage connections efficiently
        });
        console.log("MongoDB Connection Established Successfully");

    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error; // Throw error so it can be caught in the calling code
    }
}

//Export
module.exports = {
    handleToDB,
}   