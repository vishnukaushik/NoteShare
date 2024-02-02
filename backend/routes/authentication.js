const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()
router.use(express.json())

const SECRET_KEY = process.env.SECRET_KEY

router.post("/signup", (req, res) => {
  console.log("inside post signup");
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).send({ error: "Username and password required" });
  }

  const newUser = new User({ username, password });
  newUser
    .save()
    .then((result) => {
      const hashedPassword = result.password;
      console.log("User details saved successfully! ", result);
      const token = jwt.sign(
        { username, password: hashedPassword, id: result._id },
        SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      console.error("Failed to save user: ", err);
      res.status(501).send({ err });
    });
});

router.post('/signin', (req, res)=>{
    const {username, password} = req.body
    User.findOne({username}).then((user)=>{
        console.log(user)
        bcrypt.compare(password, user.password).then(result=>{
            if(result)
            {
                const token = jwt.sign({username, password: user.password, id: user._id}, SECRET_KEY, {
                    expiresIn: '2h'
                });
                res.send({token})
            }
            else{
                res.status(401).send({err: 'Incorrect password'})
            }
        }).catch(err=>{
            res.status(501).send({err})
        })
    }).catch(err=>{
        res.status(401).send({err})
    })
})

module.exports = router