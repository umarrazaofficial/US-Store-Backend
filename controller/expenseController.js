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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const totalItems = await expenses.countDocuments({
            $and: [
                {
                    propertyId: {$regex: req.query.propertyId},
                    title: {$regex: req.query.title, $options: "i"},
                    paidTo: {$regex: req.query.title, $options: "i"},
                },
            ],
        });

        let data = await expenses
            .find({
                propertyId: {$regex: req.query.propertyId},
                $or: [
                    {title: {$regex: req.query.title, $options: "i"}},
                    {paidTo: {$regex: req.query.title, $options: "i"}},
                    {amount: {$regex: req.query.title, $options: "i"}},
                ],
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalPages = Math.ceil(totalItems / pageSize);

        res.json({
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            data: data,
        });
    } catch (error) {
        res.status(400).json({message: "Something went wrong"});
    }
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
