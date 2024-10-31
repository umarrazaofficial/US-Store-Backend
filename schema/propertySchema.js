const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        area: {
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
module.exports = mongoose.model("property", propertySchema);
