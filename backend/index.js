require('dotenv').config()
const express = require('express');
const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/authentication");
const mongoose = require("mongoose");

const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://captaincoder:${DB_PASSWORD}@fullstackcourse.ifidch4.mongodb.net/TodoApp`;

app.use(cors());

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})
app.use('/auth', authRoutes)
app.use('/', todoRoutes)

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Backend server running on port : ${PORT}`)
})

mongoose.connect(MONGODB_URI)
const dbConnection = mongoose.connection
dbConnection.on('connected', () => {
    console.log(`Connected to MongoDB on ${MONGODB_URI}`);
  });
  
dbConnection.on('error', (err) => {
console.error(`Connection error: ${err.message}`);
});

dbConnection.on('disconnected', () => {
console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
dbConnection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
});
});
