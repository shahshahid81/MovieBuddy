const router = require('express').Router();
const passport = require('passport');

const User = require('../models/user');

router.post('/register', (req,res) => {
  const newUser = {
    username: req.body.email
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

router.post('/login', (req,res,next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.json({message: 'failed'});
    }
    if (!user) {
      return res.json({message: 'failed'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json({message: 'failed'});
      }
      return res.json({
        message: 'success',
        userID: req.user._id
      });
    });
  })(req, res, next);
});

router.get('/logout', (req,res) => {
  req.logout();
  res.json({
    message: 'success'
  });
});

router.post('/user/:userid/watchlist/:movieid', (req,res) => {
  const movieid = req.params.movieid;
  User.findByIdAndUpdate(
    req.params.userid,
    {$addToSet: {watchlist:  movieid}},
    { new: true },
    (err,user) => {
      if(err){
        console.log(err);
        return res.json({
          message: 'failed'
        });
      }
      res.json({
        message: 'success'
      });
    }
  );
});

module.exports = router;
