const mongoose = require('mongoose');

const Notes = mongoose.model('Notesdata', {
    noteId: String,
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdata' },
    sharedWith: [String]
});


module.exports = Notes;