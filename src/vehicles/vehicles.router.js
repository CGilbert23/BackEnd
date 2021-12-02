const router = require("express").Router({ mergeParams: true });
const controller = require("./vehicles.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.create).get(controller.list).all(methodNotAllowed);

router.route("/:vehicle_id").put(controller.update).get(controller.read).delete(controller.delete).all(methodNotAllowed)

module.exports = router;
