const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderModel = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    parentId: {
        type: Schema.Types.ObjectId,
        default: null,
    }, 
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
}, { timestamps: true });


module.exports = mongoose.model('folders', folderModel);