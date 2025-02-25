const { Schema, model } = require("mongoose");

const subscribeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus: {
        type: String,
        enum: ["NO", "PAY"],
        default: "NO"
    }
}, {
    timestamps: true
})

const Subscribe = model("subscribe", subscribeSchema);

module.exports = Subscribe;