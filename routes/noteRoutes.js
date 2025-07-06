
const express = require('express');
const { createNote, getNotes, deleteNote } = require('../controllers/notesController');
const { verifyToken } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, createNote);
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;
