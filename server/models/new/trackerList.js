const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackerListSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    desc: {
        type: String,
        trim: true
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
        default: Date.now() + 10000
    },
    totalTime: {
        type: Number,
        // default: Date.now() + (Date.now() + 2000)
        // default: 50000
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectList',
        required: true
    }
});

const Tracker = mongoose.model('trackerList', trackerListSchema);

module.exports = { Tracker };

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     createdAt: {
//         type: Date,
//         default: new Date()
//     },
//     userName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     // role: {
//     //     type: String,
//     // },
//     // workspace: {
//     //     type: Array,
//     //     ref: 'Workspace',
//     // }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = { User };



// const mongoose = require('mongoose');

// const workspaceSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     createdAt: {
//         type: Date,
//         default: new Date()
//     },
//     workspaceName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1
//     },
//     admin: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     team: {
//         type: Array,
//     }
// });

// const workspace = mongoose.model('Workspace', workspaceSchema);

// module.exports = { workspace };