const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    },
    password: { 
        type: Schema.Types.String, 
    },
    twitter: {
        type: Schema.Types.Mixed,
    },
    facebook: {
        type: Schema.Types.Mixed,
    }
}, { timestamps: true });

const model = mongoose.model('Strategies', generalSchema);
module.exports = model;