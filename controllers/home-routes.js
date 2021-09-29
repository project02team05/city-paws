const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
<<<<<<< HEAD
    Service.findAll({
        
      
    })
        .then(dbPostData => {
            const service = dbPostData.map(service => service.get({ plain: true }));

            res.render('home', {
                service,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
=======
    
    res.render("home");

>>>>>>> a330b34b4b7fcb54081dc53c8251996d0ff45733
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;