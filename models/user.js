const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MLAB_URL);
} else {
    mongoose.connect('mongodb://localhost/body-journal');
}

let UserSchema = new Schema({
	email: String,
	passwordDigest: String
}); 


// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our user model, since this function will be called from the model itself
  // store it in variable `UserModel` because `this` changes context in nested callbacks

  var UserModel = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
  console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {

      // create the new user (save to db) with hashed password
      UserModel.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};



let User = mongoose.model('User', UserSchema);
module.exports = User;