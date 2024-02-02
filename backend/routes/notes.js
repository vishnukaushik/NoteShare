const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const Note = require("../models/note");

router.use(express.json());
router.use(authenticate);

router.get("/notes", (req, res) => {
  const user = req.user;
  console.log(user);
  Note.find({ userId: user.id })
    .then((notes) => {
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
  const user = req.user;
  if (!note.status) note.status = "not started";
  const newNote = new Note({ ...note, userId: user.id });

  newNote
    .save()
    .then((result) => {
      console.log("Saved the note sucessfully: ", result);
      res.status(200).json(result);
    })
    .catch((err) => {
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

  Note.findByIdAndUpdate({ _id: id }, updatedNote, {
    new: true,
  })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(403).send({ error: "Note not found!" });
    });
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.deleteOne({ _id: id })
    .then((result) => {
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

module.exports = router