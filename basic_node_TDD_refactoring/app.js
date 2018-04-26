const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const user = require('./api/user/user');

/* 미들웨어 등록 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/users' , user);



module.exports = app