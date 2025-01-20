const express = require("express");
const { authenticate, getUserId } = require("../middlewares/authenticate");
const router = express.Router();
const Note = require("../models/note");
const User = require("../models/user");
const sharedNote = require("../models/sharedNote");

router.use(express.json());
router.use(authenticate);
router.use(getUserId);

router.get("/notes", (req, res) => {
	const user = req.user;
	console.log(user);
	Note.find({
		$or: [
			{ userId: user._id },
			{
				sharedWith: {
					$in: [user._id],
				},
			},
		],
	})
		.then((notes) => {
			console.log("found notes for this user");
			console.log(notes);
			res.json(notes);
		})
		.catch((err) => {
			console.error(err);
			res.status(404).send({ err: err });
		});
});

router.post("/notes/", (req, res) => {
	var note = req.body;
	console.log("note: ", note);
	const user = req.user;
	const newNote = new Note({ ...note, userId: user._id });

	newNote
		.save()
		.then((result) => {
			console.log("Saved the note sucessfully: ", result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log("error in saving note: ", err);
			res.status(404).send({ err });
		});
});

router.get("/notes/:id", (req, res) => {
	const id = req.params.id;
	console.log("id: ", id);
	Note.findById({ _id: id })
		.then((note) => {
			if (note) {
				console.log("found note: ", note);
				res.status(200).json(note);
			} else {
				res.status(401).send({ err: "note not found" });
			}
		})
		.catch((err) => {
			res.status(401).send({ err: "note does not exists!" });
		});
});

router.put("/notes/:id", (req, res) => {
	const id = req.params.id;
	const updatedNote = req.body;
	console.log("in put request: ", id, updatedNote);
	Note.findByIdAndUpdate({ _id: id }, updatedNote, {
		new: true,
	})
		.then((note) => {
			console.log("request successful");
			res.status(200).json(note);
		})
		.catch((err) => {
			console.error(err);
			res.status(403).send({ error: "Note not found!" });
		});
});

router.delete("/notes/:id", (req, res) => {
	const id = req.params.id;
	console.log("user: ", req.user);
	Note.deleteOne({
		_id: id,
		userId: req.user._id,
	})
		.then((result) => {
			console.log("result: ", result);
			if (result.acknowledged && result.deletedCount > 0) {
				console.log("deleted: ", result);
				res.status(200).send({ message: "deleted the note" });
			} else {
				res.status(404).send({ err: "Unable to delete note" });
			}
		})
		.catch((err) => {
			res.status(404).send({ err, message: "Unable to find note" });
		});
});

router.post("/notes/share/:id", (req, res) => {
	const noteId = req.params.id;
	const emailsList = req.body.emailsList;

	console.log("user object from middleware: ", req.user);
	const currUser = req.user;

	var failedEmails = [];
	var successEmails = [];

	emailsList.forEach((email) => {
		User.findOne({ username: email })
			.then((data) => {
				const shareUserId = data._id.toString().trim();
				const newSharedNote = new sharedNote({
					userId: shareUserId,
					noteId,
					accessLevel,
					sharedBy: currUser._id,
				});

				newSharedNote
					.save()
					.then((result) => {
						successEmails.push(email);
					})
					.catch((err) => {
						failedEmails.push(email);
					});
			})
			.catch((err) => {
				failedEmails.push(email);
			});
	});
	console.log("notes share: ", noteId);
	console.log("success Emails: ", successEmails);
	console.log("failed Emails: ", failedEmails);

	res.json({
		successEmails,
		failedEmails,
	});
});

module.exports = router;
