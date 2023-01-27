const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UploadSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
}, {
    collection: 'upload-data'
});

const Upload = mongoose.model("Upload", UploadSchema);
module.exports = Upload;