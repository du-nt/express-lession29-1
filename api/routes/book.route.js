var controller = require("../controllers/book.controller");
var express = require("express");
var router = express.Router();
var multer = require("multer");

var authMiddleware = require("../../middlewares/auth.middleware");

var upload = multer({ dest: "covers/" });

router.get("/", controller.getBooks);

router.get(
  "/:id/delete",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.deleteBook
);

router.post(
  "/:id/edit",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.editBookPost
);

router.post(
  "/add",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  upload.single("cover"),
  controller.addBook
);

module.exports = router;
