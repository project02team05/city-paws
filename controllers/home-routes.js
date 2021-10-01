const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User, Comment } = require('../models');

// get all posts for homepage
router.get('/home', (req, res) => {
    console.log('======================');
    
    res.render("home");

});

// login page 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/search');
        return;
    }

    res.render('login');
});

// signup page 
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/search');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;