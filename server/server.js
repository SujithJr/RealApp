const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const http = require('http');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {Client} = require('./models/clients');
const {Project} = require('./models/projects');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// --- API -> Todo --- //

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        // _creator: req.user._id
    });

    try {
        const doc = await todo.save();
        res.send({doc});
    } catch(e) {
        res.status(400).send(e);
    }

});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send({todos});
    } catch(e) {
        res.status(400).send(e);
    }
});

app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const todo = await Todo.findById({_id: id});
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    } catch(e) {
        res.status(400).send(e);
    }
});

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const todo = await Todo.findOneAndRemove({_id: id});
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    } catch(e) {
        res.status(400).send(e);
    }
});

app.patch('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    try {
        const todo = await Todo.findOneAndUpdate({_id: id}, {$set: body}, {new: true});
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    } catch(e) {
        res.status(400).send(e);
    }
});

// --- API -> Clients  --- //

app.post('/clients', async (req, res) => {
    const client = new Client({
        name: req.body.name
    });

    try {
        const doc = await client.save();
        res.send({doc});
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.send({clients});
    } catch(e) {
        res.send(400).send(e);
    }
});

app.delete('/clients/:id', async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    try {
        const client = await Client.findOneAndRemove({_id: id});
        if (!client) {
            res.status(404).send();
        }
        res.send({client});
    } catch(e) {
        res.status(400).send(e);
    }
});

app.patch('/clients/:id', async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const client = await Client.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
        if (!client) {
            return res.status(404).send();
        }
        res.send({client})
    } catch(e) {
        res.status(400).send(e);
    }
});

// --- API -> Add Projects --- //

app.post('/projects', async (req, res) => {
    const proj = new Project({
        name: req.body.name,
        client: req.body.client
    })

    try {
        const doc = await proj.save();
        res.send({doc}); 
    } catch(e) {    
        res.status(400).send(e);
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app}