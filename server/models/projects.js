const mongoose = require('mongoose');

const Project = mongoose.model('Projects', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    client: {
        type: String,
        trim: true
    },
    team: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
    },
    date: {
        type: Date,
    },
});

module.exports = {
    Project
};