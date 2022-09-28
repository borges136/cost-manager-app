const router = require('express').Router();

require('dotenv').config();

const { getUsers, addUser, addCostToUser, getUsersExpensesReportByMonth } = require('./controllers/usersController');

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id/costs')
    .post(addCostToUser);

router
    .route('/:id/getUsersExpensesReportByMonth')
    .get(getUsersExpensesReportByMonth);

module.exports = router;

