const express = require("express");
const { check } = require("express-validator");

const authHandler = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

const Users = require("../models/user");

const router = express.Router();

router.post("/login", authHandler.doLogin);

router.put(
  "/signup",
  [
    check("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail()
      .custom(async (value) => {
        const found = await Users.findOne({ email: value });
        if (found) return Promise.reject("Email already exists");
      }),

    check("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage(
        "Password must be minimum of 6 characters and maximum of 20 characters"
      ),

    check("confirmPassword")
      .trim()
      .custom(async (value, { req }) => {
        if (value !== req.body.password)
          return Promise.reject("Password should match");
      }),
  ],
  authHandler.doSignup
);

router.get("/logout", isAuth, authHandler.doLogout);

module.exports = router;
