// load Atlas URI and credentials from .env
require('dotenv').config();

const mongoose = require('mongoose');

// connect to Atlas instance asynchronously, using provided credentials
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName :  'User'
        });
        console.log('Connected to database');
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

// all executed methods log output to console
mongoose.set('debug', true);

module.exports = connectDB;
