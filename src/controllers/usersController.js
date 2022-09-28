const User = require('../models/userModel');
const Cost = require('../models/costModel');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();


// @desc    Get user
// @access  Private
exports.getUsers = async(req, res, next) => {
    try {
        console.log('Entered here');
        const users = await User.find({}).populate('costs');
        console.log('Arrived here', users);
        return users;
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400);
            console.log(JSON.stringify(err));
            res.send(err);
        } else {
            console.log(`Error fetching standalone user\n ${err}`);
            res.status(500);
            res.send(err);
        }
    }
    // always return a value at the end of async arrow function
    return null;
};

// exports.getUserById = async(id) => {
//     try {
//         const user = await User.findById(id);
//         return user;
//     } catch (err) {
//         console.log(err);
//     }
//     // always return a value at the end of async arrow function
//     return null;
// };

// @desc    Add user
// @access  Private
exports.addUser = async(req, res, next) => {
    try {
        const newuser = await new User(req.body).save();
        return res.status(200).json(newuser);
    } catch (err) {
        console.log(`Error adding user:\n ${err}`);
        console.log(err);
    }
    // always return a value at the end of async arrow function
    return null;
};

exports.addCostToUser = async(req, res, next) => {
    try {
        const userId = req.params.id;
        let newCost = new Cost(req.body);
        newCost.user_id = userId;
        await newCost.save();
        return res.status(200).json(newcost);
    } catch (err) {
       console.log(`Error adding cost to user:\n ${err}`);
       console.log(err);
   }
   // always return a value at the end of async arrow function
   return null;
};

exports.getUsersExpensesReportByMonth = async(req, res) => {
    try {
        console.log('Entered here');
        const costs = await Cost.aggregate([ {
            $group: {
                _id: {
                    userId: '$user_id',
                    month: {
                        $month: '$date'
                    }
                },
                costs: {
                    $sum: 1
                },
                costsDetails: {
                    $push: {
                        costId: '$_id',
                        costDate: '$date'
                    }
                },
                expenses: {
                    $sum: {
                        $toInt: '$sum'
                    }
                },
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id.userId',
                foreignField: '_id',
                as: 'User'
            }
        },
        {
            $project: {
                User: 1,
                expenses: 1,
                costs: 1,
                costsDetails: 1,
                _id: 0
            }
        }
        ]);

        console.log('Arrived here', costs);
        res.json(costs);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400);
            console.log(JSON.stringify(err));
            res.send(err);
        } else {
            console.log(`Error fetching standalone user\n ${err}`);
            res.status(500);
            res.send(err);
        }
    }
    return null;
};

// exports.getCosts = async(req, res) => {
//     try {
//         console.log('Entered here');
//         const costs = await Cost.find({}).populate('userId');
//         console.log('Arrived here', costs);
//         res.send(costs);
//     } catch (err) {
//         if (err.name === 'ValidationError') {
//             res.status(400);
//             console.log(JSON.stringify(err));
//             res.send(err);
//         } else {
//             console.log(`Error fetching standalone user\n ${err}`);
//             res.status(500);
//             res.send(err);
//         }
//     }
//     return null;
// };
