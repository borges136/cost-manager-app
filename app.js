// include required libraries
const express = require('express'); // express framework to run the app
const morgan = require('morgan'); // provides request logging to the console
const dotenv = require('dotenv'); // adds ability tp load environment variables from .env file

const connectDB = require('./config/db'); // include DB connector
connectDB(); // connect to Atlas instance

const app = express(); // initialize our app

// use express.json() middleware function to parse incoming JSON requests and put the parsed data in req.body.
app.use(express.json());

app.use(morgan('dev')); // log requests to the console

const userRouter = require('./userRoutes'); // include user router
app.use('/users', userRouter); // when a request comes in with path starting with /users, handle it via userRouter

const PORT = process.env.PORT || 5000; // set port number from environment variable
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)); // finally, run the app
