const mongoose = require('mongoose');
const Notes = require('../models/Notes');
const User = require('../models/User');


async function getAllNotes(req, res) {
    try {
        const notes = await Notes.find({ userId: req.user._id });
        res.json({ notes });
    }
    catch (error) {
        res.status(400).json({ error: "Somethings wrong!" });
    }
}


async function getNoteById(req, res) {
    try {
        const note = await Notes.findOne({ noteId: req.params.id, userId: req.user._id });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ note });
    }
    catch (error) {
        res.status(400).json({ error: "Something's wrong!" });
    }
}


async function createNewNote(req, res) {
    try {
        const { noteId, title, content } = req.body;

        // Create a new note associated with the user's _id
        const note = await Notes.create({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            content: content,
            userId: req.user._id,
            noteId: noteId,
        });

        res.status(201).json({ message: "Note is Created", note: note });
    }
    catch (error) {
        res.status(400).json({ error: "Somethings wrong couldn't create note" });
    }
}


async function updateNote(req, res) {
    try {
        const { noteId, title, content } = req.body;

        // Find the note by noteId and authenticated user's ID
        const note = await Notes.findOne({ noteId: req.params.id, userId: req.user._id });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Update the note
        note.noteId = noteId;
        note.title = title;
        note.content = content;

        await note.save();

        res.json({ message: 'Note updated successfully', note });
    }
    catch (error) {
        res.status(400).json({ error: "Something's wrong!" });
    }
}



async function deleteNote(req, res) {
    try {
        // Find the note by ID and authenticated user's ID
        const note = await Notes.findOne({ noteId: req.params.id, userId: req.user._id });

        if (!note) {
            return res.status(204).json({ error: 'Note not found' });
        }

        // Remove the note
        await note.deleteOne();

        res.json({ message: 'Note has been deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: "Something's wrong!" });
    }
}


async function shareNote(req, res) {
    try {
        const { shareWithUsername } = req.body;

        // Find the note by ID and user ID
        const note = await Notes.findOne({ noteId: req.params.id, userId: req.user._id });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Find the user to share the note with
        const shareWithUser = await User.findOne({ username: shareWithUsername });

        if (!shareWithUser) {
            return res.status(404).json({ error: 'User to share with not found' });
        }

        // Check if the note is already shared with the user
        if (note.sharedWith.includes(shareWithUser.username)) {
            return res.status(400).json({ error: 'Note already shared with this user' });
        }

        // Add the user's username to the sharedWith array
        note.sharedWith.push(shareWithUser.username);

        await note.save();

        res.json({ message: 'Note shared successfully' });
    } catch (error) {
        res.status(400).json({ error: "Something's wrong!" });
    }
}


module.exports = {
    getAllNotes,
    getNoteById,
    createNewNote,
    updateNote,
    deleteNote,
    shareNote
}