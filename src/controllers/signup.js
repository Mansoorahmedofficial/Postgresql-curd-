const user = require("../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN, {
    expiresIn: process.env.EXPIRY,
  });
};

const SignUp = async (req, res, next) => {
  const { firstname, lastname, email, password, confirmpassword, userType } =
    req.body;
  console.log(firstname);
  if (!["1", "2"].includes(userType)) {
    return res.status(404).json({
      status: "fail",
      message: "invalide user type",
    });
  }
  try {
    const AddNewUser = await user.create({
      userType,
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    });
    const result = AddNewUser.toJSON();
    delete result.password;
    delete result.deletedAt;
    result.token = generateToken({
      id: result.id,
    });

    if (!result) {
      return res.status(500).json({
        message: "something went wrong while create a user",
      });
    } else {
      return res.status(200).json({
        message: "created successfully",
        result,
      });
    }
  } catch (error) {
    console.log("someting went wrong while createing user", error);
  }
};
const Loging = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "all fields are required",
    });
  }
  const data = await user.findOne({ where: { email } });
  if (!data) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const isPasswordCorret = await bcrypt.compare(password, data.password);
  console.log(isPasswordCorret);
  if (!isPasswordCorret) {
    return res.status(400).json({
      message: "invliade Email or password",
    });
  }
  const token = generateToken({
    id: data.id,
  });
  return res.status(201).json({
    message: "login successfully",
    token,
  });
};

module.exports = {
  SignUp,
  Loging,
};
