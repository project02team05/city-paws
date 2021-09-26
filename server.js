const express = require("express");
const routes = require('./controllers');
const sequelize = require("./config/connection");
require("dotenv").config();
const path = require("path");
const helpers = require('./utils/helpers');

// set up Handlebars.js as your app's template engine of choice & add helper functions:
const exphbs = require("express-handlebars");
const hbs = exphbs.create({}); // [add 'helpers' in the bracket after]

// set up express-session & sequelize store:
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Ports used
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// use helpers
const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static assets folder
app.use(express.static(path.join(__dirname, "public")));



app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);


// Colin added Allow use by other apps
app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
