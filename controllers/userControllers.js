const bcrypt = require('bcrypt');
const { User } = require("../models");

async function createUser(req, res) {

    const { firstName, lastName, plainPassword, email, university } = req.body;

    try {
        // Hash password and add new User to database
        const saltRounds = 10;

        bcrypt.hash(String(plainPassword), saltRounds, async (err, passwordHash) => {
            const newUser = await User.create({ firstName, lastName, passwordHash, email, university });
            console.log(`*** User '${firstName} ${lastName}' added to the database ***`);
            return res.send(newUser);            
        });

    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

}

async function getUserByUUID(req, res) {

    const uuid = req.params.uuid;

    try {
        const user = await User.findOne({
            where: { uuid }
        });
        console.log(`*** User with UUID '${uuid}' retrieved from the database ***`);
        return res.send(user);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


module.exports = { createUser, getUserByUUID };