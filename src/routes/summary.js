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
router.get(`/resetSummary`, summaryController.resetSummary);

module.exports = router;
