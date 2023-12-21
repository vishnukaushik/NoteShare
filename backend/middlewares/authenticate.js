const express = require('express')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY
const authenticate = (req, res, next)=>{
    const token = req.header('Authorization').split(' ')[1]
    try {
        const {username, password, id} = jwt.verify(token, SECRET_KEY)
        req.user = {username, password, id}
        next();    
    } catch (err) {
        console.error(err)
        res.status(401).send({err})
    }
} 

module.exports = authenticate