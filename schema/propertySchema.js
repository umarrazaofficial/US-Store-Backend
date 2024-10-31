const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
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
module.exports = mongoose.model("property", propertySchema);
