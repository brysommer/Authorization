const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: [true]
    },
    name: {
        type: Schema.Types.String,
    },
    surname: {
        type: Schema.Types.String,
    },
}, { timestamps: true });

const model = mongoose.model('Users', generalSchema);
module.exports = model;