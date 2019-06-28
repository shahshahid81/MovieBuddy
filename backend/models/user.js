const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// const WatchListSchema = new Schema({
//   movieId: {
//     type: String,
//     unique: true
//   }
// },{_id : false});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  watchlist: [String]
});

// User.plugin(passportLocalMongoose,{
//   usernameField: 'email'
// });
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
