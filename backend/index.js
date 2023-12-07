const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo')

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})
app.use('/', todoRoutes)

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Backend server running on port : ${PORT}`)
})
