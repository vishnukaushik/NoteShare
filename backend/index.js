require('dotenv').config()
const express = require('express');
const app = express();
const cors = require("cors");
const noteRoutes = require("./routes/notes");
const authRoutes = require("./routes/authentication");
const mongoose = require("mongoose");

const DB_PASSWORD = process.env.DB_PASSWORD;
// const MONGODB_URI = `mongodb+srv://captaincoder:${DB_PASSWORD}@fullstackcourse.ifidch4.mongodb.net/NotesApp&authSource=admin`;
const MONGODB_URI = `mongodb+srv://captaincoder:${DB_PASSWORD}@sideprojects.mq16a.mongodb.net/?retryWrites=true&w=majority&appName=SideProjects`;

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/", noteRoutes);

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Backend server running on port : ${PORT}`)
})

mongoose.connect(MONGODB_URI)
const dbConnection = mongoose.connection
dbConnection.on('connected', () => {
    console.log(`Connection to MongoDB on ${MONGODB_URI} established`);
  });
  
dbConnection.on('error', (err) => {
console.error(`Connection error: ${err.message}`);
});

dbConnection.on("disconnected", (err) => {
  console.log("MongoDB disconnected");
  console.log("mongoURI: ", MONGODB_URI);
  if (err) console.log(err);
});

process.on('SIGINT', () => {
dbConnection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
});
});
