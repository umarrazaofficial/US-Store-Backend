const rating = require("../schema/ratingSchema");

const Addrating = async (req, res) => {
    const data = new rating(req.body);
    await data.save();
    res.send(data);
};
const Getrating = async (req, res) => {
    const data = await rating.find().populate("userId").populate("productId");
    res.send(data);
};

const Getproductrating = async (req, res) => {
    let data = await rating
        .find({
            productId: req.params._id,
        })
        .populate("userId");
    res.send(data);
};

const Deleterating = async (req, res) => {
    let data = await rating.deleteOne(req.params);
    res.send(data);
};

module.exports = {
    Addrating,
    Getrating,
    Getproductrating,
    Deleterating,
};
