
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    completedOn: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('todoModel', todoSchema);
