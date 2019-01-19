const _ = require('lodash');
const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Client } = require('../models/new/createClient');
const  { UserWorkspace } = require('../models/new/userWorkspace');

module.exports = {

    async create(req, res) {
        const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            clientName: req.body.clientName,
            workspace: req.params.workspaceId
        });

        try {
            const avail = await UserWorkspace.findById({ _id: req.params.workspaceId });
            if(avail) {
                const data = await Client.find({ workspace: req.params.workspaceId, clientName: req.body.clientName });
                if (data.length > 0 && data[0].clientName == req.body.clientName) { 
                    return res.status(400).send({
                        message: 'Client exist!'
                    });
                } else {
                    const doc = await client.save();
                    res.send({ doc });
                }
            } else {
                return res.status(400).send({
                    message: 'Workspace does not exist!'
                });
            }
        } catch(e) {
            res.status(400).send(e);
        }
    },

    async get(req, res) {
        try {
            const doc = await Client.find({ workspace: req.params.workspaceId });
            if (doc.length > 0) {
                res.send({ doc });
            } else {
                res.status(404).send({
                    message: 'No clients to display'
                });
            }
        } catch(e) {
            res.status(404).send(e);
        }
    }, 

    async update(req, res) {
        const id = req.params.clientId;
        const body = _.pick(req.body, ['clientName']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        try {
            const client = await Client.findOneAndUpdate({ _id: id, workspace: req.params.workspaceId }, { $set: body }, { new: true });
            if (!client) {
                return res.status(404).send({
                    message: 'Client not found'
                });
            }
            res.send({ client });
        } catch(e) {
            res.status(404).send(e);
        }
    },

    async delete(req, res) {
        const id = req.params.clientId;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        try {
            // const data = await UserWorkspace.findOne({ _id: req.params.workspaceId })
            const client = await Client.findOneAndRemove({ _id: id, workspace: req.params.workspaceId });
            if (!client) {
                return res.status(404).send({
                    message: 'Client not found'
                });
            }
            res.send({ client });
        } catch(e) {
            res.status(404).send(e);
        }
    }
}
