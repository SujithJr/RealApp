const mongoose = require('mongoose');
const _ = require('lodash');
const { ObjectID } = require('mongodb');


const { Project } = require('../models/new/createProject');
const { Client } = require('../models/new/createClient');
const { UserWorkspace } = require('../models/new/userWorkspace');

module.exports = {

    async createProject(req, res) {
        const info = _.pick(req.body, ['clientId', 'projectName']);
        const project = new Project({
            _id: new mongoose.Types.ObjectId(),
            projectName: req.body.projectName,
            client: req.body.clientId,
            totalDuration: req.body.totalDuration,
            workspace: req.params.workspaceId,
        });

        project.team.push({ member: req.body.userId, role: 'Boss' });

        try {
            const avail = await Project.find({ client: info.clientId, workspace: req.params.workspaceId, projectName: info.projectName });
            if(avail.length > 0) {
                console.log(JSON.stringify(avail, undefined, 2));
                return res.status(400).send({
                    message: 'Project under same Client exist!'
                });
            } else {
                const data = await Client.findById(req.body.clientId);
                if (!data) {
                    return res.status(404).send({
                        message: 'Client does not exist.'
                    });
                } else {
                    const doc = await project.save();
                    res.status(200).send({
                        doc
                    });
                }
            }
        } catch(e) {
            res.status(400).send(e);
        }
    },

    async fetchAllProject(req, res) {
        try {
            // const data = await Project.aggregate([
            //     { $match: { $and: [{ _id: ObjectId(req.body.projectId) }, { 'team.member': "Admin" }, { 'workspace._id': ObjectId(req.params.workspaceId) }] }}
            // ]);
            // const doc = await Project.find({ workspace: req.params.workspaceId }).populate({
            //     path: 'manager.user',
            //     select: '-createdAt -workspace -password',
            // });
            const doc = await Project.find({ workspace: req.params.workspaceId });

            if (doc.length > 0) {
                res.send({ doc });
            } else {
                res.status(404).send({
                    message: 'No projects to display'
                });
            }
        } catch(e) {
            res.status(404).send(e);
        }
    }, 

    async updateProject(req, res) {
        const id = req.params.projectId;
        const body = _.pick(req.body, ['projectName', 'client']);
        // const updates = {};
        // _.forOwn(body, function (value, key) {
        //     updates[key] = value;
        // });

        // console.log(JSON.stringify(updates, undefined, 2));

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        try {
            const project = await Project.findOneAndUpdate({ _id: id, workspace: req.params.workspaceId}, { $set: body }, { new: true, upsert: true });
            console.log(project);
            if (!project) {
                return res.status(404).send({
                    message: 'Project not found'
                });
            }
            res.send({ project });
        } catch(e) {
            res.status(404).send(e);
        }
    },

    async addMember(req, res) {
        const id = req.params.projectId;
        const body = _.pick(req.body, ['team']);

        if (!ObjectID.isValid(id)) {
            return res.status(400).send();
        }

        try {
            console.log('STARTED');
            Project.findOneAndUpdate(
                { _id: id, workspace: req.params.workspaceId, 'team.member': { $ne: body.team.member  } }, 
                { $push: { team: body.team } }, { "new": true, "upsert": true }, 
                function(err, data) {
                    if (err) {
                        return res.status(400).send({
                            message: 'Member already added!'
                        });
                    } else {
                        res.send({ data });
                    }
                });
        } catch(e) {
            res.status(404).send(e);
        }
    },

    async deleteProject(req, res) {
        const id = req.params.projectId;

        if (!ObjectID.isValid(id)) {
            return res.status(400).send();
        }
        console.log(req.body)
        try {
            const project = await Project.findOneAndRemove({ _id: id, team: { $elemMatch: { member: req.body.userId, role: 'Boss' } } });
            if (!project) {
                return res.status(404).send({
                    message: 'Project not found or You are not authorized.'
                });
            }
            res.send({ project });
        } catch(e) {
            res.status(404).send(e);
        }
    },

    async fetchSingleProject(req, res) {
        const id = req.params.projectId;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
        
        try {
            const project = await Project.findById({ workspace: req.params.workspaceId, _id: id }).populate('team.member', 'email userName invite');
            if (!project) {
                res.status(404).send();
            }

            // if (project)
            res.send({ project });
        } catch(e) {
            res.status(404).send(e);
        }

    }
}
