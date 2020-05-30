const controller = require('../../controllers/cart/cart.controller')
const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", controller.index);
router.get("/hire",authMiddleware.requireAuth, controller.hire);
router.get("/hirenow",authMiddleware.isLoggedIn, controller.hireNow);
router.get("/add/:bookId", controller.addToCart);
router.get('/reduce/:id', controller.reduce)
router.get('/increase/:id', controller.increase)
router.get('/remove/:id', controller.remove)

module.exports = router;
