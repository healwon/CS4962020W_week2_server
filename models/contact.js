var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    fb_id:{ type: String, required: true },
    name: { type: String, required: true },
    numbers: [new Schema({ key: String, number: String })],
    emails: [new Schema({ key: String, email: String })],
    updated: { type: Date, default: Date.now }
});

contactSchema.method.addNumber = function (info) {
    this.numbers.push({key: info.key, number: info.number});
    return this.save();
};

contactSchema.method.addEmail = function (info) {
    this.emails.push({key: info.key, email: info.emails});
    return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);