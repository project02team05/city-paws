// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
const { User, Service } = require(".");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// set up fields and rules for Product model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // rating: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    serviceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Service",
        key: "id",
      },
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

module.exports = Comment;
