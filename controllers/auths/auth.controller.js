const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.render("login", { errors: ["User does not exist"], values: req.body });
    return;
  }
  if (user.wrongLoginCount >= 3) {
    const msg = {
      to: `${user.email}`,
      from: "duonggiahovien@gmail.com",
      subject: "Login Failed",
      text:
        "You fail to enter the correct password 3 times in a row when logging in"
    };
    sgMail.send(msg).then(
      () => {},
      error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    user.wrongLoginCount = user.wrongLoginCount + 1;
    await user.save();

    res.render("login", { errors: ["Wrong password"], values: req.body });
    return;
  }

  user.wrongLoginCount = 0;
  await user.save();
  res.cookie("userId", user.id, {
    signed: true
  });

  if (res.locals.books) {
    res.redirect("/cart");
  } else {
    res.redirect("/transactions");
  }
};
