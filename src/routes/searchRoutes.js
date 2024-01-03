const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const searchController = require('../controllers/searchController');


router.get('/', authenticateToken, searchController.searchNote);

module.exports = router;