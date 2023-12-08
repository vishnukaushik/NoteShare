const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo')
const mongoose = require('mongoose')

const DB_PASSWORD='captainCoder55'
const MONGODB_URI=`mongodb+srv://captaincoder:${DB_PASSWORD}@fullstackcourse.ifidch4.mongodb.net/TodoApp`

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})
app.use('/', todoRoutes)

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Backend server running on port : ${PORT}`)
})

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Successfully connected to mongoDB')
}).catch(err=>{
    console.error(err.message);
})

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

// Gracefully close the connection on application termination
process.on('SIGINT', () => {
dbConnection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
});
});