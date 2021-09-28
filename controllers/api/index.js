// ApI endpoints
const router = require("express").Router();

const serviceRoutes = require("./Service-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");

router.use("/services", serviceRoutes);
router.use("/users", userRoutes);
router.use("/reviews", commentRoutes);

// Alert or errors
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
