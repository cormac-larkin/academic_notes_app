const express = require("express");
const passport = require("passport");
const local = require('../strategies/local');
const { ensureAuthenticated } = require('../strategies/ensureAuthenticated');
const { addNote, getClassNotes } = require('../controllers/noteControllers');

const router = express.Router();

router
    .post('/add', ensureAuthenticated, addNote)
    .get('/', ensureAuthenticated, getClassNotes);

module.exports = router; 