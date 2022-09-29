const router = require('express').Router();

/* Import the 4 possible actions from usersController:

 * List all users, along with their associated costs
 * GET /users

 * Add a new user
 * POST /users

 * Add a new cost to an existing user
 * POST /users/{userId}/costs

 * Generate a user's costs report by month/ywar
 * get /users/{userId}/report
 */

const { getUsers, addUser, addCostToUser, getUsersExpensesReport } = require('./controllers/usersController');


// define the routes

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id/costs')
    .post(addCostToUser);

router
    .route('/:id/report')
    .get(getUsersExpensesReport);

module.exports = router;

