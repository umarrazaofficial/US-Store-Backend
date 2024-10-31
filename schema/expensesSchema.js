const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        paidTo: {
            type: String,
            required: false,
        },
        amount: {
            type: String,
            required: true,
        },
        propertyId: {
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
module.exports = mongoose.model("expenses", expensesSchema);
