const express = require("express");
const router = express.Router();
const countsController = require("../controllers/counts");

// @route   GET
// @desc    Get Counts
// @access  Public
router.get(`/`, countsController.getCounts);

module.exports = router;
