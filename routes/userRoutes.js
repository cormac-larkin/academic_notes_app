const express = require("express");
const passport = require("passport");
const local = require('../strategies/local');
const { ensureAuthenticated } = require('../strategies/ensureAuthenticated');
const { createUser, getUserByUUID, logIn } = require("../controllers/userControllers");

const router = express.Router();

router
    .post('/register', createUser)
    .post('/login', passport.authenticate('local'), logIn)
    .get('/:uuid', ensureAuthenticated, getUserByUUID);


module.exports = router;