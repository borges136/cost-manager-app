const mongoose = require('mongoose');

/*
 * Creating schema for users
 * Mandatory fields are firstName, lastName, city and age.
 * The user DOESN'T contain references to his costs - that could make the user document extremely large.
 * "The Principle of Least Cardinality states that one-to-many relationships, like author to blog post,
 * should be stored on the "many" side"
 * https://mongoosejs.com/docs/populate.html#populate-virtuals
 * So, only the cost will hold a reference to the user it belongs to.
 * In order to be able to display the user along with his costs, we will add a virtual schema.
 * The virtual schema will allow us to populate the user's costs.
 */

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

// Using virtual schema so we can populate the user's costs
UserSchema.virtual('costs', {
    ref: 'Cost',
    localField: '_id',
    foreignField: 'user'
});

module.exports = mongoose.model('User', UserSchema);
