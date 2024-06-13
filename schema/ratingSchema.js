const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    ratings: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
});
module.exports = mongoose.model("ratings", ratingSchema);
