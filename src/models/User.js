const mongoose = require('mongoose');

const User = mongoose.model('Userdata', {
    username: String,
    password: String
});


module.exports = User;