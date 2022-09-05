const express = require("express");
const passport = require("passport");
const local = require('../strategies/local');
const { ensureAuthenticated } = require('../strategies/ensureAuthenticated');
const { addClass } = require('../controllers/classControllers')

const router = express.Router();

router
    .post('/add', ensureAuthenticated, addClass);


module.exports = router; 