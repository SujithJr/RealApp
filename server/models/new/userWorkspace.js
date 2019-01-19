const mongoose = require('mongoose');

// const workspace = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     role: {
//         type: String,
//         trim: true,
//     },
//     workspaceName: {
//         type: String,
//         // required: true,
//         minlength: 1,
//         trim: 1
//     },
//     team: [{
//         member: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Workspace'
//         }
//     }],
// });

const workspaceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: new Date()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    invite: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: function (value) {
            return (this.invite ? false : true);
        }
    },
    otherWorkspace: [{
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
        },
        role: {
            type: String,
            default: 'User'
        }
    }],
    userName: {
        type: String,
        default: function(value) {
            return this.email.split("@")[0];
        },
        required: true,
        trim: true,
        minlength: 1,
    },
    role: {
        type: String,
        trim: true,
    },
    workspaceName: {
        type: String,
        // required: true,
        minlength: 1,
        trim: 1
    },
    team: [{
        _id: false,
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace'
        },
        role: {
            type: String,
            default: 'User'
        }
    }]
});

const UserWorkspace = mongoose.model('Workspace', workspaceSchema);

module.exports = { UserWorkspace };