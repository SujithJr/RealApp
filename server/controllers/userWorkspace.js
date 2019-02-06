const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const nodemailer = require('nodemailer');


const { Project } = require('../models/new/createProject');
const { Client } = require('../models/new/createClient');
const { UserWorkspace } = require('../models/new/userWorkspace');

const ObjectId = mongoose.Types.ObjectId;

module.exports = {

    async signup(req, res) {

        try {
            const userExist = await UserWorkspace.find({ email: req.body.email });

            if (userExist.length > 0) {
                return res.status(409).send({ message: 'Mail-Id already exist, please try another' });
            } else {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) {
                        return res.status(500).send({ error: err });
                    } else {
                        const userWork = new UserWorkspace({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            role: 'Admin',
                            workspaceName: req.body.email
                        });
                        
                        const data = await userWork.save();
                        res.status(201).send({ data });
                    }
                });
            }

        } catch (e) {
            console.log(e);
            res.status(500).send({ error: e });
        }
    },

    async login(req, res) {

        try {
            if (!req.body.password.length || req.body.password === undefined) {
                return res.status(400).send({ error: 'Password Required' });
            }

            const user = await UserWorkspace.find({ email: req.body.email });

            if (user.length === 0) {
                return res.status(401).send({ message: 'Auth failed' });
            } else {
                if(!user[0].password) {
                    bcrypt.hash(req.body.password, 10, async (err, hash) => {

                        if (err) {
                            return res.status(500).send({ error: err });
                            
                        } else {
                            const userWork = {
                                password: hash,
                                invite: false
                            };
    
                            const data = await UserWorkspace.findOneAndUpdate(
                                { email: req.body.email }, 
                                { $set: userWork }, 
                                { new: true });
    
                            if (!data) {
                                return res.status(400).send({ error: 'User does not exist' });
                            }
    
                            if (hash) {
                                const token = jwt.sign(
                                    { email: data.email, userId: data._id }, 
                                    process.env.JWT_KEY, 
                                    { expiresIn: '1h' });
                                    
                                return res.status(201).send({ token });
                            }
                        }
                    });
                } else {
                    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                        if (err) {
                            return res.status(401).send({ message: 'Auth failed' });
                        }

                        if (result) {
                            const token = jwt.sign(
                                { email: user[0].email, userId: user[0]._id }, 
                                process.env.JWT_KEY, 
                                { expiresIn: '1h' });
        
                            return res.status(200).send({ token });

                        } else {
                            return res.status(401).send({ message: 'Auth failed' });
                        }
                    });
                }
            } 
        } catch(e) {
            console.log(e);
            res.status(500).send({ error: e });
        }
    },

    async get(req, res) {

        try {
            const workspaceData = await UserWorkspace.find();

            if (workspaceData.length === 0) {
                return res.status(404).send({ message: 'No Workspace Found' });
            }

            res.send({ workspaceData });

        } catch(err) {
            res.status(500).send({ error: err });
        }
    },

    async update(req, res) {
        const ObjectId = mongoose.Types.ObjectId;
        const body = _.pick(req.body, ['email', 'userName', 'role', 'workspaceName']);

        try {
            const doc = await UserWorkspace.findByIdAndUpdate(
                { _id: req.body.userId, 'role': "Admin" }, 
                { $set: body }, { new: true, upsert: true });
            
            if (!doc) {
                return res.status(404).send({ message: 'workspace not found / you are not uthorized' });
            }

            res.send({ doc });

        } catch(err) {
            res.status(500).send({ error: err });
        }
    },

    async delete(req, res) {

        try {
            const doc = await UserWorkspace.findByIdAndDelete({ _id: req.body.userId, 'role': "Admin" });
            
            if (!doc) {
                return res.status(404).send({ message: 'Workspace Not Found' });
            }

            res.send({ doc });

        } catch(err) {
            res.status(500).send({ error: err });
        }
    },

    async invite(req, res) {
        try {

            const user = await UserWorkspace.find({ email: req.body.email });
            
            if (user.length > 0) {
                
                const userExist = await UserWorkspace.findOneAndUpdate(
                    { email: user[0].email, 'otherWorkspace.workspaceId': { $ne: req.params.workspaceId } }, 
                    { $push: { 'otherWorkspace': { workspaceId: req.params.workspaceId } } },
                    { new: true });
                
                const updateTeam = await UserWorkspace.findByIdAndUpdate(
                    { _id: req.params.workspaceId }, 
                    { $push: { 'team': { member: userExist._id } } }, 
                    { new: true });
    
                return res.status(201).send({
                    updateTeam,
                    message: 'Invitation Sent!'
                });

            } else {
                console.log(user);

                const userWork = new UserWorkspace({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    invite: true,
                    role: 'Admin',
                    workspaceName: req.body.email,
                    otherWorkspace: []
                });

                userWork.otherWorkspace.push({
                    workspaceId: req.params.workspaceId
                });

                const data = await userWork.save();

                const updateTeam = await UserWorkspace.findOneAndUpdate(
                    { _id: req.params.workspaceId, 'team.$.member': { $ne: data._id } }, 
                    { $push: { 'team': { member: data._id } } }, 
                    { new: true });


                res.status(201).send({ message: 'Invitation Sent!' });
            }
        } catch (e) {
            res.status(500).send({ error: e });
        }
    }
};