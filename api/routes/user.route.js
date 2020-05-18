var controller = require("../controllers/user.controller");

var multer = require("multer");
var express = require("express");
var router = express.Router();

var upload = multer({ dest: "uploads/" });

router.get("/", controller.getUsers);

router.post("/add", controller.addUser);

router.get("/:id/delete", controller.deleteUser);

router.post("/:id/edit", upload.single("avatar"), controller.editUser);

module.exports = router;
