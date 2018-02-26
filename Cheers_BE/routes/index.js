'use strict';

const bars = require("./bars");
const router = require("express").Router();

router.use("/bars", bars);

module.exports = router;
