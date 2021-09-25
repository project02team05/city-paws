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