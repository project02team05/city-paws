// Dependencies
const express = require("express");
// const routes = require("./controllers");
const sequelize = require("./config/connection");

const exphbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/signup", (req, res) => {
  res.render("sign-up");
});

app.listen(3001, () => console.log("Server running on 3001"));
