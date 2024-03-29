const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
