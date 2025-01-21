const express = require("express");
const { authenticate, getUserId } = require("../middlewares/authenticate");
const router = express.Router();
const Note = require("../models/note");
const User = require("../models/user");
const sharedNote = require("../models/sharedNote");

router.use(express.json());
router.use(authenticate);
router.use(getUserId);

router.get("/notes", async (req, res) => {
	const user = req.user;
	console.log(user);

	finalResponse = [];

	const notesPromise = Note.find({ userId: user._id }).exec();

	const sharedNotesPromise = sharedNote
		.find({ userId: user._id })
		.populate("noteId")
		.exec();

	const [userNotes, sharedNotes] = await Promise.all([
		notesPromise,
		sharedNotesPromise,
	]);

	const sharedNotesList = sharedNotes.map((sharedNote) => {
		const note = sharedNote.noteId._doc;
		console.log("sharedNote: ", note);

		return { ...note, shared: true };
	});

	finalResponse = [...userNotes, ...sharedNotesList];

	console.log("notes: ", finalResponse);

	res.status(201).send(finalResponse);
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

	sharedNote.deleteMany({ noteId: id }).then((sharedResult) => {
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
});

router.post("/notes/share/:id", async (req, res) => {
	const noteId = req.params.id;
	const emailsList = req.body.emailsList;
	const currUser = req.user;

	const accessLevel = "view";

	const successMessage = "Success";
	const failMessage = "Failed";
	var failedEmails = [];
	var successEmails = [];

	const promises = emailsList.map(async (email) => {
		console.log("Checking for email: ", email);
		try {
			const data = await User.findOne({ username: email }).exec();
			console.log("DB data: ", data);
			if (data) {
				const shareUserId = data._id.toString().trim();
				const newSharedNote = new sharedNote({
					userId: shareUserId,
					noteId,
					accessLevel,
					sharedBy: currUser._id,
				});

				await newSharedNote.save();
				successEmails.push({ email, message: successMessage });
			} else {
				failedEmails.push({
					email,
					message: failMessage + " - User not found",
				});
			}
		} catch (err) {
			failedEmails.push({ email, message: failMessage + " - " + err });
		}
	});

	await Promise.all(promises);

	console.log("notes share: ", noteId);
	console.log("success Emails: ", successEmails);
	console.log("failed Emails: ", failedEmails);

	res.json({
		successEmails,
		failedEmails,
	});
});

router.delete("/sharedNotes/:id", (req, res) => {
	const id = req.params.id;
	console.log("user: ", req.user);
	sharedNote
		.deleteOne({
			noteId: id,
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

module.exports = router;
