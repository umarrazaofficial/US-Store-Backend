const user = require("../schema/userSchema");

const Createuser = async (req, res) => {
    const data = new user(req.body);
    await data.save();

    const response = {
        name: data?.name,
        email: data?.email,
        isAdmin: data?.isAdmin,
        _id: data?._id,
    };
    res.send(response);
};

const Getuser = async (req, res) => {
    const data = await user.find();
    res.send(data);
};

const Getsingleuser = async (req, res) => {
    let data = await user.findOne(req.params);
    res.send(data);
};

const Updateuser = async (req, res) => {
    let data = await user.updateOne(
        {_id: req.params},
        {
            $set: req.body,
        }
    );
    res.send(data);
};

const Deleteuser = async (req, res) => {
    let data = await user.deleteOne(req.params);
    res.send(data);
};

module.exports = {Createuser, Getuser, Getsingleuser, Updateuser, Deleteuser};
