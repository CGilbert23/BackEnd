const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const usersController = require("../controllers/users");

// @route   POST
// @desc    Create User
// @access  Public
router.post(
    `/`,
    [
        check("name").not().isEmpty().withMessage("Name is required"),
        check("email").not().isEmpty().withMessage("Email is required"),
        check("password").not().isEmpty().withMessage("Password is required"),
    ],
    usersController.registerUser
);

// @route   POST
// @desc    Login User
// @access  Public
router.post(
    `/auth`,
    [
        check("email").not().isEmpty().withMessage("Email is required"),
        check("password").not().isEmpty().withMessage("Password is required"),
    ],
    usersController.loginUser
);

// @route   GET
// @desc    Get User
// @access  Private
router.get(`/`, auth, usersController.getUser);

module.exports = router;
