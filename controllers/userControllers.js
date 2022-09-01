const bcrypt = require('bcrypt');
const { User } = require("../database/models");

async function createUser(req, res) {
    // Parse User information from request body
    const { firstName, lastName, password, email, university } = req.body;

    // Hash the submitted password
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        // Add User to database
        const newUser = await User.create({ firstName, lastName, passwordHash, email, university });
        console.log(`*** User '${firstName} ${lastName}' added to the database ***`);
        return res.send(newUser);
    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


async function getUserByUUID(req, res) {
    // Parse UUID from URL parameters
    const uuid = req.params.uuid;

    try {
        // Retrieve the specified User from database
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


async function logIn(req, res) {

    // The authentication for this route is handled by the Passportjs 'Local' Strategy' (../strategies/local.js)
    // If login details are correct, a cookie is returned in the response header to identify the user for future requests
    console.log(`*** User '${req.user.firstName} ${req.user.lastName}' logged in successfully ***`);
    return res.send(req.user);

}


module.exports = { createUser, getUserByUUID, logIn };