require('dotenv').config();
const MongoStore = require('connect-mongo');

const session = require('express-session');

module.exports = session({
    
        secret: process.env.SESSION_SECRET, // Change this to a secure key
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        cookie: {
            maxAge: 1000 * 60 * 60, // 1 hour
            httpOnly: true,
            secure: false, // Set to true in production
        },
})