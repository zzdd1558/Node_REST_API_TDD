
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

const index = (req, res) => {
    res.json(users);
};

const create =  (req, res) => {
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

};

const show = (req, res) => {
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
};

const update =  (req, res) => {

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

};

const destroy = (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).send();
    }

    users = users.filter(data => data.id !== id);
    res.status(204).end();
};

module.exports = { index , create , show ,update , destroy};