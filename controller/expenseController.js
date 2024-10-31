const expenses = require("../schema/expensesSchema");

const addExpense = async (req, res) => {
    try {
        let data = new expenses({
            title: req.body.title,
            paidTo: req.body.paidTo,
            amount: req.body.amount,
            propertyId: req.body.propertyId,
        });
        await data.save();
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const getAllExpenses = async (req, res) => {
    let data = await expenses.find({$and: [{propertyId: {$regex: req.query.propertyId}}]});
    res.send(data);
};

// const Getsingleproduct = async (req, res) => {
//     let data = await product.findById(req.params);
//     res.send(data);
// };

const updateExpense = async (req, res) => {
    try {
        let data = await expenses.updateOne(
            {_id: req.params},
            {
                $set: {
                    title: req.body.title,
                    paidTo: req.body.paidTo,
                    amount: req.body.amount,
                    propertyId: req.body.propertyId,
                },
            }
        );
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const deleteExpense = async (req, res) => {
    let data = await expenses.deleteOne(req.params);
    res.send(data);
};

module.exports = {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
};
