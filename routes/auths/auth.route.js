var controller = require('../../controllers/auths/auth.controller')


var express = require("express");
var router = express.Router();

router.get("/login", controller.login)
router.post('/login', controller.loginPost)

module.exports = router;
