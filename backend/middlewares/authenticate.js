const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY
const authenticate = (req, res, next) => {
  console.log(req.header("Authorization"));
  const token = req.header("Authorization").split(" ")[1];
  try {
    const { username } = jwt.verify(token, SECRET_KEY);
    req.user = { username };
    console.log("in middileware: ", req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ err });
  }
}; 

module.exports = authenticate