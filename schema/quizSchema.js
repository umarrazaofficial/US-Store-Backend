const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
        },
        correct_option: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
module.exports = mongoose.model("quizzes", quizSchema);
