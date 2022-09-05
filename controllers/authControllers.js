const bcrypt = require('bcrypt');
const passport = require('passport');
const local = require('../strategies/local');
const { User } = require("../database/models");

async function createUser(req, res, next) {

    try {
        // Parse User information from request body
        const { firstName, lastName, password, email, university } = req.body;

        // Verify that email address has not already been used by another user
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) { return res.status(403).send('Email address already in use'); }

        // Hash the submitted password
        const passwordHash = await bcrypt.hash(password, 10);

        // Add User to database
        const newUser = await User.create({ firstName, lastName, passwordHash, email, university });
        console.log(`*** User '${firstName} ${lastName}' added to the database ***`);

        // Pass control to passport.authenticate to begin a session for the new User (send cookie)
        next();
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


async function logOut(req, res, next) {

    req.logout(function (err) {
        res.clearCookie('connect.sid');
        res.status(200).send('Logout Successful');
    });
}


async function getUserByUUID(req, res) {

    try {
        // Parse requested UUID from URL parameter
        const uuid = req.params.uuid;

        // A user can only request their own user details.
        if (req.user.uuid !== uuid) {
            console.log(`*** Access Denied to /users/:uuid ***`);
            return res.sendStatus(401);
        }
        // Attempt to retrieve the specified User from database
        const user = await User.findOne({ where: { uuid } });
        console.log(`*** User with UUID '${uuid}' retrieved from the database ***`);
        return res.send(user);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}


module.exports = { createUser, getUserByUUID, logIn, logOut };