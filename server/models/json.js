const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JsonSchema = new Schema({
    jsonData: {
        type: Object,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
}, {
    collection: 'json-data'
});

const JsonFile = mongoose.model("json", JsonSchema);
module.exports = JsonFile;