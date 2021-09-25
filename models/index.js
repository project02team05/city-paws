// import models
const User = require("./User");
const Comment = require("./Comment");
const Service = require("./Service");

const createTables = () => {
  User.sync();
  Comment.sync();
  Service.sync();
};

module.exports = {
  User,
  Comment,
  Service,
  createTables,
};
