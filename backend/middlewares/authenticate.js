const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = process.env.SECRET_KEY;
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

const getUserId = (req, res, next) => {
	console.log("inside getUserId middleware");
	try {
		const user = req.user;
		User.findOne(user).then((result) => {
			console.log("User found: ", result);
			req.user = result;
			next();
		});
	} catch (err) {
		console.error(err);
		res.status(401).send({ err });
	}
};

module.exports = { authenticate, getUserId };
