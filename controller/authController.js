const account = require("../schema/userSchema");

const Login = async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await account.findOne(req.body);
        let data = {
            email: user?.email,
            isAdmin: user?.isAdmin,
            name: user?.name,
            _id: user?._id,
        };
        if (user) {
            res.send(data);
        } else {
            res.send("Invalid Email or Password");
        }
    } else {
        res.send("Invalid Email or Password");
    }
};

module.exports = {Login};
