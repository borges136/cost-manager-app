const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');
const userRouter = require('./userRoutes');

app.use(morgan('dev'));
connectDB();

app.use(express.json());

app.use('/users', userRouter);
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));