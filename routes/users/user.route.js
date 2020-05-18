var controller = require("../../controllers/users/user.controller");
var userValidate = require("../../validate/user.validate");

var multer = require("multer");
var express = require("express");
var router = express.Router();

var upload = multer({ dest: "uploads/" });

router.get("/", controller.index);

router.post("/add", userValidate.addValidate, controller.addUserPost);

router.get("/:id/delete", controller.deleteUser);

router.get("/:id/edit", controller.editUserGet);

router.post("/:id/edit", upload.single("avatar"), controller.editUserPost);

module.exports = router;
