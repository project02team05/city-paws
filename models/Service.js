const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Service extends Model {
  bulkCreate(data) {
    data.forEach(function (service) {
      Service.create(service);
    });
  }
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "service",
  }
);

module.exports = Service;
