const express = require('./express').express
const morgan = require('morgan');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const app = express()
const path = require('path');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
mongoose.set('debug', true)

app.use(morgan('dev'));
connectDB();
app.use(express.json())
app.use("/users", require('./userRoutes').router);

module.exports.app = app;
module.exports.start = function () {
    app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}