const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summary");

// @route   GET
// @desc    Get Departments
// @access  Public
router.get(`/`, summaryController.getSummary);

// @route   GET
// @desc    Get Departments
// @access  Public

module.exports = router;
