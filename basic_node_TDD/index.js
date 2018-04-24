const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

const users = [
    {
        "id":1,
        "name":"Chris"
    },
    {
        "id":2,
        "name":"James"
    },
    {
        "id":3,
        "name":"Peter"
    },
    {
        "id":4,
        "name":"Elice"
    }
];


// GET 방식을 통해 모든 user를 조회.
app.get('/user', (req, res) => {
    res.json(users);
});

app.get('/user/:id' , (req,res) => {
    const id = parseInt(req.params.id , 10);
    const result = users.filter(data=> data.id == id)[0];

    if(!result){
        res.status(400).end();
    }else{
        res.status(200).send(result);
    }
});

app.post('/user', (req, res) => {

    res.send(`POST 방식 호출`);
});

app.put('/user', (req, res) => {
    res.send(`PUT 방식 호출`);
});

app.delete('/user', (req, res) => {

    res.send(`DELETE 방식 호출`);
});

app.listen(3000, () => {
    console.log('server start1')
});

module.exports = app;