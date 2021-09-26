const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add comment
router.post('/add', withAuth, async (req, res) => {
  let review = {
    ...req.body,
    postedBy: req.session.user.id,
  };

  let comment = await Comment.create(review);
  res.status(200).json(comment);
});

module.exports = router;
