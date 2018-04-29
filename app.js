const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//maybe, I should put the mongoose.connect right here


app.get('/', function(req, res){
  res.render('index');
})

// signup route with placeholder response
app.get('/signup', function (req, res) {
  //render takes a relative path to whatever directory we designated as having all the view files.
  res.render('signup');
});


//going to get the data from the signup form, hash it, and store in the database
app.post("/signup", function(req, res){
  User.createSecure(req.body.email, req.body.password, function(err, newUserDocument){
    res.json(newUserDocument)
  })
});

app.get("/profile", function(req, res){
  User.findOne({_id : req.session.userId}, function(err, userDocument){
    res.render('profile', {user : userDocument})
  })
})

app.post("/sessions", function(req, res){
  User.authenticate(req.body.email, req.body.password, function(err, existingUserDocument){
    if (err) console.log("error is " + err)
    req.session.userId = existingUserDocument.id
    res.json(existingUserDocument)
  })
})

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});


  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })