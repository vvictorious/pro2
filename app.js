const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const User = require('./models/user')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));

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

// login route with placeholder response
app.get('/login', function (req, res) {
  res.send('login coming soon');
});
// signup route (renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup');
});
app.post('/users', function (req, res) {
  console.log('request body: ', req.body);
    db.User.createSecure(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
});



  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })