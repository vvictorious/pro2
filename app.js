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

//list stuff is going to go inbetween the equal lines
//==================================================================================
// let todoList = [
//   "wash the car and change oil",
//   "Buy groceries and make dinner"
// ]


let todoSchema = new mongoose.Schema({
  name: String
});

let Todo = mongoose.model("Todo", todoSchema);



//==================================================================================
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

//todo route
app.get('/journal', function(req, res){
  Todo.find({}, function(err, todoList){
    if(err) console.log(err);
    else{
       res.render('journal', { todoList: todoList })
    }
  })
 
});

//submit button route for journal
app.post('/newtodo', function(req, res){
  console.log('item submitted');
  let newItem = new Todo({
    name: req.body.item
  }) 
  Todo.create(newItem, function(err, Todo){
    if(err)console.log(err);
    else {
      console.log("Inserted item: " + newItem);
    }
  })
  res.redirect('/journal');
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

//catch all other routes
app.get("*", function(req, res){
  res.send("<h1>Invalid Page</h1>");
})


  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })