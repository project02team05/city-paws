// import all models
const User = require("./User");
const Comment = require("./Comment");
const Service = require("./Service");

const createTables = () => {
  User.sync();
  Comment.sync();
  Service.sync();
};

// create associations
// // --> Is Post needed on our site?
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

// Post.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User / Comment / Service Associations
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Service, {
    foreignKey: 'service_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Service.hasMany(Comment, {
    foreignKey: 'service_id'
});

module.exports = {
    User,
    Comment,
    Service,
    createTables
  };