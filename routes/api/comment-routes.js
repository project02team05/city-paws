const router = require("express").Router();
const { Comment } = require("../../models");

// add new reivew
router.post("/add", async (req, res) => {
  let review = {
    ...req.body,
    postedBy: req.session.user.id,
  };

  let comment = await Comment.create(review);
  res.status(200).json(comment);
});

module.exports = router;
