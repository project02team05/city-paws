const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use("/home", (req, res) => {
  res.send("<h1>Welcome Home!</h1>");
});

module.exports = router;
