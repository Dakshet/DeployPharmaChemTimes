const { Schema, model } = require("mongoose");

const chemiSchema = new Schema({
    createdUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: false,
    },
    companyName: [
        {
            company: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    timestamps: true,
})

const Chemicals = model("chemicals", chemiSchema);

module.exports = Chemicals;