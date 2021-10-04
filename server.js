const express = require("express");
const routes = require("./controllers/index");
const sequelize = require("./config/connection");
require("dotenv").config();
const path = require("path");

// set up Handlebars.js as your app's template engine of choice & add helper functions:
const exphbs = require("express-handlebars");

// add hbs helper functions
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({}); // [add 'helpers' in the bracket after]

// set up express-session & sequelize store:
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

// app.get("/home", (req, res) => {
//   res.render("home");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/search", (req, res) => { 
//   res.render("search");
// });

// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static assets folder
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
