const Folders = require("../models/folder");

const { deleteFolderById } = require("../db_operations/folder");

const createFolder = async (req, res, next) => {
  let { name, parentId } = req.body;

  if (!parentId) parentId = null;

  const folder = await Folders.findOne({
    name,
    parentId,
    createdBy: req.user.id,
  });

  if (folder)
    return res
      .status(400)
      .json({ message: "A folder with this name already exists" });

  await Folders.create({ name, parentId, createdBy: req.user.id });

  if(parentId === null) parentId = "null";

  return res.redirect("/admin/fetchAllFolders/" + parentId);
};

const deleteFolder = async (req, res, next) => {
  const { id } = req.body;

  const folder = await Folders.findOne({ _id: id });

  if (folder?.createdBy == req.user.id) {
    await deleteFolderById(id);
    return res.status(200).json({ message: "Deleted Successfully" });
  }

  return res
    .status(400)
    .json({ message: "You are not authorized to delete this project" });
};

const fetchAllFolders = async (req, res, next) => {
  let parentId = req.params.parentId;

  if (parentId === "null") parentId = null;

  const list = await Folders.find({
    parentId: parentId,
    createdBy: req.user.id,
  });

  return res.render("admin/home", { list, parentId });
};

module.exports = {
  createFolder,
  fetchAllFolders,
  deleteFolder,
};
