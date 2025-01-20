const mongoose = require("mongoose");

const sharedNoteSchema = mongoose.Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "user",
	},
	noteId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	accessLevel: {
		type: String,
		enum: {
			values: ["view", "edit"],
			message: "{VALUE} is not a valid access level",
		},
		default: "view",
		required: true,
	},
	sharedBy: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "user",
	},
});

module.exports = mongoose.model("sharedNote", sharedNoteSchema);
