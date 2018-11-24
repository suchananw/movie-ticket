const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const movies = require("./routes/api/movies");
const cinemas = require("./routes/api/cinemas");
// const seats = require("./routes/api/seats");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("port", process.env.PORT || 3001);

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/cinemas",cinemas);
// app.use("/api/seats",seats);

app.listen(3001, () => {
  console.log("app running 3001");
});
