var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    display_name: String,
    number: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('book', contactSchema);