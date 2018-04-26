const mongoose = require('mongoose');

if (process.env.NODE_ENV == "production") {
  console.log("connecting to... " + process.env.NODE_ENV)
  console.log("also connecting to mlab  " + process.env.MLAB_URL)
  mongoose.connect(process.env.MLAB_URL)
} else {
  console.log("this is the local ")
  mongoose.connect("mongodb://localhost/body-journal");
}

const Schema = mongoose.Schema;
let UserSchema = new Schema({
	email: String,
	passwordDigest: String
}); 

let User = mongoose.model('User', UserSchema);
module.exports = User;