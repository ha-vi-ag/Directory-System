const Folders = require("../models/folder");

async function deleteFolderById(id) {
  const idOfFoldersToDelete = [id];

  while (idOfFoldersToDelete.length > 0) {
    const id = idOfFoldersToDelete.pop();

    const children = await Folders.find({ parentId: id });

    children.forEach((folder) => idOfFoldersToDelete.push(folder._id));

    await Folders.deleteOne({ _id: id });
  }
}

module.exports = {
  deleteFolderById,
};
