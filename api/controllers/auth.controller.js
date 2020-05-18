const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const errors = ["User does not exist"];
    res.status(404).json(errors);
    return;
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    user.wrongLoginCount = user.wrongLoginCount + 1;
    await user.save();
    const errors = ["Wrong password"];
    res.status(404).json(errors);
    return;
  }

  user.wrongLoginCount = 0;
  await user.save();
  res
    .cookie("userId", user.id, {
      signed: true
    })
    .json({ id: user.id, name: user.name, isAdmin: user.isAdmin });
};
