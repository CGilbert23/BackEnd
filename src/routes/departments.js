const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departments");

// @route   GET
// @desc    Get Departments
// @access  Public
router.get(`/`, departmentsController.getDepartments);

// @route   GET
// @desc    Get Departments With Count
// @access  Public
router.get(`/counts`, departmentsController.getDepartmentsWithCount);

module.exports = router;
