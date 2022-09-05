const router = require("express").Router();
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router
  .route("/:id")
  .get(getThoughtById)
  .post(addThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:id/reactions").post(addReaction);
router.route("/:id/reactions/:reactid").delete(removeReaction);

module.exports = router;
