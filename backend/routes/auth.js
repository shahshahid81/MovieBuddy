const router = require('express').Router();
const passport = require('passport');

const User = require('../models/user');

router.post('/register', (req,res) => {
  const newUser = {
    email: req.body.email
  };
  const password = req.body.password;
  User.register(newUser, password, (err, user) => {
    if(err) {
      console.log(err);
      res.json({
        message: 'failed'
      });
    }
    res.json({
      message: 'success'
    });
  });
});

router.post('/login', (req,res) => {
  res.json({
    message: 'success'
  });
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      console.log(err);
      res.json({
        message: 'failed'
      });
    }
    req.logIn(user, (err) => {
      if(err) {
        console.log(err);
        res.json({
          message: 'failed'
        });
      }
      res.json({
        message: 'success'
      });
    })
  })(req,res,next);
});

module.exports = router;
