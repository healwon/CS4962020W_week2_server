const mongoose = require('mongoose');

// userImage: path to the img file
const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fb_id:{ type: String, required: true },
    name: { type: String, required: true },
    userImage: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);