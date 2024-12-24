require('dotenv').config();

const express = require('express');
const corsOrg = require('cors');
const userRoute = require("./routes/userRoute")
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');


connectDB();
//const pusher = require("./config")

const app = express();
//cors
app.use(corsOrg({
    origin :"http://localhost:5173" ,
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static())



app.use(userRoute)


// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});