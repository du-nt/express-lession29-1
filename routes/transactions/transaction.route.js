const controller = require("../../controllers/transactions/transaction.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const express = require("express");
const router = express.Router();

router.get("/", authMiddleware.requireAuth, controller.index);

router.post(
  "/create",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.createPost
);

router.get(
  "/create",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.createGet
);

router.get(
  "/:id/complete",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.complete
);

router.get(
  "/:id/delete",
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.delete
);

module.exports = router;
