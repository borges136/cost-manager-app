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
    }
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});
UserSchema.virtual('costs', {
  ref: 'Cost',
  localField: '_id',
  foreignField: 'user'
});

module.exports = mongoose.model('User', UserSchema);
