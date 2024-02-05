const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => {
        // Password must have at least 1 uppercase, 1 special character, 1 number, and a minimum length of 6
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
        return passwordRegex.test(password);
      },
      message:
        "Password must have at least 1 uppercase, 1 special character, 1 number, and a minimum length of 6.",
    },
  },
  favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  favoriteCollections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
