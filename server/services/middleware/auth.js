const jwt = require("jsonwebtoken");

const secret = process.env.JWTSECRET;

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
