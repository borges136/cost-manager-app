const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config/config.env' });

const connectDB = async() => {
    try {
        const conn = await mongoose.connect('mongodb+srv://bm:JHZoPhdSw0O4WFj2@cluster0.xb9flsz.mongodb.net/?retryWrites=true&w=majority', {
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
