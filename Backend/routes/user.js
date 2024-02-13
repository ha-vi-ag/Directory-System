const express = require('express');

const userHandler = require('../controllers/user');
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.put("/create-folder", isAuth, userHandler.createFolder);

router.get("/fetchAllFolders/:parentId", isAuth, userHandler.fetchAllFolders);

router.post("/deleteFolder", isAuth, userHandler.deleteFolder);

module.exports = router;