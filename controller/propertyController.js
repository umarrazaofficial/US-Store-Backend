const property = require("../schema/propertySchema");

const addProperty = async (req, res) => {
    try {
        let data = new property({
            title: req.body.title,
            paidTo: req.body.paidTo,
            amount: req.body.amount,
        });
        await data.save();
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const getAllProperty = async (req, res) => {
    let data = await property.find();
    res.send(data);
};

// const Getsingleproduct = async (req, res) => {
//     let data = await product.findById(req.params);
//     res.send(data);
// };

const updateProperty = async (req, res) => {
    try {
        let data = await property.updateOne(
            {_id: req.params},
            {
                $set: {
                    title: req.body.title,
                    paidTo: req.body.paidTo,
                    amount: req.body.amount,
                },
            }
        );
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const deleteProperty = async (req, res) => {
    let data = await property.deleteOne(req.params);
    res.send(data);
};

module.exports = {
    addProperty,
    getAllProperty,
    updateProperty,
    deleteProperty,
};
