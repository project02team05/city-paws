const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

// The `/api/categories` endpoint

router.post("/login", async (req, res) => {
  let user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  console.log(user);
  if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
    req.session.userValidation = true;
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    res
      .status(200)
      .send(JSON.stringify({ code: 0, message: "user log in successfully" }));
  } else {
    res
      .status(403)
      .send(JSON.stringify({ code: -1, message: "Invalid email or password" }));
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
