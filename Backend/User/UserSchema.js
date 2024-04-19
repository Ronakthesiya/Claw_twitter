const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userShortName: {
        type: String
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    loginPassword: {
        type: String
    },
})

module.exports = mongoose.model('User', schema);