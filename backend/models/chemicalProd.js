const { Schema, model } = require("mongoose");

const chemiSchema = new Schema({
    createdUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    companyName: {
        type: String,
        required: false,
    },
    productName: {
        type: [String],
        required: true
    },
    companyLink: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Chemicals = model("chemicals", chemiSchema);

module.exports = Chemicals;