const router = require("express").Router();
const {
  addUser,
  getAllUser,
  deleteUserById,
  getUserById,
  updateUserById,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUser).post(addUser);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
