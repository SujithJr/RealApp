const mongoose = require('mongoose');

const Tracker = mongoose.model('Tracker', {
    title: {
        type: String,
        trim: true
    },
    projClient: {
        type: String,
        trim: true
    },
    startTime: {
        type: String,
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    total: {
        type: String,
        trim: true
    },
    flag: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
    },
    counter: {
        type: String,
        trim: true
    }
});

module.exports = {
    Tracker
};