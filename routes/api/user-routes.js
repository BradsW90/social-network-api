const router = require("express").Router();
const {
  addUser,
  getAllUser,
  deleteUserById,
  getUserById,
  updateUserById,
  addFriendToUser,
  removeFriendFromUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUser).post(addUser);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router
  .route("/:id/friend/:friendId")
  .post(addFriendToUser)
  .delete(removeFriendFromUser);

module.exports = router;
