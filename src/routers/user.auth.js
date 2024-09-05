const express = require("express");
const { SignUp, Loging } = require("../controllers/signup");
const router = express.Router();

router.route("/createuser").post(SignUp);
router.route("/loging").post(Loging);

module.exports = router;
