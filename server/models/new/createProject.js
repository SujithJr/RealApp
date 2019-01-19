const mongoose = require('mongoose');
const { createClient } = require('./createClient');

const Schema = mongoose.Schema;

// const durationSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     timeDuration: {
//         type: Number,
//         default: null
//     }
// });

const projectSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: new Date()
    },
    projectName: {
        type: String,
        trim: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientList',
        required: true
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    team: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            minlength: 1,
        },
        role: {
            type: String,
            default: 'User'
        }
    }]
}); 

const Project = mongoose.model('ProjectList', projectSchema);

module.exports = { Project };
