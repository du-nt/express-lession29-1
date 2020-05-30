const controller = require("../../controllers/books/book.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../../middlewares/auth.middleware");

const upload = multer({ dest: "covers/" });

router.get("/", controller.index);

router.get(
  "/:id/delete",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.deleteBook
);

router.get(
  "/:id/edit",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.editBookGet
);

router.post(
  "/:id/edit",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.editBookPost
);

router.get(
  "/manageBook",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.manageBook
);

router.post(
  "/add",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  upload.single("cover"),
  controller.addBook
);

module.exports = router;
