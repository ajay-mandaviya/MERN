const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  console.log("AUTH : SIGNUP req : ", req);
  console.log("AUTH : SIGNUP body : ", red.body);

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in db",
      });
    }
    // res.json(user);
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  console.log("AUTH : SIGNIN req : ", req);
  console.log("AUTH : SIGNIN body : ", red.body);

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Email Does not exists",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }
    // token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // token into cookie
    res.cookie("cookie", token, { expire: new Date() + 999 });

    // send  res to fronted
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Sucessfully",
  });
};

// proteced routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middleware

exports.isAuthenticated = (req, res, next) => {
  let cheker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!cheker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not admin",
    });
  }

  next();
}; 
