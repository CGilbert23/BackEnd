const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const vehiclesController = require("../controllers/vehicles");

// @route   GET
// @desc    Get Vehicles
// @access  Public
router.get(`/`, vehiclesController.getVehicles);

// @route   PUT
// @desc    Update Vehicles
// @access  Public
router.put(`/`, auth, vehiclesController.updateVehicles);

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
    auth,
    vehiclesController.addVehicle
);

// @route   DELETE
// @desc    Delete Vehicle
// @access  Public
router.delete(`/:vehicle_id`, auth, vehiclesController.deleteVehicle);

module.exports = router;