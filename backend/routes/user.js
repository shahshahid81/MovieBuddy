const router = require('express').Router();
const passport = require('passport');

const User = require('../models/user');
const middleware = require('../middleware/middleware');

router.post('/register', (req,res) => {
  const newUser = {
    username: req.body.email
  };
  const password = req.body.password;
  User.register(newUser, password, (err, user) => {
    if(err) {
      console.log(err);
      res.json({
        status: 'failed',
        message: 'Error while creating user.'
      });
    }
    res.json({
      status: 'success',
      message: 'User Created Sucessfully.'
    });
  });
});

router.post('/login', (req,res,next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.json({
        status: 'failed',
        message: 'Error while logging in.'
      });
    }
    if (!user) {
      return res.json({
        status: 'failed',
        message: 'No User Found.'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json({
          status: 'failed',
          message: 'Password is Incorrect.'
        });
      }
      return res.json({
        status: 'success',
        userID: req.user._id
      });
    });
  })(req, res, next);
});

router.get('/logout',
  (req,res) => {
    req.logout();
    res.json({
      status: 'success',
      message: 'User Logged Out.'
    });
});

router.get('/user/:userid/watchlist',
  middleware.isLoggedIn,
  (req,res) => {
    const userid = req.params.userid;
    User.findById(userid, (err,user) => {
      if(err){
        console.log(err);
        return res.json({
          status: 'failed',
          message: 'An error occured while getting watchlist.'
        });
      }
      res.json({
        status: 'success',
        watchlist: JSON.stringify(user.watchlist)
      });
  });
});

router.get('/user/:userid/watchlist/:movieid',
  middleware.isLoggedIn,
  (req,res) => {
    User.findOne(
      {watchlist: req.params.movieid},
      (err,user) => {
      if(err || !user){
        console.log(err);
        return res.json({
          status: 'failed',
          message: 'An error occured while getting movie data.'
        });
      }
      res.json({
        status: 'success'
      });
    });
});

router.post('/user/:userid/watchlist/:movieid',
  middleware.isLoggedIn,
  (req,res) => {
    const movieid = req.params.movieid;
    User.findByIdAndUpdate(
      req.params.userid,
      {$addToSet: {watchlist:  movieid}},
      { new: true },
      (err,user) => {
        if(err){
          console.log(err);
          return res.json({
            status: 'failed',
            message: 'An error occured while adding movie to watchlist.'
          });
        }
        res.json({
          status: 'success',
          message: 'Movie added to watchlist successfully.'
        });
      }
    );
});

router.delete('/user/:userid/watchlist/:movieid',
  middleware.isLoggedIn,
  (req,res) => {
    const movieid = req.params.movieid;
    User.findByIdAndUpdate(
      req.params.userid,
      { $pull: {watchlist: movieid}},
      { new: true},
      (err,user) => {
        if(err) {
          console.log(err);
          return res.json({
            status: 'failed',
            message: 'Error occured while deleting movie from watchlist.'
          });
        }
        res.json({
          status: 'success',
          message: 'Movie Deleted Successfully.'
        });
      }
    );
});

module.exports = router;
