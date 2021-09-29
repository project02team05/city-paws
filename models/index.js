// import models
const User = require("./User");
const Comment = require("./Comment");
const Service = require("./Service");
const Post = require("./Post");

const createTables = () => {
  User.sync();
  Comment.sync();
    Service.sync();
    Post.sync();
};

module.exports = {
  User,
  Comment,
    Service,
  Post,
  createTables,
};

module.exports = { User, Comment, Service, Post, createTables };
