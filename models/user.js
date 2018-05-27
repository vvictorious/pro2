const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


let UserSchema = new Schema({
  email: String,
  passwordDigest: String
}); 



if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MLAB_URL);
} else {
    mongoose.connect('mongodb://localhost/body-journal');
}

UserSchema.statics.createSecure = function (email, password, callback) {
  console.log('create secure function')


  var UserModel = this;

  bcrypt.genSalt(function (err, salt) {
  console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {

      UserModel.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordDigest);
};

UserSchema.statics.authenticate = function (email, password, callback) {
  this.findOne({email: email}, function (err, foundUser) {
    console.log(foundUser);

    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};



let User = mongoose.model('User', UserSchema);
module.exports = User;