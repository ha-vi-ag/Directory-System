const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const Users = require("../models/user");

const doLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email, password });

  if (!user) return res.status(401).json({ message: "Wrong credentials" });

  const SECRET = process.env.SECRET;

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET);

  res.cookie("jwtToken", token, { httpOnly: true, secure: true });

  return res.sendStatus(200);
};

const doSignup = async (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) return res.status(422).json({ errors: errors[0].msg });

  const { name, email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user) return res.status(422).json({ message: "Email already exists" });

  await Users.create({ name, email, password });

  return res.sendStatus(201);
};

const doLogout = async (req, res, next) => {};

module.exports = {
  doLogin,
  doSignup,
  doLogout,
};
