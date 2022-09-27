const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    costs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cost' }]
});

module.exports = mongoose.model('User', UserSchema);