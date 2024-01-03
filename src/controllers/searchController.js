const Notes = require('../models/Notes');

async function searchNote(req, res) {
    try {
        const { q } = req.query;

        // Find notes that match the search query for the authenticated user
        const notes = await Notes.find({
            userId: req.user._id,
            $or: [
                { title: { $regex: new RegExp(q, 'i') } }, //To search in between titles'
                { content: { $regex: new RegExp(q, 'i') } }, //To search in between contents'
                { noteId: { $regex: new RegExp(q, 'i') } }, //To search in between noteIds'
            ],
        });

        res.json({ notes });
    }
    catch (error) {
        res.status(400).json({ error: "Something's wrong!" });
    }
}



module.exports = { searchNote };