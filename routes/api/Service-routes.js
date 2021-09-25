const router = require("express").Router();
const { Service, Comment } = require("../../models");

// The `/api/tags` endpoint

router.get("/search", async (req, res) => {
  let type = req.query.type;
  let location = req.query.location;

  let services = await Service.findAll({
    where: {
      type: type,
      postalcode: location,
    },
  });
  let data = [];
  for (const service of services) {
    let comments = await Comment.findAll({
      where: {
        serviceid: service.id,
      },
    });

    data.push({ service, comments });
  }

  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  let service = await Service.findOne({
    where: {
      id: req.params.id,
    },
  });

  let comments = await Comment.findAll({
    where: {
      serviceid: service.id,
    },
  });
  res.status(200).json({ service, comments });
});

router.get("/all", (req, res) => {
  let services = await Service.findAll({});
  let data = [];
  for (const service of services) {
    let comments = await Comment.findAll({
      where: {
        serviceid: service.id,
      },
    });

    data.push({ service, comments });
  }

  res.status(200).json(data);
});

module.exports = router;
