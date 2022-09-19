const passport = require('passport');
const local = require('../strategies/local');
const { Note } = require('../database/models');


async function addNote(req, res) {

    try {
        const { title, content, classID } = req.body;
        const studentID = req.user.id;
        const newNote = await Note.create({ title, content, studentID, classID });

        console.log(`*** User '${req.user.firstName} ${req.user.lastName}' added a new note to the database ***`);
        return res.send(newNote);
    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


async function getClassNotes(req, res) {

    try {
        const classID = req.query.classid;
        const studentID = req.user.id;
        const classNotes = await Note.findAll({ where: { studentID, classID } });

        console.log(`*** User '${req.user.firstName} ${req.user.lastName}' retrieved notes from the database ***`);
        return res.send(classNotes);
    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

module.exports = { getClassNotes, addNote };