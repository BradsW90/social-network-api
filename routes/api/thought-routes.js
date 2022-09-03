const router = require("express").Router();
const {
  getAllThoughts,
  addThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

module.exports = router;
