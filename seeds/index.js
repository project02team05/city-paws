const seedServices = require("./service-seeds");
const { createTables } = require("../models/index");
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  createTables();
  console.log("\n----- Tables SYNCED -----\n");
  await seedServices();
  console.log("\n----- Services SEEDED -----\n");

  process.exit(0);
};

seedAll();
