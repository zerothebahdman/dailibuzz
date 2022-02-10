const router = require('express').Router();
const { createUser } = require('../controller/user.controller');

router.post('/', createUser);

module.exports = router;
