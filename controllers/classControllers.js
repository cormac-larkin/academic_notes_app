const passport = require('passport');
const local = require('../strategies/local');
const { Class } = require('../database/models');


async function addClass(req, res) {

    try {
        const { className } = req.body;
        const studentID = req.user.id;
        const newClass = await Class.create({ className, studentID });

        console.log(`*** User '${req.user.firstName} ${req.user.lastName}' added a class '${className}' to the database ***`);
        return res.send(newClass);
    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


async function getClasses(req, res) {

    try {
        const studentID = req.user.id;
        const allClasses = await Class.findAll({ where: { studentID } });

        res.send(allClasses);
    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


module.exports = { addClass, getClasses };


