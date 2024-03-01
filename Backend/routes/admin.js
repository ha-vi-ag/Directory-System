const express = require("express");

const adminHandler = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/create-folder", isAuth, adminHandler.createFolder);

router.get("/fetchAllFolders/:parentId", isAuth, adminHandler.fetchAllFolders);

router.post("/deleteFolder", isAuth, adminHandler.deleteFolder);

module.exports = router;
