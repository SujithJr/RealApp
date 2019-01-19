const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName: {
        type: String,
        trim: true,
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Client = mongoose.model('ClientList', clientSchema);

module.exports = { Client };