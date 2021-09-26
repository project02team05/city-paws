const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    firstName: 'Adam',
    lastName: 'White',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    firstName: 'Carl',
    lastName: 'Smith',
    email: 'high1@sogou.com',
    password: 'password123'
  },
  {
    firstName: 'Sara',
    lastName: 'Lee',
    email: 'theneman2@last.fm',
    password: 'password123'
  },
  {
    firstName: 'John',
    lastName: 'Space',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    firstName: 'Hello',
    lastName: 'World',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    firstName: 'Zoe',
    lastName: 'Johnson',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;