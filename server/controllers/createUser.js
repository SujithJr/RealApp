const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

const { createProject } = require('../models/new/createProject');
const { createClient } = require('../models/new/createClient');
const { createUser } = require('../models/new/createUser');

module.exports = {

    async create(req, res) {
        try {
            const userExist = await createUser.findOne({ email: req.body.email });
            if (userExist) {
                return res.status(409).send({
                    message: 'Mail-Id already exist, please try another'
                });
            } else {
                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            error: err
                        });
                    } else {
                        const user = new createUser({
                            _id: mongoose.Types.ObjectId(),
                            userName: req.body.userName,
                            email: req.body.email,
                            password: hash
                        });
                        
                        const data = await user.save();
                        console.log(JSON.stringify(data, undefined, 2));
                        res.status(201).send({ 
                            message: 'User Created'
                        });
                    }
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: e
            });
        }
    }

};