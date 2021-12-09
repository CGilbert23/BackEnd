const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const vehiclesController = require("../controllers/vehicles");

// @route   GET
// @desc    Get Vehicles
// @access  Public
router.get(`/`, vehiclesController.getVehicles);

// @route   PUT
// @desc    Update Vehicles
// @access  Public
router.get(`/:vehicle_id/:dept_id`, vehiclesController.updateVehicles);

// @route   POST
// @desc    Add Vehicle
// @access  Public
router.post(
    `/`, 
    [
        check("dept_id").not().isEmpty().withMessage("Department ID is required"),
        check("stock").not().isEmpty().withMessage("Stock is required"),
        check("year").not().isEmpty().withMessage("Year is required"),
        check("make").not().isEmpty().withMessage("Make is required"),
        check("model").not().isEmpty().withMessage("Model is required"),
        check("date_in").not().isEmpty().withMessage("Date IN is required"),
    ],
    vehiclesController.addVehicle
);

// @route   GET
// @desc    Delete Vehicle
// @access  Public
router.get(`/:vehicle_id`, vehiclesController.deleteVehicle);

module.exports = router;