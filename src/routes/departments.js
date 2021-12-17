const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departments");

// @route   GET
// @desc    Get Departments
// @access  Public
router.get(`/`, departmentsController.getDepartments);

module.exports = router;
