const mongoose = require('mongoose');

const Client = mongoose.model('Clients', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = {
    Client
};