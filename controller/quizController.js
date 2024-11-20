const quizzes = require("../schema/quizSchema");

const addQuiz = async (req, res) => {
    try {
        let data = new quizzes({
            question: req.body.question,
            options: req.body.options,
            correct_option: req.body.correct_option,
        });
        await data.save();
        res.send(data);
    } catch (error) {
        res.status(400).json({error: error?.message || "Something went wrong"});
    }
};
const getQuiz = async (req, res) => {
    try {
        const quiz = await quizzes.aggregate([{$sample: {size: 1}}]);
        if (!quiz.length) {
            return res.status(404).send({message: "Quiz not found"});
        }
        res.send(quiz[0]);
    } catch (error) {
        res.status(500).send({message: "Error fetching quiz", error});
    }
};

// const getAllExpenses = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;
//     try {
//         const totalItems = await expenses.countDocuments({
//             propertyId: {$regex: req.query.propertyId},
//             $or: [
//                 {title: {$regex: req.query.title, $options: "i"}},
//                 {paidTo: {$regex: req.query.title, $options: "i"}},
//                 {amount: {$regex: req.query.title, $options: "i"}},
//             ],
//         });

//         let data = await expenses
//             .find({
//                 propertyId: {$regex: req.query.propertyId},
//                 $or: [
//                     {title: {$regex: req.query.title, $options: "i"}},
//                     {paidTo: {$regex: req.query.title, $options: "i"}},
//                     {amount: {$regex: req.query.title, $options: "i"}},
//                 ],
//             })
//             .skip((page - 1) * pageSize)
//             .limit(pageSize);

//         const totalPages = Math.ceil(totalItems / pageSize);

//         let result = await expenses.aggregate([
//             {$match: {propertyId: {$regex: req.query.propertyId}}},
//             {
//                 $group: {
//                     _id: null,
//                     totalAmount: {$sum: {$toDouble: "$amount"}},
//                 },
//             },
//         ]);

//         const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

//         res.json({
//             currentPage: page,
//             totalPages: totalPages,
//             totalItems: totalItems,
//             totalAmount: totalAmount,
//             data: data,
//         });
//     } catch (error) {
//         res.status(400).json({message: "Something went wrong"});
//     }
// };

// const updateExpense = async (req, res) => {
//     try {
//         let data = await expenses.updateOne(
//             {_id: req.params},
//             {
//                 $set: {
//                     title: req.body.title,
//                     paidTo: req.body.paidTo,
//                     amount: req.body.amount,
//                     propertyId: req.body.propertyId,
//                 },
//             }
//         );
//         res.send(data);
//     } catch (error) {
//         res.status(400).json({error: "Something went wrong"});
//     }
// };

// const deleteExpense = async (req, res) => {
//     let data = await expenses.deleteOne(req.params);
//     res.send(data);
// };

module.exports = {
    addQuiz,
    getQuiz,
    // updateExpense,
    // deleteExpense,
};
