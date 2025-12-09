const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        boardId: {type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true},
        status: {type: String, default: "todo"}
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Task", taskSchema);