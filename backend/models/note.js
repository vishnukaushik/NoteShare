const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sharedWith: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    validate: [
      {
        validator: function (array) {
          return new Set(array).size === array.length;
        },
        message: "Array elements must be unique",
      },
    ],
  },
});

module.exports = mongoose.model("note", noteSchema);
