const mongoose = require('mongoose');

/*
 * Creating schema for costs
 * Mandatory fields are description, category and sum. The date field will be set to the current time (when adding a new cose item)
 * A cost will hold a reference to the user it belongs to
 */

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
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Cost', CostSchema);
