const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const validateSignupInput = require("../../validate/signup");
const validateLoginpInput = require("../../validate/login");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.loginPost = async (req, res) => {
  const { isValid, errors } = validateLoginpInput(req.body);

  if (!isValid) {
    res.render("login", { errors: Object.values(errors), values: req.body });
    return
  }
  
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
  req.session.userId = user.id
  if(req.session.oldUrl){
    const oldUrl = req.session.oldUrl
    req.session.oldUrl=null
    res.redirect(oldUrl)
  }
  else{
    
  res.redirect('/transactions')
  }
};

module.exports.signup = (req, res) => {
  res.render("signup");
};

module.exports.signupPost = async (req, res) => {
  const { isValid, errors } = validateSignupInput(req.body);

  if (!isValid) {
    res.render("signup", { errors: Object.values(errors), values: req.body });
    return
  }
  
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.render("signup", { errors: ["Email was used!"], values: req.body });
    return;
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash
      });
      newUser
        .save()
        .then(newUser => {
          res.redirect("/auth/login");
        })
        .catch(err => console.log(err));
    });
  });
};

module.exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      res.redirect(
      '/books')
      return
    }
    res.clearCookie('sid')
    res.redirect('/books')
  })
};
