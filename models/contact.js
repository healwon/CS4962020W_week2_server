var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    fb_id: { type: String, required: true },
    name: { type: String, required: true },
    numbers: [String],
    emails: [String],
    has_thumb: { type: Boolean, default: false },
    thumb_url: String,
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

contactSchema.method.addNumber = function (info) {
    this.numbers.push(info);
    return this.save();
}

contactSchema.method.addEmail = function (info) {
    this.emails.push(info);
    return this.save();
}

module.exports = mongoose.model('Contact', contactSchema);