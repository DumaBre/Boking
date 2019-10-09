const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeadrer = req.get("Authorization");
  if (!authHeadrer) {
    req.isAuth = false;
    return next();
  }
  const token = authHeadrer.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecrettoken");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
