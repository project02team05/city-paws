// import the Sequelize constructor from the library
const Sequelize = require("sequelize");
require("dotenv").config();

// Create connection to database & pass in MySQL username/password
let sequelize;


if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_URL,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
    }
  );
}

module.exports = sequelize;
