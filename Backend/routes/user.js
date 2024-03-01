const express = require('express');

const userHandler = require('../controllers/user');
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get('/', userHandler.getHome);

router.get('/about', userHandler.getAbout);

router.get('/login', userHandler.getLogin);

router.get('/signup', userHandler.getSignup);

module.exports = router;