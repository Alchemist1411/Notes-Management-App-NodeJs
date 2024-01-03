const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authenticateToken = require('../middleware/authenticateToken');


router.get('/', authenticateToken, notesController.getAllNotes);

router.get('/:id', authenticateToken, notesController.getNoteById);

router.post('/', authenticateToken, notesController.createNewNote);

router.put('/:id', authenticateToken, notesController.updateNote);

router.delete('/:id', authenticateToken, notesController.deleteNote);

router.post('/:id/share', authenticateToken, notesController.shareNote);


module.exports = router;