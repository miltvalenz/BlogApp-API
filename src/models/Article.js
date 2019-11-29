const mongoose = require('mongoose');
const {Schema} = mongoose;

const ArticleSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    date: { type: Date, default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Article', ArticleSchema);