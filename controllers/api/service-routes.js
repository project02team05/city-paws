const router = require("express").Router();
const { Service, Comment } = require("../../models");

router.get("/search", (req, res) => {
  let type = req.query.type;
  let location = req.query.location;

  let services = Service.findAll({
    where: {
      type: type,
      postalcode: location,
    },
  });
  let data = [];
  for (const service of services) {
    let comments = Comment.findAll({
      where: {
        serviceid: service.id,
      },
    });

    data.push({ service, comments });
  }

  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  let service = Service.findOne({
    where: {
      id: req.params.id,
    },
  });

  let comments = Comment.findAll({
    where: {
      serviceid: service.id,
    },
  });
  res.status(200).json({ service, comments });
});

router.get("/all", (req, res) => {
  let services = Service.findAll({});
  let data = [];
  for (const service of services) {
    let comments = Comment.findAll({
      where: {
        serviceid: service.id,
      },
    });

    data.push({ service, comments });
  }

  res.status(200).json(data);
});

module.exports = router;