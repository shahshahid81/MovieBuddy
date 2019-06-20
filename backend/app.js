const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session")

const auth = require('./routes/auth');
const User = require('./models/user');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/MovieBuddy', {useNewUrlParser: true}, () => {
  console.log('mongodb connected');
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',auth);

app.listen(port,() => {
  console.log('Server started on port: ' + port);
});
