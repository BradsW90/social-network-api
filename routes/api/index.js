const router = require("express").Router();
const userRoutes = require("./user-routes");

router.use("/Users", userRoutes);

module.exports = router;
