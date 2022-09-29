/* usersController - most of the "heavy lifting" is done here
 * There are 4 possible actions:
 * Listing all users, along with their associated costs
 * Adding a new user
 * Adding a new cost to an existing user
 * Generating a user's costs report by month/ywar
 *
 * For posts requests, validation errors when saving object will trigger a 400 status code in response.
 * An error message containing the validation error will be returned.
 * Other (non-validation) errors will trigger a 500 status code in response.
 *
 * All requests are handled asynchronously
*/

const User = require('../models/userModel');
const Cost = require('../models/costModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; // in order to filter costs by user


// @desc    List all users, along with their associated costs
// @route   GET /users
exports.getUsers = async(req, res, next) => {
    try {
        const users = await User.find({}).populate('costs');
        return res.json(users);
    } catch (err) {
        console.log(`Error getting users:\n ${err}`);
        res.status(500);
        res.send(err);
    }
    // always return a value at the end of async arrow function
    return null;
};


// @desc    Add new user. Fields are passed as JSON in request body
// @route   POST /users
exports.addUser = async(req, res, next) => {
    try {
        // get User params from request body, assign to new User and save
        const newUser = await new User(req.body).save();
        return res.status(200).json(newUser);
    } catch (err) {
        console.log(`Error adding user:\n ${err}`);
        res.status(err.name === 'ValidationError' ? 400 : 500);
        console.log(err.message);
        res.send(err.message);
    }
    // always return a value at the end of async arrow function
    return null;
};

// @desc    Add a new cost item to the existing user. Cost ields are passed as JSON in request body
// @route   POST /users/{userId}/costs
exports.addCostToUser = async(req, res, next) => {
    try {
        const userId = req.params.id; // get User ID from request params
        let newCost = new Cost(req.body); // get Cost params from request body
        newCost.user = userId; // assign the new Cost to User
        await newCost.save(); // save asynchronously
        return res.status(200).json(newCost);
    } catch (err) {
        console.log(`Error adding cost to user:\n ${err}`);
        res.status(err.name === 'ValidationError' ? 400 : 500);
        console.log(err.message);
        res.send(err.message);
    }
    // always return a value at the end of async arrow function
    return null;
};

// @desc    Generate costs report for a User. Filter by month/year (received in request body)
// @route   get /users/{userId}/report
exports.getUsersExpensesReport = async(req, res) => {
    try {
        // get User ID from request param
        const userId = req.params.id;
        // for filtering, retrieve month and year from request body
        const month = req.body.month;
        const year = req.body.year;
        const currentDate = new Date();


        const costs = await Cost.aggregate([
            // add parsed month and year parts from cost date, so we can filter on those
            { $addFields: { month: { $month: '$date' }, year: { $year: '$date' } } },
            { $match:
                {
                    // only fetch costs for the chosen User
                    user: new ObjectId(userId),
                    // filter by month part of Cost date.
                    // when no value passed, use current month (getMonth() returns a zero-based index, so we need to add 1)
                    month: month || currentDate.getMonth() + 1,
                    // filter by year part of Cost date. when no value passed, use current year
                    year: year || currentDate.getFullYear()
                }
            }

        ]);
        res.json(costs);
    } catch (err) {
        console.log(`Error fetching costs report for user\n ${err}`);
        res.status(500);
        res.send(err);
    }
    return null;
};
