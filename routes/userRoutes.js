const express = require("express");
const { createUser, getUserByUUID } = require("../controllers/userControllers");

const router = express.Router();

router
    .post('/', createUser)
    .get('/:uuid', getUserByUUID)

module.exports = router;