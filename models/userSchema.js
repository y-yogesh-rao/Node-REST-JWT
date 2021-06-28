const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/},
    password: {type: String, required: true},
})

module.exports = mongoose.model('user', userSchema);