// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
});

module.exports = mongoose.model('Note', noteSchema);
