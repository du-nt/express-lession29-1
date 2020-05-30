const controller = require("../../controllers/users/user.controller");
const userValidate = require("../../validate/user.validate");
const authMiddleware = require("../../middlewares/auth.middleware");

const multer = require("multer");
const express = require("express");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get(
  "/",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.index
);

router.post(
  "/add",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.addUserPost
);

router.get(
  "/:id/delete",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.deleteUser
);

router.get(
  "/:id/edit",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.editUserGet
);

router.post(
  "/:id/edit",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  upload.single("avatar"),
  controller.editUserPost
);

router.get(
  "/:id/profile",
  authMiddleware.requireAuth,
  controller.profile
);

module.exports = router;
