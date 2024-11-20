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
};
