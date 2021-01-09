const mongoose = require('mongoose');

// userImage: path to the img file
const imageSchema = mongoose.Schema({
    fb_id:{ type: String, required: true },
    name: { type: String, required: true },
    userImage: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);