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
//         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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

// const createUser = mongoose.model('User', userSchema);

// module.exports = { createUser };