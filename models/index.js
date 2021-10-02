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

//create associations

// Comment.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Comment.belongsTo(Service, {
//   foreignKey: 'service_id'
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id'
// });

// Service.hasMany(Comment, {
//   foreignKey: 'service_id'
// });


module.exports = {
  User,
  Comment,
  Service,
  Post,
  createTables,
};

module.exports = { User, Comment, Service, Post, createTables };
