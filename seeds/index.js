// Dependencies
const seedServices = require("./service-seeds");
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedVotes = require('./like-seeds');
const { createTables } = require("../models/index");
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  createTables();
  console.log("\n----- Tables SYNCED -----\n");
  await seedServices();
  console.log("\n----- Services SEEDED -----\n");

  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();
