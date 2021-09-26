const router = require('express').Router();
const sequelize = require('../config/connection');
const { Service, User, Comment } = require('../models');

//get all service for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Service.findAll({
    attributes: [
      'id',
      'name',
      'address',
      'postalcode',
      'description'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'service_id', 'user_id', 'postedAt'],
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        }
      },
      {
        model: User,
        attributes: ['firstName', 'lastName']
      }
    ]
  })
    .then(dbPostData => {
      const service = dbPostData.map(service => service.get({ plain: true }));

      res.render('homepage', {
        service,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login page 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup page 
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// get single service by id 
router.get('/service/:id', (req, res) => {
  Service.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'address',
      'postalcode',
      'description'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'service_id', 'user_id', 'postedAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No service found with this id' });
        return;
      }
      // serialize the data
      const service = dbPostData.get({ plain: true });
      console.log(req.session.loggedIn);
      // pass data to template
      res.render('single-service', {
        service,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
