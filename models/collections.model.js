const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "Users" },
      text: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = {
  Collection,
};
