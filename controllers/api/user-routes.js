const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post user (from Colin's)
router.post('/login', (req, res) => {
  // expects Login information
  User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName, 
      email: req.body.email,
      password: req.body.password
  })
      .then(dbUserData => {
          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.user_firstName = dbUserData.firstName;
              req.session.user_lastName = dbUserData.firstName;
              req.session.loggedIn = true;

              res.json(dbUserData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// // user login (from Nerin's)
// router.post("/login", async (req, res) => {
//   let user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });

//   if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
//     req.session.userValidation = true;
//     req.session.user = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     };
//     res
//       .status(200)
//       .send(JSON.stringify({ code: 0, message: "user log in successfully" }));
//   } else {
//     res
//       .status(403)
//       .send(JSON.stringify({ code: -1, message: "Invalid email or password" }));
//   }
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

router.post("/signup", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  res.status(200).send(JSON.stringify({ code: 0, message: "User created" }));
});

module.exports = router;
