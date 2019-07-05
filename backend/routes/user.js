const router = require('express').Router();
const middleware = require('../middleware/middleware');
const Controller = require('../controller/controller');

router.post('/register', Controller.registerUser);

router.post('/login', Controller.loginUser);

router.get('/logout', Controller.logoutUser);

router.get('/user/:userid/watchlist', middleware.isLoggedIn, Controller.getWatchlist);

router.get('/user/:userid/watchlist/:movieid', middleware.isLoggedIn, Controller.getWatchlistStatus);

router.post('/user/:userid/watchlist/:movieid', middleware.isLoggedIn, Controller.addToWatchlist);

router.delete('/user/:userid/watchlist/:movieid', middleware.isLoggedIn, Controller.removeFromWatchlist);

module.exports = router;
