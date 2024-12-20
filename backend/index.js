require('dotenv').config();

const express = require('express');
const corsOrg = require('cors');
const userRoute = require("./routes/userRoute")



//const pusher = require("./config")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static())

app.use(userRoute)


// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});