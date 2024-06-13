const account = require("../schema/userSchema");

const Login = async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await account.findOne(req.body);
    if (user) {
      res.send(user);
    } else {
      res.send("Invalid Email or Password");
    }
  } else {
    res.send("Invalid Email or Password");
  }
};

module.exports = { Login };
