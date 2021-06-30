require('dotenv').config();
const express = require('express');
const app = express();
const login = require('./routes/login');
const dbConn = require('./services/dbConn');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');   
const signUp = require('./routes/signup');
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan('dev'));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser(process.env.cookieSecret));

app.set('view engine', 'ejs');
app.use('/signup',signUp)
app.use('/login',login);

app.listen(3000);