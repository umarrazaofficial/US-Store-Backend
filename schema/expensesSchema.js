const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema({
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
});
module.exports = mongoose.model("expenses", expensesSchema);
