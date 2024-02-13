const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.cookies?.jwtToken;

  const SECRET = process.env.SECRET;

  if (!token)
    return res.status(401).json({ message: "Unauthorized! Do login first" });

  jwt.verify(token, SECRET, (err, payload) => {
    if (err)
      return res.status(401).json({ message: "Unauthorized! Do login first" });

    req.user = payload;
    next();
  });
};

module.exports = isAuth;
