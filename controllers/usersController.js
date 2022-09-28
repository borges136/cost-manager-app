const User = require('../models/userModel');
const Cost = require('../models/costModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// @desc    Get user
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


// @desc    Add user
exports.addUser = async(req, res, next) => {
    try {
        const newuser = await new User(req.body).save();
        return res.status(200).json(newuser);
    } catch (err) {
        console.log(`Error adding user:\n ${err}`);
        if (err.name === 'ValidationError') {
            res.status(400);
            console.log(JSON.stringify(err));
            res.send(err.message);
        } else {
            console.log(`Error adding user:\n ${err}`);
            res.status(500);
            res.send(err.message);
        }
    }
    // always return a value at the end of async arrow function
    return null;
};

exports.addCostToUser = async(req, res, next) => {
    try {
        const userId = req.params.id;
        let newCost = new Cost(req.body);
        newCost.user = userId;
        await newCost.save();
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

exports.getUsersExpensesReport = async(req, res) => {
    try {
        const userId = req.params.id;
        const month = req.body.month;
        const year = req.body.year;
        const d = new Date();


        const costs = await Cost.aggregate([
            { $addFields: { month: { $month: '$date' }, year: { $year: '$date' } } },
            { $match:
                {
                    user: new ObjectId(userId),
                    month: month || d.getMonth() + 1,
                    year: year || d.getFullYear()
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
