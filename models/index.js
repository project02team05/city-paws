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
const User = require('./User');

const Post = require("./Post");
// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// User foreign key
Post.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User,};
