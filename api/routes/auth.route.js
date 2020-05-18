var controller = require('../controllers/auth.controller')

var express = require("express");
var router = express.Router();

router.post('/', controller.login)

module.exports = router;
