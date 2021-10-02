const router = require("express").Router();
const { Comment } = require("../../models");

router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add new reivew
router.post("/add", async (req, res) => {
  console.log("testing", req.session);
  let review = {
    ...req.body,
    postedBy: req.session.user_id,
  };

  console.log("we're inside add new comment route", review);
  let comment = await Comment.create(review);
  res.status(200).json(comment);
});

module.exports = router;
