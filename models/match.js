var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    fb_id: { type: String, required: true },
    own_phone: { type: String, required: true },
    own_kakao: String,
    other_phone: String,
    other_kakao: String,
    matched: Boolean
});

module.exports = mongoose.model('match', matchSchema);