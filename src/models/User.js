const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: 'String',
    email: 'String',
    password: 'String',
    role: 'String',
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    }]
});

module.exports = mongoose.model('User', UserSchema, 'users');