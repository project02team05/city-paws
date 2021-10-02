// Dependencies
const router = require("express").Router();

const bcrypt = require("bcrypt");
const { User, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let dbUserData = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (
    dbUserData != null &&
    bcrypt.compareSync(req.body.password, dbUserData.password)
  ) {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
    res.redirect("/search");// change to /home
  } else {
    res.redirect("/login?status=failed");
  }
});

// Get User by Id
// router.get("/:id", (req, res) => {
//   User.findOne({
//     attributes: { exclude: ["password"] },
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       {
//         model: Post,
//         attributes: ["id", "title", "post_url", "created_at"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "created_at"],
//         include: {
//           model: Post,
//           attributes: ["title"],
//         },
//       },
//       {
//         model: Post,
//         attributes: ["title"],
//         through: Vote,
//         as: "voted_posts",
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// Post user
router.post("/", (req, res) => {
  // expects Login information
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.redirect("/home");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/signup?status=failed");
    });
});

// // user login
// router.post('/login', (req, res) => {
//   // expects {email: 'testing@gmail.com', password: 'password1234'}
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(dbUserData => {
//     if (!dbUserData) {
//       res.status(400).json({ message: 'No user with that email address!' });
//       return;
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;
  
//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });
// });

// user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// Export the Router
module.exports = router;
