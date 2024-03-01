const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// middlewares
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "images")));

// routes
app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  return res.render("error/404");
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  return res.render("error/500");
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
