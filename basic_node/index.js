const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));
app.get('/' , (req,res) => {
    res.send(`GET 방식 호출`);
});

app.post('/' , (req,res) => {
    res.send(`POST 방식 호출`);
});

app.put('/' , (req,res) => {
    res.send(`PUT 방식 호출`);
});

app.delete('/' , (req,res) => {
    res.send(`DELETE 방식 호출`);
});

app.listen(3000 , ()=>{console.log('server start1')});