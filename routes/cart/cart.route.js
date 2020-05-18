var controller = require('../../controllers/cart/cart.controller')
var express = require("express");
var router = express.Router();

var authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", controller.index);
router.get("/hire",authMiddleware.requireAuth, controller.hire);
router.get("/add/:bookId", controller.addToCart);

module.exports = router;
