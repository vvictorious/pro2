const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const User = require('./models/user')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
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



//home route================================================
// app.get('/', (req, res) =>{
// 	res.render('index', {message:'hello World'});
// });

// app.post('/login', (req, res) => {
// 	let username = req.body.username;
// 	let enteredPassword = req.body.password;
//===========================================================
	
// signup route with placeholder response
// app.get('/signup', function (req, res) {
//   res.send('signup coming soon');
// });


app.get('/', function (req, res) {
  res.send('Home coming soon');
});
// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});
// signup route (renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/profile', function (req, res) {
  // find the user currently logged in
  User.findOne({_id: req.session.userId}, function (err, currentUser) {
    res.render('profile.ejs', {user: currentUser})
  });
});
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});


app.post('/users', function (req, res) {
  // console.log('request body: ', req.body);
    User.createSecure(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
});

// req.session.userId = user._id;

 app.post('/sessions', function (req, res) {
   // call authenticate function to check if password user entered is correct
   User.authenticate(req.body.email, req.body.password, function (err, user) {
     res.json(user);
   });
 });



  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })