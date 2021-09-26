const router = require("express").Router();
const { Comment } = require("../../models");

// Colin added GET all comments
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
  let review = {
    ...req.body,
    postedBy: req.session.user.id,
    post_id: req.body.post_id,
  };

  let comment = await Comment.create(review);
  res.status(200).json(comment);
});

router.delete('/:id', (req, res) => {
  if (req.session) {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});



module.exports = router;
