const mongoose = require('mongoose');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { Tracker } = require('../models/new/trackerList');
const { Project } = require('../models/new/createProject');


module.exports = {
  
    async create(req, res) {
        const tracks = new Tracker({
            _id: new mongoose.Types.ObjectId(),
            desc: req.body.desc,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalTime: req.body.totalTime,
            project: req.body.projectId
        });

        try {
            const proj = await Project.findOneAndUpdate({ 
                _id: req.body.projectId 
            }, {
                $inc: {
                    totalDuration: req.body.totalTime
                }
            });
            if (!proj) {
                return res.status(404).send({
                    message: 'Track detail Not Found'
                });
            }

            const data = await tracks.save();
            data.populate({ 
                path: 'project', 
                select: 'projectName totalDuration client', 
                populate: {
                    path: 'client',
                    select: 'clientName -_id'
                }
            }, (err, data) => {
                if (err) {
                    res.status(404).send({ error: err})
                } else {
                    res.send({ data });
                }
            });
        } catch(e) {
            res.status(404).send(e);
        }
    },

    async get(req, res) {
        try {
            const data = await Tracker.find().populate({
                path: 'project',
                select: 'projectName totalDuration client -_id',
                populate: {
                    path: 'client',
                    select: 'clientName -_id'
                }
            }).select('-__v');

            if (data.length > 0) {
                res.send({ data });
            } else {
                res.status(404).send({
                    message: 'No track list of projects to display. Start tracking projects'
                });
            }
        } catch(err) {
            res.status(500).send(err);
        }
    }, 

    async update(req, res) {
        const id = req.params.trackerId;
        const body = _.pick(req.body, ['desc', 'startTime', 'endTime', 'project']);
        try {
            const data = await Tracker.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).populate({
                path: 'project',
                select: 'projectName totalDuration client -_id',
                populate: {
                    path: 'client',
                    select: 'clientName -_id'
                }
            }).select('-__v');
            console.log(data);

            if (!data) {
                res.status(404).send({
                    message: 'Project not found'
                });
            } else {
                res.send({ data });
            }
        } catch(err) {
            res.status(500).send(err);
        }
    },

    async delete(req, res) {
        const id = req.params.trackerId;
        try {
            const data = await Tracker.findOneAndDelete({ _id: id });
            if (!data) {
                res.status(404).send({
                    message: 'Project not found'
                });
            } else {
                res.send({ data });
            }
        } catch(err) {
            res.status(500).send(err);
        }
    },

};