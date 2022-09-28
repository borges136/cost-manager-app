const router = require('express').Router();

const { getUsers, addUser, addCostToUser, getUsersExpensesReport } = require('./controllers/usersController');

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

