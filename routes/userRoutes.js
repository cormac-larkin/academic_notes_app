const express = require("express");
const passport = require("passport");
const local = require('../strategies/local');
const { ensureAuthenticated } = require('../strategies/ensureAuthenticated');
const { createUser, getUserByUUID, logIn, logOut } = require("../controllers/userControllers");

const router = express.Router();

router
    .post('/register', createUser, passport.authenticate('local'), logIn)
    .post('/login', passport.authenticate('local'), logIn)
    .post('/logout', logOut)
    .get('/:uuid', ensureAuthenticated, getUserByUUID);


module.exports = router;