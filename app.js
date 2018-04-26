const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const User = ('./models/user')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// // index route
// app.get('/', (req, res) =>{
// 	res.send('INDEX');
// });

//weight input route
app.get('/', (req, res) =>{
	res.render('index', {message:'hello World'});
});

// const port = 5000;

// app.listen(port, () =>{
// 	console.log('Server started on port ' + port);
// });

  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })

