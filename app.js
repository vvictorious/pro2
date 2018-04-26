const express = require('express');
const path = require('path')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index route
app.get('/', (req, res) =>{
	res.send('INDEX');
});

//weight input route
app.get('/user', (req, res) =>{
	res.render('Index', {message:'hello World'});
});

const port = 5000;

app.listen(port, () =>{
	console.log('Server started on port ' + port);
});