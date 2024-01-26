const express = require("express");
const router = express.Router();
const { authorsGet, authorCreate } = require("./author.controllers");

router.get("/", authorsGet);
router.post("/", authorCreate);
module.exports = router;
