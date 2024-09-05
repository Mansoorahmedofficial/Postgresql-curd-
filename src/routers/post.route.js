const express = require("express");
const router = express.Router();
const {
  CreateUserProject,
  getAllusers,
  getAllusersByid,
  updateProject,
  DeleteProject,
} = require("../controllers/proj.control");
const { VeriFyJwt, restriction } = require("../middleware/auth");

router
  .route("/createpost")
  .post(VeriFyJwt, restriction("1"), CreateUserProject);
router.route("/getuser").get(getAllusers); // after testing provied all middlewere
router.route("/:id").get(getAllusersByid).patch(VeriFyJwt, updateProject);
router.route("/:id").delete(VeriFyJwt, DeleteProject);

module.exports = router;
