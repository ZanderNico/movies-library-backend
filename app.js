const express = require("express");
const cors = require('cors')
require("dotenv").config();
const { mongodb } = require("./models/index");
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movies.routes");
const movieComments = require("./routes/movieComments.routes");
const collectionRoutes = require("./routes/collections.routes");
const collectionCommentsRoutes = require("./routes/collectionsComments.routes");
const favoriteRoutes = require("./routes/favorites.routes");
const { corsOptions } = require('./config/cors')

const app = express();

app.use(cors(corsOptions))

app.use(express.json());

// All Routes
app.use("/api", userRoutes);

app.use("/api", movieRoutes);

app.use("/api", movieComments);

app.use("/api", collectionRoutes);

app.use("/api", collectionCommentsRoutes);

app.use("/api", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
