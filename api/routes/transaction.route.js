var controller = require('../controllers/transaction.controller')
var authMiddleware = require("../../middlewares/auth.middleware");

var express = require("express");
var router = express.Router();

router.get("/", controller.index);

router.post("/create",authMiddleware.isAdmin, controller.createPost);

router.get("/create",authMiddleware.isAdmin, controller.createGet);

router.get('/:id/complete',authMiddleware.isAdmin, controller.complete)

module.exports = router;