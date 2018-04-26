const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


let users = [
    {
        "id": 1,
        "name": "Chris"
    },
    {
        "id": 2,
        "name": "James"
    },
    {
        "id": 3,
        "name": "Peter"
    },
    {
        "id": 4,
        "name": "Elice"
    }
];


// GET 방식을 통해 모든 user를 조회.
app.get('/users', (req, res) => {
    res.json(users);
});


app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    // id값이 numer가 아닐경우 400 Error return
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const result = users.filter(data => data.id == id)[0];
    if (!result) {
        return res.status(404).end();
    } else {
        res.status(200).send(result);
    }
});

app.post('/users', (req, res) => {
    const id = parseInt(req.body.id, 10);
    const name = req.body.name;

    if (!name) {
        return res.status(400).end();
    }

    const found = users.filter(data => data.name === name).length;

    if (found) {
        return res.status(409).end();
    }

    let userData = {id, name};
    users.push(userData);
    res.status(201).json(userData);

});

app.put('/users/:id', (req, res) => {

    const url_id = parseInt(req.params.id, 10);
    if (Number.isNaN(url_id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const id = parseInt(req.body.id, 10);


    const result = users.filter(data => data.id === id).length;
    if (result <= 0) {
        return res.status(404).end();
    }

    const confirmName = users.filter(data => data.name == name).length;
    if (confirmName) return res.status(409).end();

});

app.delete('/users/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).send();
    }

    users = users.filter(data => data.id !== id);
    res.status(204).end();
});

app.listen(3000, () => {
    console.log('server start1')
});

module.exports = app;