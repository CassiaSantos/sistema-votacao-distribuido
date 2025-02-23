const express = require("express");
const router = express.Router();
const { fazerLoginAdmin } = require("../controllers/admin.controller.js");

router.post("/login", fazerLoginAdmin);

module.exports = router;