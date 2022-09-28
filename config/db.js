require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
            dbName :  'User'
        });
        console.log('Connected to database');
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
