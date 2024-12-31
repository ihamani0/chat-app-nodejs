require('dotenv').config();

const http = require('http');
const express = require('express');
const corsOrg = require('cors');
const userRoute = require("./routes/userRoute")
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');

const { Server } = require("socket.io");



connectDB();
//const pusher = require("./config")

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
//cors
app.use(corsOrg({
    origin :"http://localhost:5173" ,
    allowedHeaders: ["Content-Type"],
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));



app.use(userRoute)


//socket.io
io.on('connection', (socket) => {

    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('sendMessage', ({ room, message  }) => {
        message.isMine = false;
        io.to(room).emit('receiveMessage', message);
        console.log(message)
    });

    

    // Handle typing events
    socket.on('typing', () => {
        io.emit('user_typing', socket.username);
    });

    // Notify all users when someone leaves
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});