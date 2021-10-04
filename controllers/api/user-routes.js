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

// router.post("/login", async (req, res) => {
//   console.log(req.body);
//   let dbUserData = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });

//   console.log("testing login", dbUserData);
//   if (
//     dbUserData != null &&
//     bcrypt.compareSync(req.body.password, dbUserData.password)
//   ) {
//     console.log("we're inside the if loop", dbUserData.dataValues.id);
//     req.session.save(() => {
//       req.session.user_id = dbUserData.dataValues.id;
//       req.session.username = dbUserData.dataValues.username;
//       req.session.loggedIn = true;

//       res.redirect("/search");

//     });

//     res.redirect("/search");// change to /home

//   } else {
//     res.redirect("/login?status=failed");
//   }
// });

router.post('/login', (req, res) => {
  // expects {email: 'testing@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.redirect("/login?status=failed");
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.redirect("/login?status=failed");
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.redirect("/search");
    });
  });
});

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

// user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    console.log(req.session.loggedIn)
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
