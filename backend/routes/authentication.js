const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const axios = require('axios')

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
      result._id = result._id.toString().trim();
      const token = jwt.sign(
        { username, _id: result._id },
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

router.post("/signin", (req, res) => {
  console.log("inside signin API")
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      console.log("user: ", user);
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { username, _id: user._id },
              SECRET_KEY,
              {
                expiresIn: "2h",
              }
            );
            res.send({ token });
          } else {
            res.status(401).send({ err: "Incorrect password" });
          }
        })
        .catch((err) => {
          res.status(501).send({ err });
        });
    })
    .catch((err) => {
      res.status(401).send({ err });
    });
});

router.post("/google/callback", (req, res) => {
  const accessToken = req.body.accessToken

  const response = axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // Pass the access token in the Authorization header
    },
  }).then((result) => {
    console.log("result: ", result.data)
    const username = result.data.email;
    User.findOne({ username })
    .then((user) => {
      console.log("user found: ", user);
      const token = jwt.sign(
        { username, _id: user._id }, SECRET_KEY, {expiresIn: "2h"}
      );
      res.send({ token });
    })
    .catch((err) => {
      const newUser = new User({ username, accessToken });
      newUser
        .save()
        .then((result) => {
          console.log("User details saved successfully! ", result);
          result._id = result._id.toString().trim();
          const token = jwt.sign(
            { username, _id: result._id }, SECRET_KEY, {expiresIn: "2h"}
          );
          res.send({ token });
        })
        .catch((err) => {
          console.error("Failed to save user: ", err);
          res.status(501).send({ err });
        });
    });
  });
});

module.exports = router