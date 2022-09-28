const User = require('../models/userModel');
const Cost = require('../models/costModel');
const mongoose = require('mongoose');
// let bodyParser = require('body-parser');
// let jsonParser = bodyParser.json();
const ObjectId = mongoose.Types.ObjectId;



// @desc    Get user
// @access  Private
exports.getUsers = async(req, res, next) => {
    try {
        console.log('Entered here');
        const users = await User.find({}).populate('costs');
        console.log('Arrived here', users);
        return res.json(users);
    } catch (err) {
        console.log(`Error getting users:\n ${err}`);
        res.status(500);
        res.send(err);
    }
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
        console.log('Entered here');
        const userId = req.params.id;
        const month = req.body.month;
        const year = req.body.year;

        // const costs = await Cost.find({
        //     "user": '$userId',
        //     {"$expr": { $eq: [
        //       {{$month: "date"}: 12 }, 
        //       {{$year: "date"}, 2019}
        //         ] } 
        //     } 
        // });


        const costs = await Cost.aggregate([
            { $addFields: { "month": { "$month": "$date" }, "year": {"$year": "$date"}}},
            { $match: 
                { 
                    user: new ObjectId(userId),
                    month: month,
                    year: year,
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
