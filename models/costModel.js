const mongoose = require('mongoose');
const CostSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sum: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Cost', CostSchema);
