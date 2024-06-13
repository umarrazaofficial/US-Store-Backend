const order = require("../schema/orderSchema");

const Addorder = async (req, res) => {
    const data = new order(req.body);
    await data.save();
    res.send(data);
};
const Getorder = async (req, res) => {
    const data = await order.find().populate("products.productId");
    res.send(data);
};
const Getsingleorder = async (req, res) => {
    const data = await order.findById(req.params).populate("products.productId");
    res.send(data);
};
const Getpendingorders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalItems = await order.countDocuments({
            $and: [{status: {$regex: "pending"}}],
        });

        const data = await order
            .find({$and: [{status: {$regex: "pending"}}]})
            .populate("products.productId")
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            data: data,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const Getcompletedorders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalItems = await order.countDocuments({
            $and: [{status: {$regex: "completed"}}],
        });

        const data = await order
            .find({$and: [{status: {$regex: "completed"}}]})
            .populate("products.productId")
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            data: data,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const Completeorder = async (req, res) => {
    const data = await order.updateOne(
        {_id: req.params},
        {
            $set: {status: "completed"},
        }
    );
    res.send(data);
};

module.exports = {
    Addorder,
    Getorder,
    Getsingleorder,
    Getpendingorders,
    Getcompletedorders,
    Completeorder,
};
