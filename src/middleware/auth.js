const jwt = require("jsonwebtoken");
const user = require("../../db/models/user");

const VeriFyJwt = async (req, res, next) => {
  let idtoken = "";
  if (
    req.headers.authorization &&
    // req.headers.authorization.startsWith("Bearer")
    req.headers.authorization.startsWith("Bearer")
  ) {
    idtoken = req.headers.authorization.split(" ")[1];
  }
  if (!idtoken) {
    res.status(404).json({ message: "user no longer exists" });
  }

  const tokenDetail = jwt.verify(idtoken, process.env.TOKEN);
  const freshuer = await user.findByPk(tokenDetail.id);
  if (!freshuer) {
    return res.status(400).json({ message: "not user found" });
  }
  req.user = freshuer;
  return next();
};

const restriction = (...userType) => {
  const CheckUserPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(
        res.status(404).json("error your not allowed to perform operations")
      );
    }
    return next();
  };
  return CheckUserPermission;
};

module.exports = { VeriFyJwt, restriction };
