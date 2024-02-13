const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/user", userRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  return res.sendStatus(404);
})

// error handling
app.use((err, req, res, next) => {
  console.log("error occured");

  return res.sendStatus(500);
});

async function connect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongodb connected");
    app.listen(PORT, () => console.log(`Server started at port - ${PORT}`));
  } catch (err) {
    console.log("Problem in database connectivity");
    console.log(err);
  }
}

connect();
