const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "Users" },
      text: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie
