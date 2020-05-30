const controller = require("../../controllers/auths/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const express = require("express");
const router = express.Router();

router.get("/login", authMiddleware.redirectHome, controller.login);
router.post("/login",authMiddleware.redirectHome, controller.loginPost);
router.get("/signup",authMiddleware.redirectHome, controller.signup);
router.post("/signup",authMiddleware.redirectHome, controller.signupPost);
router.get("/logout",authMiddleware.isLoggedIn, controller.logout);

module.exports = router;
