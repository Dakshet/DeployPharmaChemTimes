const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    month: { type: String, required: true },
    count: { type: Number, default: 0 },
}, {
    timestamps: true,
})

const CountVisit = model("count", commentSchema);

module.exports = CountVisit;